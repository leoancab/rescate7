const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/hash");

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { nom_usuario, nro_celular, password, id_tipo_usuario } = req.body;

    if (!nom_usuario || !nro_celular || !password || !id_tipo_usuario) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Verificar si ya existe
    const [existing] = await pool.query(
      "SELECT id FROM usuarios WHERE nro_celular = ?",
      [nro_celular]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashed = await hashPassword(password);

    await pool.query(
      "INSERT INTO usuarios (nom_usuario, nro_celular, password, id_tipo_usuario) VALUES (?, ?, ?, ?)",
      [nom_usuario, nro_celular, hashed, id_tipo_usuario]
    );

    res.json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


// ✅ LOGIN (CON ROL CORRECTO)
exports.login = async (req, res) => {
  try {
    const { nro_celular, password } = req.body;

    if (!nro_celular || !password) {
      return res.status(400).json({ message: "Faltan credenciales" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no definido");
    }

    // 🔥 JOIN para obtener el rol real (string)
    const [rows] = await pool.query(`
      SELECT 
        u.id,
        u.nom_usuario,
        u.password,
        t.tipo AS rol
      FROM usuarios u
      JOIN tipo_usuario t ON u.id_tipo_usuario = t.id
      WHERE u.nro_celular = ?
    `, [nro_celular]);

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    const user = rows[0];

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Password incorrecto"
      });
    }

    // 🔥 TOKEN con rol correcto
    const token = jwt.sign(
      {
        id: user.id,
        rol: user.rol,
        nom_usuario: user.nom_usuario
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login exitoso",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
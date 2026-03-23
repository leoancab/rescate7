const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { hashPassword, comparePassword } = require("../utils/hash")

exports.register = async (req, res) => {
  try {
    const { nom_usuario, nro_celular, password, id_tipo_usuario } = req.body
    const hashed = await hashPassword(password)
    await pool.query(
      "INSERT INTO usuarios (nom_usuario, nro_celular, password, id_tipo_usuario) VALUES (?, ?, ?, ?)",

      [nom_usuario, nro_celular, hashed, id_tipo_usuario]
    )
    res.json({ message: "Usuario creado" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  try {

    const { telefono, password } = req.body

    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE telefono = ?",
      [telefono]
    )

    const user = rows[0]

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" })
    }

    const valid = await comparePassword(password, user.password)

    if (!valid) {
      return res.status(401).json({ message: "Password incorrecto" })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.json({
      message: "Login exitoso",
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }

}
const pool = require("../config/db")

//Crear prospecto
exports.createProspect = async (req, res) => {
    try {
        const { nom_usuario, nro_celular, email } = req.body;
        // Buscar id del tipo "prospecto"
        const [tipo] = await pool.query(
            "SELECT id FROM tipo_usuario WHERE tipo = 'prospecto' LIMIT 1"
        );
        if (tipo.length === 0) {
            return res.status(400).json({ message: "Tipo prospecto no existe" });
        }
        const id_tipo = tipo[0].id;
        const [result] = await pool.query(
            `INSERT INTO usuarios (nom_usuario, nro_celular, email, id_tipo_usuario)
       VALUES (?, ?, ?, ?)`,
            [nom_usuario, nro_celular, email, id_tipo]
        );
        res.status(201).json({
            message: "Prospecto creado",
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener prospectos
exports.getProspects = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        u.id,
        u.nom_usuario,
        u.nro_celular,
        u.email
      FROM usuarios u
      JOIN tipo_usuario t ON u.id_tipo_usuario = t.id
      WHERE t.tipo = 'prospecto'
    `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener prospecto
exports.getProspect = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
      SELECT 
        u.id,
        u.nom_usuario,
        u.nro_celular,
        u.email
      FROM usuarios u
      JOIN tipo_usuario t ON u.id_tipo_usuario = t.id
      WHERE u.id = ? AND t.tipo = 'prospecto'
    `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Prospecto no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Convertir prospecto a miembro
exports.convertToMember = async (req, res) => {
    try {
        const { id } = req.params;
        const [tipo] = await pool.query(
            "SELECT id FROM tipo_usuario WHERE tipo = 'miembro' LIMIT 1"
        );
        const id_tipo_miembro = tipo[0].id;
        const [result] = await pool.query(
            "UPDATE usuarios SET id_tipo_usuario = ? WHERE id = ?",
            [id_tipo_miembro, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Prospecto no encontrado" });
        }
        res.json({ message: "Convertido a miembro" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
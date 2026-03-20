const db = require("../db");

// Crear grupo
exports.createGrupo = async (req, res) => {
    try {
        const { nom_grupo, id_iglesia, id_admin } = req.body;
        const [result] = await db.query(
            "INSERT INTO grupos (nom_grupo, id_iglesia, id_admin) VALUES (?, ?, ?)",
            [nom_grupo, id_iglesia, id_admin]
        );
        res.status(201).json({
            message: "Grupo creado",
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los grupos
exports.getGrupos = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT 
        g.id,
        g.nom_grupo,
        i.nom_iglesia,
        u.nom_usuario AS admin
      FROM grupos g
      LEFT JOIN iglesias i ON g.id_iglesia = i.id
      LEFT JOIN usuarios u ON g.id_admin = u.id
    `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener grupo por ID
exports.getGrupoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(`
      SELECT 
        g.id,
        g.nom_grupo,
        g.id_iglesia,
        i.nom_iglesia,
        g.id_admin,
        u.nom_usuario AS admin_nombre
      FROM grupos g
      LEFT JOIN iglesias i ON g.id_iglesia = i.id
      LEFT JOIN usuarios u ON g.id_admin = u.id
      WHERE g.id = ?
    `, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar grupo
exports.updateGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_grupo, id_admin } = req.body;
        const [result] = await db.query(
            "UPDATE grupos SET nom_grupo = ?, id_admin = ? WHERE id = ?",
            [nom_grupo, id_admin, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }
        res.json({ message: "Grupo actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar grupo
exports.deleteGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query(
            "DELETE FROM grupos WHERE id = ?",
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }
        res.json({ message: "Grupo eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener usuarios de un grupo
exports.getUserByGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            "SELECT id, nom_usuario, nro_celular FROM usuarios WHERE id_grupo = ?",
            [id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const db = require("../config/db");

// Crear grupo
exports.createGroup = async (req, res) => {
    try {

        const { nom_grupo, id_iglesia } = req.body;

        if (!nom_grupo || !id_iglesia) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const [result] = await db.query(
            "INSERT INTO grupos (nom_grupo, id_iglesia) VALUES (?, ?)",
            [nom_grupo, id_iglesia]
        );

        res.status(201).json({
            message: "Grupo creado",
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todos los grupos
exports.getGroups = async (req, res) => {
    try {

        const [rows] = await db.query(`
      SELECT 
        g.id,
        g.nom_grupo,
        i.nom_iglesia,
        (SELECT COUNT(*) FROM usuarios u WHERE u.id_grupo = g.id) AS cantidad_miembros
      FROM grupos g
      LEFT JOIN iglesias i ON g.id_iglesia = i.id
    `);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener grupo por ID
exports.getGroup = async (req, res) => {
    try {

        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        
        const [rows] = await db.query(`
      SELECT 
        g.id,
        g.nom_grupo,
        g.id_iglesia,
        i.nom_iglesia,
        (SELECT COUNT(*) FROM usuarios u WHERE u.id_grupo = g.id) AS cantidad_miembros
      FROM grupos g
      LEFT JOIN iglesias i ON g.id_iglesia = i.id
      WHERE g.id = ?
    `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar grupo
exports.updateGroup = async (req, res) => {
    try {

        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        
        const { nom_grupo } = req.body;
        
        if (!nom_grupo) return res.status(400).json({ message: "Falta nombre del grupo" });
        
        const [result] = await db.query(
            "UPDATE grupos SET nom_grupo = ? WHERE id = ?",
            [nom_grupo, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }
        
        res.json({ message: "Grupo actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar grupo
exports.deleteGroup = async (req, res) => {
    try {
        
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        
        const [result] = await db.query(
            "DELETE FROM grupos WHERE id = ?",
            [id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }
        
        res.json({ message: "Grupo eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener usuarios de un grupo
exports.getUserByGroup = async (req, res) => {
    try {
        
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        
        const [group] = await db.query("SELECT id FROM grupos WHERE id = ?", [id]);
        
        if (group.length === 0) return res.status(404).json({ message: "Grupo no encontrado" });
        
        const [rows] = await db.query(
            "SELECT id, nom_usuario, nro_celular FROM usuarios WHERE id_grupo = ?",
            [id]
        );
        
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
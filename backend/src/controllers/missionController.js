const pool = require("../config/db");

// Crear misión
exports.createMision = async (req, res) => {
    try {
        const { nom_mision, id_union } = req.body;

        if (!nom_mision || !id_union) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Validar que la unión exista
        const [union] = await pool.query("SELECT id FROM uniones WHERE id = ?", [id_union]);
        if (union.length === 0) {
            return res.status(400).json({ message: "Unión inválida" });
        }

        const [result] = await pool.query(
            "INSERT INTO misiones (nom_mision, id_union) VALUES (?, ?)",
            [nom_mision, id_union]
        );

        res.status(201).json({ message: "Misión creada", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las misiones
exports.getMisiones = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        m.id,
        m.nom_mision,
        u.nom_union
      FROM misiones m
      LEFT JOIN uniones u ON m.id_union = u.id
    `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener misión por ID
exports.getMision = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [rows] = await pool.query(`
      SELECT 
        m.id,
        m.nom_mision,
        m.id_union,
        u.nom_union
      FROM misiones m
      LEFT JOIN uniones u ON m.id_union = u.id
      WHERE m.id = ?
    `, [id]);

        if (rows.length === 0) return res.status(404).json({ message: "Misión no encontrada" });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar misión
exports.updateMision = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nom_mision, id_union } = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        if (!nom_mision || !id_union) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Validar unión
        const [union] = await pool.query("SELECT id FROM uniones WHERE id = ?", [id_union]);
        if (union.length === 0) {
            return res.status(400).json({ message: "Unión inválida" });
        }

        const [result] = await pool.query(
            "UPDATE misiones SET nom_mision = ?, id_union = ? WHERE id = ?",
            [nom_mision, id_union, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Misión no encontrada" });

        res.json({ message: "Misión actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar misión
exports.deleteMision = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [result] = await pool.query("DELETE FROM misiones WHERE id = ?", [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Misión no encontrada" });

        res.json({ message: "Misión eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
const pool = require("../config/db");

// Crear unión
exports.createUnion = async (req, res) => {
    try {
        const { nom_union, id_division } = req.body;

        if (!nom_union || !id_division) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Validar que la división exista
        const [division] = await pool.query(
            "SELECT id FROM divisiones WHERE id = ?",
            [id_division]
        );
        if (division.length === 0) {
            return res.status(400).json({ message: "División inválida" });
        }

        const [result] = await pool.query(
            "INSERT INTO uniones (nom_union, id_division) VALUES (?, ?)",
            [nom_union, id_division]
        );

        res.status(201).json({ message: "Unión creada", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las uniones
exports.getUniones = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                u.id,
                u.nom_union,
                d.nom_division
            FROM uniones u
            LEFT JOIN divisiones d ON u.id_division = d.id
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener unión por ID
exports.getUnion = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [rows] = await pool.query(`
            SELECT 
                u.id,
                u.nom_union,
                d.nom_division
            FROM uniones u
            LEFT JOIN divisiones d ON u.id_division = d.id
            WHERE u.id = ?
        `, [id]);

        if (rows.length === 0) return res.status(404).json({ message: "Unión no encontrada" });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar unión
exports.updateUnion = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nom_union, id_division } = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        if (!nom_union || !id_division) return res.status(400).json({ message: "Faltan campos obligatorios" });

        // Validar división
        const [division] = await pool.query(
            "SELECT id FROM divisiones WHERE id = ?",
            [id_division]
        );
        if (division.length === 0) {
            return res.status(400).json({ message: "División inválida" });
        }

        const [result] = await pool.query(`
            UPDATE uniones 
            SET nom_union = ?, id_division = ?
            WHERE id = ?
        `, [nom_union, id_division, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Unión no encontrada" });

        res.json({ message: "Unión actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar unión
exports.deleteUnion = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [result] = await pool.query(
            "DELETE FROM uniones WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Unión no encontrada" });

        res.json({ message: "Unión eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
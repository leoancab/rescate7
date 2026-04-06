const pool = require("../config/db");

// Crear división
exports.createDivision = async (req, res) => {
    try {
        const { nom_division } = req.body;
        if (!nom_division) return res.status(400).json({ message: "Falta el nombre de la división" });

        const [result] = await pool.query(
            "INSERT INTO divisiones (nom_division) VALUES (?)",
            [nom_division]
        );

        res.status(201).json({ message: "División creada", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las divisiones
exports.getDivisiones = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM divisiones");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener división por ID
exports.getDivision = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [rows] = await pool.query("SELECT * FROM divisiones WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "División no encontrada" });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar división
exports.updateDivision = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nom_division } = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        if (!nom_division) return res.status(400).json({ message: "Falta el nombre de la división" });

        const [result] = await pool.query(
            "UPDATE divisiones SET nom_division = ? WHERE id = ?",
            [nom_division, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "División no encontrada" });

        res.json({ message: "División actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar división
exports.deleteDivision = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [result] = await pool.query("DELETE FROM divisiones WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "División no encontrada" });

        res.json({ message: "División eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
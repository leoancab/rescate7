const pool = require("../config/db");

// Crear distrito
exports.createDistrito = async (req, res) => {
    try {
        const { nom_distrito, id_mision } = req.body;

        if (!nom_distrito || !id_mision) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Validar que la misión exista
        const [mision] = await pool.query("SELECT id FROM misiones WHERE id = ?", [id_mision]);
        if (mision.length === 0) {
            return res.status(400).json({ message: "Misión inválida" });
        }

        const [result] = await pool.query(
            "INSERT INTO distritos (nom_distrito, id_mision) VALUES (?, ?)",
            [nom_distrito, id_mision]
        );

        res.status(201).json({ message: "Distrito creado", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todos los distritos
exports.getDistritos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        d.id,
        d.nom_distrito,
        m.nom_mision
      FROM distritos d
      LEFT JOIN misiones m ON d.id_mision = m.id
    `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener distrito por ID
exports.getDistrito = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [rows] = await pool.query(`
      SELECT 
        d.id,
        d.nom_distrito,
        d.id_mision,
        m.nom_mision
      FROM distritos d
      LEFT JOIN misiones m ON d.id_mision = m.id
      WHERE d.id = ?
    `, [id]);

        if (rows.length === 0) return res.status(404).json({ message: "Distrito no encontrado" });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar distrito
exports.updateDistrito = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nom_distrito, id_mision } = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        if (!nom_distrito || !id_mision) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Validar misión
        const [mision] = await pool.query("SELECT id FROM misiones WHERE id = ?", [id_mision]);
        if (mision.length === 0) {
            return res.status(400).json({ message: "Misión inválida" });
        }

        const [result] = await pool.query(
            "UPDATE distritos SET nom_distrito = ?, id_mision = ? WHERE id = ?",
            [nom_distrito, id_mision, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Distrito no encontrado" });

        res.json({ message: "Distrito actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar distrito
exports.deleteDistrito = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [result] = await pool.query("DELETE FROM distritos WHERE id = ?", [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Distrito no encontrado" });

        res.json({ message: "Distrito eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
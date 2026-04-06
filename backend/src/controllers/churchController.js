const pool = require("../config/db");

// Crear iglesia
exports.createIglesia = async (req, res) => {
    try {
        const { nom_iglesia, direccion, id_distrito } = req.body;

        if (!nom_iglesia || !direccion) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Validar que distrito exista si se envía
        if (id_distrito) {
            const [distrito] = await pool.query(
                "SELECT id FROM distritos WHERE id = ?",
                [id_distrito]
            );
            if (distrito.length === 0) {
                return res.status(400).json({ message: "Distrito inválido" });
            }
        }

        const [result] = await pool.query(
            "INSERT INTO iglesias (nom_iglesia, direccion, id_distrito) VALUES (?, ?, ?)",
            [nom_iglesia, direccion, id_distrito || null]
        );

        res.status(201).json({ message: "Iglesia creada", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las iglesias
exports.getIglesias = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        i.id,
        i.nom_iglesia,
        i.direccion,
        d.nom_distrito
      FROM iglesias i
      LEFT JOIN distritos d ON i.id_distrito = d.id
    `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener iglesia por ID
exports.getIglesia = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [rows] = await pool.query(`
      SELECT 
        i.id,
        i.nom_iglesia,
        i.direccion,
        d.nom_distrito
      FROM iglesias i
      LEFT JOIN distritos d ON i.id_distrito = d.id
      WHERE i.id = ?
    `, [id]);

        if (rows.length === 0) return res.status(404).json({ message: "Iglesia no encontrada" });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar iglesia
exports.updateIglesia = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nom_iglesia, direccion, id_distrito } = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });
        if (!nom_iglesia || !direccion) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        // Validar distrito si se envía
        if (id_distrito) {
            const [distrito] = await pool.query(
                "SELECT id FROM distritos WHERE id = ?",
                [id_distrito]
            );
            if (distrito.length === 0) {
                return res.status(400).json({ message: "Distrito inválido" });
            }
        }

        const [result] = await pool.query(`
      UPDATE iglesias 
      SET nom_iglesia = ?, direccion = ?, id_distrito = ?
      WHERE id = ?
    `, [nom_iglesia, direccion, id_distrito || null, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Iglesia no encontrada" });

        res.json({ message: "Iglesia actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar iglesia
exports.deleteIglesia = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

        const [result] = await pool.query(
            "DELETE FROM iglesias WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Iglesia no encontrada" });

        res.json({ message: "Iglesia eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
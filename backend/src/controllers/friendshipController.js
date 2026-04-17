const db = require("../config/db");

// Crear mensaje de amistad
const createAmistad = async (req, res) => {
    try {
        const { categoria, mensaje, usuario_recibe_id } = req.body;

        const usuario_envia_id = req.user?.id;

        if (!categoria || !mensaje || !usuario_recibe_id) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const query = `
            INSERT INTO friendships 
            (categoria, mensaje, usuario_envia_id, usuario_recibe_id)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            categoria,
            mensaje,
            usuario_envia_id,
            usuario_recibe_id
        ];

        const [result] = await db.execute(query, values);

        res.status(201).json({
            message: "Mensaje enviado correctamente",
            id: result.insertId
        });

    } catch (error) {
        console.error("Error createFriendship:", error);
        res.status(500).json({
            message: "Error del servidor"
        });
    }
};


// Obtener mensajes enviados por el usuario
const getMisAmistadesEnviadas = async (req, res) => {
    try {
        const usuario_envia_id = req.user?.id;

        const query = `
            SELECT f.*, u.nom_usuario AS nombre_destino
            FROM friendships f
            JOIN usuarios u ON f.usuario_recibe_id = u.id
            WHERE f.usuario_envia_id = ?
            ORDER BY f.fecha_envio DESC
        `;

        const [rows] = await db.execute(query, [usuario_envia_id]);

        res.json(rows);

    } catch (error) {
        console.error("Error getMisAmistadesEnviadas:", error);
        res.status(500).json({
            message: "Error del servidor"
        });
    }
};


// Obtener mensajes recibidos
const getMisAmistadesRecibidas = async (req, res) => {
    try {
        const usuario_recibe_id = req.user?.id;

        const query = `
            SELECT f.*, u.nom_usuario AS nombre_remitente
            FROM friendships f
            JOIN usuarios u ON f.usuario_envia_id = u.id
            WHERE f.usuario_recibe_id = ?
            ORDER BY f.fecha_envio DESC
        `;

        const [rows] = await db.execute(query, [usuario_recibe_id]);

        res.json(rows);

    } catch (error) {
        console.error("Error getMisAmistadesRecibidas:", error);
        res.status(500).json({
            message: "Error del servidor"
        });
    }
};


module.exports = {
    createAmistad,
    getMisAmistadesEnviadas,
    getMisAmistadesRecibidas
};
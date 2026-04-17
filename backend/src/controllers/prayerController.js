const db = require("../config/db");

// 🔹 Crear pedido
exports.createPedidoOracion = async (req, res) => {
    try {
        const { categoria, usuario_id, mensaje } = req.body;
        const creado_por = req.user.id; // viene del middleware de auth

        if (!categoria || !usuario_id || !mensaje) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const query = `
            INSERT INTO pedidos_oracion (categoria, mensaje, usuario_id, creado_por)
            VALUES (?, ?, ?, ?)
        `;

        await db.query(query, [categoria, mensaje, usuario_id, creado_por]);

        res.status(201).json({
            message: "Pedido de oración creado correctamente",
        });

    } catch (error) {
        console.error("Error creando pedido:", error);
        res.status(500).json({
            message: "Error del servidor",
        });
    }
};

// 🔹 Obtener pedidos (opcional pero recomendado)
exports.getPedidosOracion = async (req, res) => {
    try {
        const query = `
            SELECT pr.*, u.nom_usuario AS usuario_nombre
            FROM pedidos_oracion pr
            JOIN users u ON pr.usuario_id = u.id
            ORDER BY pr.created_at DESC
        `;

        const [rows] = await db.query(query);

        res.json(rows);

    } catch (error) {
        console.error("Error obteniendo pedidos:", error);
        res.status(500).json({
            message: "Error del servidor",
        });
    }
};
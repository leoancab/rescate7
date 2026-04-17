const express = require("express");
const router = express.Router();

const {
    createPedidoOracion,
    getPedidosOracion,
} = require("../controllers/prayerController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔹 Crear pedido
router.post("/", authMiddleware, createPedidoOracion,
);

// 🔹 Obtener pedidos
router.get("/", authMiddleware, getPedidosOracion);

module.exports = router;
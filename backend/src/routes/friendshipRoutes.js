const express = require("express");
const router = express.Router();

const {
    createAmistad,
    getMisAmistadesEnviadas,
    getMisAmistadesRecibidas
} = require("../controllers/friendshipController");

// ⚠️ Middleware de autenticación (debes tenerlo)
const authMiddleware = require("../middleware/authMiddleware");

// Crear mensaje
router.post("/", authMiddleware, createAmistad);

// Obtener enviados
router.get("/sent", authMiddleware, getMisAmistadesEnviadas);

// Obtener recibidos
router.get("/received", authMiddleware, getMisAmistadesRecibidas);

module.exports = router;
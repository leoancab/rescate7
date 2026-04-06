const express = require("express");
const router = express.Router();
const missionController = require("../controllers/missionController");

// Crear misión
router.post("/", missionController.createMision);

// Obtener todas las misiones
router.get("/", missionController.getMisiones);

// Obtener misión por ID
router.get("/:id", missionController.getMision);

// Actualizar misión
router.put("/:id", missionController.updateMision);

// Eliminar misión
router.delete("/:id", missionController.deleteMision);

module.exports = router;
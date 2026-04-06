const express = require("express");
const router = express.Router();
const unionController = require("../controllers/unionController");

// Crear una nueva unión
router.post("/", unionController.createUnion);

// Obtener todas las uniones
router.get("/", unionController.getUniones);

// Obtener una unión por ID
router.get("/:id", unionController.getUnion);

// Actualizar una unión por ID
router.put("/:id", unionController.updateUnion);

// Eliminar una unión por ID
router.delete("/:id", unionController.deleteUnion);

module.exports = router;
const express = require("express");
const router = express.Router();
const divisionController = require("../controllers/divisionController");

// Crear división
router.post("/", divisionController.createDivision);

// Obtener todas las divisiones
router.get("/", divisionController.getDivisiones);

// Obtener división por ID
router.get("/:id", divisionController.getDivision);

// Actualizar división por ID
router.put("/:id", divisionController.updateDivision);

// Eliminar división por ID
router.delete("/:id", divisionController.deleteDivision);

module.exports = router;
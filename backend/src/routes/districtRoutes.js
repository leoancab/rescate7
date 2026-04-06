const express = require("express");
const router = express.Router();
const districtController = require("../controllers/districtController");

// Crear distrito
router.post("/", districtController.createDistrito);

// Obtener todos los distritos
router.get("/", districtController.getDistritos);

// Obtener distrito por ID
router.get("/:id", districtController.getDistrito);

// Actualizar distrito
router.put("/:id", districtController.updateDistrito);

// Eliminar distrito
router.delete("/:id", districtController.deleteDistrito);

module.exports = router;
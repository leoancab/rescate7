const express = require("express");
const router = express.Router();
const churchController = require("../controllers/churchController");

// Crear iglesia
router.post("/", churchController.createIglesia);

// Obtener todas las iglesias
router.get("/", churchController.getIglesias);

// Obtener iglesia por ID
router.get("/:id", churchController.getIglesia);

// Actualizar iglesia
router.put("/:id", churchController.updateIglesia);

// Eliminar iglesia
router.delete("/:id", churchController.deleteIglesia);

module.exports = router;
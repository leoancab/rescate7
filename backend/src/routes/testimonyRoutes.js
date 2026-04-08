const express = require("express");
const router = express.Router();
const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");
const testimonyController = require("../controllers/testimonyController");

// 📦 multer config
const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

// ✅ Crear testimonio (protegido)
router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    testimonyController.createTestimonio
);

// ✅ Listar todos
router.get("/", testimonyController.getTestimonios);

// ✅ Por usuario
router.get("/usuario/:id", testimonyController.getTestimonioByUser);

module.exports = router;
const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", (req, res) => {
    upload.single("file")(req, res, async (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    error: "El archivo es demasiado grande. Máximo 20MB."
                });
            }
            return res.status(500).json({ error: "Error al subir archivo" });
        }

        try {
            const fileType = req.file.mimetype;

            let folder = "rescate7/otros";

            if (fileType.startsWith("video/")) {
                folder = "rescate7/videosTestimonio";
            } else if (fileType.startsWith("audio/")) {
                folder = "rescate7/audiosTestimonio";
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto",
                folder: folder,
            });

            fs.unlinkSync(req.file.path);

            res.json({ url: result.secure_url });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error subiendo a Cloudinary" });
        }
    });
});

app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

app.listen(process.env.CLOUDINARY_PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.CLOUDINARY_PORT);
});
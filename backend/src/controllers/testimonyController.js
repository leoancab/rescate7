const pool = require("../config/db");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// ✅ Crear testimonio
exports.createTestimonio = async (req, res) => {
    let filePath = req.file?.path; // para limpiar después

    try {
        // 🔐 usuario desde JWT
        const id_usuario = req.user.id;

        const { tipo, contenido } = req.body;

        // ✅ Validar tipo
        const tiposValidos = ["video", "audio", "texto"];
        if (!tipo || !tiposValidos.includes(tipo)) {
            return res.status(400).json({
                error: "Tipo inválido"
            });
        }

        let media_url = null;

        // 🎥📢 Si es archivo
        if (tipo !== "texto") {
            if (!req.file) {
                return res.status(400).json({
                    error: "Debes subir un archivo"
                });
            }

            // ✅ Validar mimetype vs tipo
            if (tipo === "video" && !req.file.mimetype.startsWith("video/")) {
                return res.status(400).json({
                    error: "El archivo no es un video válido"
                });
            }

            if (tipo === "audio" && !req.file.mimetype.startsWith("audio/")) {
                return res.status(400).json({
                    error: "El archivo no es un audio válido"
                });
            }

            // 📁 Definir carpeta en Cloudinary
            let folder = "rescate7/otros";

            if (tipo === "video") {
                folder = "rescate7/videosTestimonio";
            } else if (tipo === "audio") {
                folder = "rescate7/audiosTestimonio";
            }

            // ☁️ Subir a Cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: "auto",
                folder: folder,
            });

            media_url = result.secure_url;
        }

        // ✍️ Validar texto
        if (tipo === "texto" && (!contenido || contenido.trim() === "")) {
            return res.status(400).json({
                error: "Debes escribir un mensaje"
            });
        }

        // 💾 Guardar en DB
        const sql = `
            INSERT INTO testimonios (id_usuario, tipo, contenido, media_url)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            id_usuario,
            tipo,
            contenido || null,
            media_url
        ];

        const [resultDB] = await pool.query(sql, values);

        res.status(201).json({
            message: "Testimonio creado correctamente",
            data: {
                id: resultDB.insertId,
                tipo,
                contenido,
                media_url
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el proceso" });

    } finally {
        // 🧹 borrar archivo SIEMPRE (aunque falle Cloudinary)
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.warn("No se pudo borrar archivo local:", err.message);
                }
            });
        }
    }
};

// ✅ Obtener todos los testimonios
exports.getTestimonios = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT t.*, u.nom_usuario
            FROM testimonios t
            JOIN usuarios u ON t.id_usuario = u.id
            ORDER BY t.created_at DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener testimonios" });
    }
};

// ✅ Obtener testimonios por usuario
exports.getTestimonioByUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(`
            SELECT *
            FROM testimonios
            WHERE id_usuario = ?
            ORDER BY created_at DESC
        `, [id]);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener testimonios del usuario" });
    }
};
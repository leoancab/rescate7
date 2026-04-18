const pool = require("../config/db")

//Obtener visitas
exports.getVisits = async (req, res) => {
    try {
        const { estado } = req.query;
        let query = `
      SELECT 
        v.id,
        v.fecha_hora,
        v.estado,
        u1.nom_usuario AS visitador,
        u2.nom_usuario AS visitado
      FROM visitas_misioneras v
      JOIN usuarios u1 ON v.id_visitador = u1.id
      JOIN usuarios u2 ON v.id_visitado = u2.id
    `;
        let params = [];
        if (estado) {
            query += " WHERE v.estado = ?";
            params.push(estado);
        }
        query += " ORDER BY v.fecha_hora DESC";
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtener visitas de usuario
exports.getVisitsByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(`
      SELECT 
        v.id,
        v.fecha_hora,
        v.estado,
        u1.nom_usuario AS visitador,
        u2.nom_usuario AS visitado
      FROM visitas_misioneras v
      JOIN usuarios u1 ON v.id_visitador = u1.id
      JOIN usuarios u2 ON v.id_visitado = u2.id
      WHERE v.id_visitador = ? OR v.id_visitado = ?
      ORDER BY v.fecha_hora DESC
    `, [id, id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔥 Crear visita misionera
exports.createVisit = async (req, res) => {
    try {
        const { tipo, usuario_id, fecha, mensaje } = req.body;

        // 🔹 Validación
        if (!tipo || !usuario_id || !fecha) {
            return res.status(400).json({ error: "Campos obligatorios faltantes" });
        }

        // 🔹 Usuario autenticado (visitador)
        const id_visitador = req.user.id;

        const query = `
      INSERT INTO visitas_misioneras 
      (id_visitador, id_visitado, tipo, fecha_hora, mensaje, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

        const tiposValidos = {
            reencuentro: "Reencuentro",
            estudio: "Estudio Bíblico",
            escuela: "Escuela Sabática"
        };

        const tipoFormateado = tiposValidos[tipo];

        if (!tipoFormateado) {
            return res.status(400).json({ error: "Tipo inválido" });
        }

        const params = [
            id_visitador,
            usuario_id,  // visitado
            tipoFormateado,
            fecha,
            mensaje || null,
            "pendiente"
        ];

        const [result] = await pool.query(query, params);

        res.status(201).json({
            message: "Visita creada correctamente",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
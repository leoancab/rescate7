const pool = require("../config/db");

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT 
        id,
        nom_usuario,
        email,
        nro_celular,
        id_tipo_usuario,
        id_iglesia,
        id_grupo
      FROM usuarios
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener un usuario por ID
exports.getUser = async (req, res) => {
  try {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const [rows] = await pool.query(`
      SELECT 
        id,
        nom_usuario,
        email,
        nro_celular,
        id_tipo_usuario,
        id_iglesia,
        id_grupo
      FROM usuarios 
      WHERE id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const { nom_usuario, nro_celular, id_tipo_usuario } = req.body;

    if (!nom_usuario || !nro_celular || !id_tipo_usuario) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Opcional: validar que id_tipo_usuario exista en tipo_usuario
    const [tipo] = await pool.query(
      "SELECT id FROM tipo_usuario WHERE id = ?",
      [id_tipo_usuario]
    );

    if (tipo.length === 0) {
      return res.status(400).json({ message: "Tipo de usuario inválido" });
    }

    const [result] = await pool.query(`
      UPDATE usuarios 
      SET nom_usuario = ?, nro_celular = ?, id_tipo_usuario = ?
      WHERE id = ?
    `, [nom_usuario, nro_celular, id_tipo_usuario, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Asignar usuario a grupo
exports.assignGroup = async (req, res) => {
  try {

    const id = parseInt(req.params.id, 10);

    const id_grupo = parseInt(req.body.id_grupo, 10);

    if (isNaN(id) || isNaN(id_grupo)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Verificar existencia usuario
    const [usuario] = await pool.query("SELECT id FROM usuarios WHERE id = ?", [id]);

    if (usuario.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    // Verificar existencia grupo
    const [grupo] = await pool.query("SELECT id FROM grupos WHERE id = ?", [id_grupo]);

    if (grupo.length === 0) return res.status(404).json({ message: "Grupo no encontrado" });

    await pool.query(
      "UPDATE usuarios SET id_grupo = ? WHERE id = ?",
      [id_grupo, id]
    );

    res.json({ message: "Usuario asignado al grupo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Quitar usuario de grupo
exports.removeGroup = async (req, res) => {
  try {

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    // Verificar existencia usuario
    const [usuario] = await pool.query("SELECT id FROM usuarios WHERE id = ?", [id]);

    if (usuario.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    await pool.query(
      "UPDATE usuarios SET id_grupo = NULL WHERE id = ?",
      [id]
    );

    res.json({ message: "Usuario removido del grupo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.countByIglesia = async (req, res) => {
  try {
    const idIglesia = req.user.id_iglesia;

    const [rows] = await pool.query(
      "SELECT COUNT(*) AS total FROM usuarios WHERE id_iglesia = ?",
      [idIglesia]
    );
    res.json({ total: rows[0].total });
  } catch (error) {
    console.error("ERROR EN countByIglesia:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

exports.getUsuariosByRol = async (req, res) => {
  try {
    const { rol } = req.query;

    const query = `
            SELECT id, nom_usuario 
            FROM usuarios
            WHERE id_tipo_usuario = ?
        `;

    const [rows] = await pool.execute(query, [rol]);

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
const pool = require("../config/db")

//Obtener usuarios
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        nom_usuario,
        email,
        nro_celular,
        id_tipo_usuario
      FROM usuarios
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Obtener un usuario
exports.getUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        id,
        nom_usuario,
        email,
        nro_celular,
        id_tipo_usuario
      FROM usuarios 
      WHERE id = ?`,
      [req.params.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { nom_usuario, nro_celular, id_tipo_usuario } = req.body

    const [result] = await pool.query(
      `UPDATE usuarios 
       SET nom_usuario = ?, nro_celular = ?, id_tipo_usuario = ?
       WHERE id = ?`,
      [nom_usuario, nro_celular, id_tipo_usuario, req.params.id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    res.json({ message: "Usuario actualizado" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE id=?",
      [req.params.id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    res.json({ message: "Usuario eliminado" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
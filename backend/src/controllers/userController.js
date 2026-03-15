const pool = require("../config/db")

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios")
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [req.params.id]
    )
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { nombre, telefono, role_id } = req.body
    await pool.query(
      "UPDATE usuarios SET nombre=?, telefono=?, role_id=? WHERE id=?",
      [nombre, telefono, role_id, req.params.id]
    )
    res.json({ message: "Usuario actualizado" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM usuarios WHERE id=?",
      [req.params.id]
    )
    res.json({ message: "Usuario eliminado" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
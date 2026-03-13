const pool = require("../config/db")

exports.getUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios")
  res.json(rows)
}

exports.getUser = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE id = ?",
    [req.params.id]
  )
  res.json(rows[0])
}

exports.deleteUser = async (req, res) => {

  await pool.query(
    "DELETE FROM usuarios WHERE id = ?",
    [req.params.id]
  )

  res.json({ message: "Usuario eliminado" })
}
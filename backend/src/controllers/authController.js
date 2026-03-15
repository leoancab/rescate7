const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { hashPassword, comparePassword } = require("../utils/hash")

exports.register = async (req, res) => {

  const { nombre, telefono, password, role_id } = req.body
  const hashed = await hashPassword(password)
  const jwt = require("jsonwebtoken")

  await pool.query(
    "INSERT INTO usuarios (nombre, telefono, password, role_id) VALUES (?, ?, ?, ?)",
    [nombre, telefono, hashed, role_id]
  )

  res.json({ message: "Usuario creado" })
}

exports.login = async (req, res) => {
  try {

    const { telefono, password } = req.body

    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE telefono = ?",
      [telefono]
    )

    const user = rows[0]

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" })
    }

    const valid = await comparePassword(password, user.password)

    if (!valid) {
      return res.status(401).json({ message: "Password incorrecto" })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.json({
      message: "Login exitoso",
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }

}
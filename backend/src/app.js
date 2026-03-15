const express = require("express")
const cors = require("cors")
require("dotenv").config()

const pool = require("./config/db")
const authMiddleware = require("./middleware/authMiddleware")
const app = express()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/users", userRoutes)

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT)
})

app.get("/profile", authMiddleware, (req, res) => {

  res.json({
    message: "Ruta protegida",
    user: req.user
  })

})
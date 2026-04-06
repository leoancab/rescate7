const express = require("express")
const cors = require("cors")
require("dotenv").config()

const pool = require("./config/db")
const authMiddleware = require("./middleware/authMiddleware")
const app = express()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const groupRoutes = require("./routes/groupRoutes")
const visitsRoutes = require("./routes/visitRoutes")
const prospectsRoutes = require("./routes/prospectRoutes")
const churchRoutes = require("./routes/churchRoutes");
const districtRoutes = require("./routes/districtRoutes");
const missionRoutes = require("./routes/missionRoutes");
const unionRoutes = require("./routes/unionRoutes")
const divisionRoutes = require("./routes/divisionRoutes")

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/groups", groupRoutes)
app.use("/visits", visitsRoutes)
app.use("/prospects", prospectsRoutes)
app.use("/church", churchRoutes)
app.use("/district", districtRoutes)
app.use("/mission", missionRoutes)
app.use("/union", unionRoutes)
app.use("/division", divisionRoutes)

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT)
})

app.get("/profile", authMiddleware, (req, res) => {

  res.json({
    message: "Ruta protegida",
    user: req.user
  })

})
const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", testRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
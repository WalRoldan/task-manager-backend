require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerSetup = require("./swagger");

const app = express();
swaggerSetup(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Rutas
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

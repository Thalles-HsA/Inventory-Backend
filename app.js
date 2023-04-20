require('dotenv').config();

const express = require('express');
const path = require('path')
const cors = require('cors')

const port = process.env.PORT || 5000;

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001", "https://projeto-inventory.vercel.app"] }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// db connection
require("./config/db.js");

// routes
app.use("/api/usuarios", require('./routes/UsuariosRotas.js'));

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

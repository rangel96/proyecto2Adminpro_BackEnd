require("dotenv").config();

const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use('/api/alumno', require('./routes/alumno'));
app.use('/api/docentes', require('./routes/docentes'));
app.use('/api/materias', require('./routes/materias'));

app.listen(process.env.PORT);
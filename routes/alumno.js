//Ruta api/alumnos
const Router = require("express");
const conString = require("../database/config");
const sql = require("mssql");

const router = Router();

//getall
router.get("/", (req, res) => {
    sql.on("error", (err) => {
        console.log(err);
        res.json(err);
    });
    sql
        .connect(conString)
        .then((pool) => {
            return pool.request().execute("stp_alumnos_getall");
        })
        .then((result) => {
            return res.json(result.recordset);
        })
        .catch((err) => {
            res.json(err);
        });
});

//getbyid
router.get("/:id", (req, res) => {
    sql.on("error", (err) => {
        console.log(err);
        res.json(err);
    });
    sql
        .connect(conString)
        .then((pool) => {
            return pool
                .request()
                .input("idAlumno", sql.Int, req.params.id)
                .execute("stp_alumnos_getbyid");
        })
        .then((result) => {
            return res.json(result.recordset[0]);
        })
        .catch((err) => {
            res.json(err);
        });
});

//Add
router.post("/", (req, res) => {
    sql.on("error", (err) => {
        console.log(err);
        res.json(err);
    });
    sql
        .connect(conString)
        .then((pool) => {
            return pool
                .request()
                .input("nombre", sql.NVarChar, req.body.nombre)
                .input("edad", sql.Int, req.body.edad)
                .input("sexo", sql.NVarChar, req.body.sexo)
                .input("semestre", sql.Int, req.body.semestre)
                .input("carrera", sql.NVarChar, req.body.carrera)
                .execute("stp_alumnos_add");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Alumno agregado",
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

//update
router.put("/:id", (req, res) => {
    sql.on("error", (err) => {
        console.log(err);
        res.json(err);
    });
    sql
        .connect(conString)
        .then((pool) => {
            return pool
                .request()
                .input("idAlumno", sql.Int, req.params.id)
                .input("nombre", sql.NVarChar, req.body.nombre)
                .input("edad", sql.Int, req.body.edad)
                .input("sexo", sql.NVarChar, req.body.sexo)
                .input("semestre", sql.Int, req.body.semestre)
                .input("carrera", sql.NVarChar, req.body.carrera)
                .execute("stp_alumnos_update");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Alumno modificado"
            })
        })
        .catch((err) => {
            res.json(err);
        });
});

router.delete("/:id", (req, res) => {
    sql.on("error", (err) => {
        console.log(err);
        res.json(err);
    });
    sql
        .connect(conString)
        .then((pool) => {
            return pool
                .request()
                .input("idAlumno", sql.Int, req.params.id)
                .execute("stp_alumnos_delete");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Alumno eliminado",
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;
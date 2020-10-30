//Ruta api/materias
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
            return pool.request().execute("stp_materias_getall");
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
                .input("idMateria", sql.Int, req.params.id)
                .execute("stp_materias_getbyid");
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
                .input("horas", sql.Int, req.body.horas)
                .input("horasp", sql.Int, req.body.horasp)
                .input("horast", sql.Int, req.body.horast)
                .input("creditos", sql.Int, req.body.creditos)
                .execute("stp_materias_add");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Materia agregada",
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
                .input("idMateria", sql.Int, req.params.id)
                .input("nombre", sql.NVarChar, req.body.nombre)
                .input("horas", sql.Int, req.body.horas)
                .input("horasp", sql.Int, req.body.horasp)
                .input("horast", sql.Int, req.body.horast)
                .input("creditos", sql.Int, req.body.creditos)
                .execute("stp_materias_update");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Materia modificada"
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
                .input("idMateria", sql.Int, req.params.id)
                .execute("stp_materias_delete");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Materia eliminada",
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;
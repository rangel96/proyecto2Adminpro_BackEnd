//Ruta api/docentes
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
            return pool.request().execute("stp_docentes_getall");
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
                .input("idDocente", sql.Int, req.params.id)
                .execute("stp_docentes_getbyid");
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
                .input("titulo", sql.NVarChar, req.body.titulo)
                .input("tipo", sql.NVarChar, req.body.tipo)
                .execute("stp_docentes_add");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Docente agregado",
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
                .input("idDocente", sql.Int, req.params.id)
                .input("nombre", sql.NVarChar, req.body.nombre)
                .input("edad", sql.Int, req.body.edad)
                .input("titulo", sql.NVarChar, req.body.titulo)
                .input("tipo", sql.NVarChar, req.body.tipo)
                .execute("stp_docentes_update");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Docente modificado"
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
                .input("idDocente", sql.Int, req.params.id)
                .execute("stp_docentes_delete");
        })
        .then((result) => {
            res.status(201).json({
                status: "OK",
                msg: "Docente eliminado",
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;
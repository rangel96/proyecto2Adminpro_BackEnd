const { response } = require('express');

const { query, querySingle, execute } = require('../../dal/data-access');

let docente = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Alumnos  */
const getDocentes = async (req, res) => {
    try {
        docente = await query('stp_docentes_getall');

        if (!docente) {
            console.log("BD vacia");
            res.json({
                status: true,
                msg: 'Ingresar docentes',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Alumnos',
                data: { docente }
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'No se puede obtener los docentes',
            data: err
        });
    }
}


/* Obtener UN Alumno por ID */
const getDocenteId = async (req, res) => {
    const idDocente = req.params.id;

    try {
        sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
        }];

        const docente = await querySingle('stp_docentes_getbyid', sqlParams);

        if (!docente) {
            console.log("Docente no encontrado");
            res.json({
                status: true,
                msg: 'Docente inexistente o vacio',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Docente encontrado',
                data: { docente }
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Docente no encontrado, intentelo de nuevo',
            data: err
        });
    }
}


/* Agregar un Alumno */
const addDocente = async (req, res = response) => {
    const { nombre, edad, titulo, tipo } = req.body;

    try {
        sqlParams = [
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'titulo',
                'value': titulo
            },
            {
                'name': 'tipo',
                'value': tipo
            }
        ];

        docente = await querySingle('stp_docentes_add', sqlParams);
        console.log('Docente added');

        res.json({
            status: true,
            msg: 'Docente agregado correctamente',
            data: { docente }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'El Docente no se pudo agregar',
            data: err
        });
    }
}


/* Editar Alumno */
const updateDocente = async (req, res = response) => {
    const idDocente = req.params.id;
    const { nombre, edad, titulo, tipo } = req.body;

    try {
        sqlParams = [
            {
                'name': 'idDocente',
                'value': idDocente
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'titulo',
                'value': titulo
            },
            {
                'name': 'tipo',
                'value': tipo
            }
        ];

        docente = await querySingle('stp_docentes_update', sqlParams);
        console.log('Docente Edited');

        res.json({
            status: true,
            msg: 'Docente modificado correctamente',
            data: { docente }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'El docente no se pudo actualizar',
            data: err
        });
    }
}


/* Eliminar Alumno */
const deleteDocente = async (req, res) => {
    const idDocente = req.params.id;

    try {
        sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
        }];

        usuario = await execute('stp_docentes_delete', sqlParams);

        res.json({
            status: true,
            msg: 'Docente eliminado',
            data: null
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Docente no se pudo eliminar',
            data: null
        });
    }
}


module.exports = {
    getDocentes,
    getDocenteId,
    addDocente,
    updateDocente,
    deleteDocente,
}
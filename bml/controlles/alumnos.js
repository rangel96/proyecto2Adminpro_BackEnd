const { response } = require('express');

const { query, querySingle, execute } = require('../../dal/data-access');

let alumno = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Alumnos  */
const getAlumnos = async (req, res) => {
    try {
        alumno = await query('stp_alumnos_getall');

        if (!alumno) {
            console.log("BD vacia");
            res.json({
                status: true,
                msg: 'Ingresar alumnos',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Alumnos',
                data: { alumno }
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'No se puede obtener los alumnos',
            data: err
        });
    }
}


/* Obtener UN Alumno por ID */
const getAlumnoId = async (req, res) => {
    const idAlumno = req.params.id;

    try {
        sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno
        }];

        const alumno = await querySingle('stp_alumnos_getbyid', sqlParams);

        if (!alumno) {
            console.log("Alumno no encontrado");
            res.json({
                status: true,
                msg: 'Alumno inexistente o vacio',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Alumno encontrado',
                data: { alumno }
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Alumno no encontrado, intentelo de nuevo',
            data: err
        });
    }
}


/* Agregar un Alumno */
const addAlumno = async (req, res = response) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;

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
                'name': 'sexo',
                'value': sexo
            },
            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            }
        ];

        alumno = await querySingle('stp_alumnos_add', sqlParams);
        console.log('Alumno added');

        res.json({
            status: true,
            msg: 'Alumno agregado correctamente',
            data: { alumno }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'El alumno no se pudo agregar',
            data: err
        });
    }
}


/* Editar Alumno */
const updateAlumno = async (req, res = response) => {
    const idAlumno = req.params.id;
    const { nombre, edad, sexo, semestre, carrera } = req.body;

    try {
        sqlParams = [
            {
                'name': 'idAlumno',
                'value': idAlumno
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
                'name': 'sexo',
                'value': sexo
            },
            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            }
        ];

        alumno = await querySingle('stp_alumnos_update', sqlParams);
        console.log('Alumno Edited');

        res.json({
            status: true,
            msg: 'Alumno modificado correctamente',
            data:  alumno
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'El Alumno no se pudo actualizar',
            data: err
        });
    }
}


/* Eliminar Alumno */
const deleteAlumno = async (req, res) => {
    const idAlumno = req.params.id;

    try {
        sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno
        }];

        usuario = await execute('stp_alumnos_delete', sqlParams);

        res.json({
            status: true,
            msg: 'Alumno eliminado',
            data: null
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Alumno no se pudo eliminar',
            data: null
        });
    }
}


module.exports = {
    getAlumnos,
    getAlumnoId,
    addAlumno,
    updateAlumno,
    deleteAlumno,
}
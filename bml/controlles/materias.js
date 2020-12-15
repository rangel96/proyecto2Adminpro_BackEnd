const { response } = require('express');

const { query, querySingle, execute } = require('../../dal/data-access');

let materia = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Alumnos  */
const getMaterias = async (req, res) => {
    try {
        materia = await query('stp_materias_getall');

        if (!materia) {
            console.log("BD vacia");
            res.json({
                status: true,
                msg: 'Ingresar Materias',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Materias',
                data: { materia }
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'No se puede obtener las materias',
            data: err
        });
    }
}


/* Obtener UN Alumno por ID */
const getMateriaId = async (req, res) => {
    const idMateria = req.params.id;

    try {
        sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        }];

        const materia = await querySingle('stp_materias_getbyid', sqlParams);

        if (!materia) {
            console.log("Materia no encontrada");
            res.json({
                status: true,
                msg: 'Materia inexistente o vacia',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Materia encontrada',
                data: { materia }
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Materia no encontrada, intentelo de nuevo',
            data: err
        });
    }
}


/* Agregar un Alumno */
const addMateria = async (req, res = response) => {
    const { nombre, horas, horasp, horast, creditos } = req.body;

    try {
        sqlParams = [
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasp',
                'value': horasp
            },
            {
                'name': 'horast',
                'value': horast
            },
            {
                'name': 'creditos',
                'value': creditos
            }
        ];

        materia = await querySingle('stp_materias_add', sqlParams);
        console.log('Materia added');

        res.json({
            status: true,
            msg: 'Materia agregado correctamente',
            data: { materia }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'La materia no se pudo agregar',
            data: err
        });
    }
}


/* Editar Alumno */
const updateMateria = async (req, res = response) => {
    const idMateria = req.params.id;
    const { nombre, horas, horasp, horast, creditos } = req.body;

    try {
        sqlParams = [
            {
                'name': 'idMateria',
                'value': idMateria
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasp',
                'value': horasp
            },
            {
                'name': 'horast',
                'value': horast
            },
            {
                'name': 'creditos',
                'value': creditos
            }
        ];

        materia = await querySingle('stp_materias_update', sqlParams);
        console.log('Materia Edited');

        res.json({
            status: true,
            msg: 'Materia modificada correctamente',
            data: { materia }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'La materia no se pudo actualizar',
            data: err
        });
    }
}


/* Eliminar Alumno */
const deleteMateria = async (req, res) => {
    const idMateria = req.params.id;

    try {
        sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        }];

        materia = await execute('stp_materias_delete', sqlParams);

        res.json({
            status: true,
            msg: 'Materia eliminada',
            data: null
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Materia no se pudo eliminar',
            data: null
        });
    }
}


module.exports = {
    getMaterias,
    getMateriaId,
    addMateria,
    updateMateria,
    deleteMateria,
}
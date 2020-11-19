const sql = require('mssql');
const conString = require('./config');

// Query selects
const query = async (stpName, sqlParams) => {
    sql.on('error', err => {
        console.error(err);
        res.json({
            ok: false,
            mgs: 'error en la configuracion de SQL',
            error: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();

    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }

    const resp = await req.execute(stpName);
    return resp.recordset;
}

// Query selects 1 row
const querySingle = async (stpName, sqlParams) => {
    sql.on('error', err => {
        console.error(err);
        res.json({
            ok: false,
            mgs: 'error en la configuracion de SQL',
            error: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();

    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.recordset[0];
}

// Execute procesos que modifican las tablas
const execute = async (stpName, sqlParams) => {
    sql.on('error', err => {
        console.error(err);
        res.json({
            ok: false,
            mgs: 'error en la configuracion de SQL',
            error: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();

    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.rowsAffected;
}

module.exports = {
    query,
    querySingle,
    execute,
}
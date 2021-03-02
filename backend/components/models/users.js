const {Pool} = require('pg');

const conn = require('../config.js');

const pool_db = new Pool (conn.conn_omc);

exports.addUser = (email, phone, cb) => {
    let sql = '';
    sql = `INSERT INTO public.users(
            us_email, us_phone)
            VALUES ('${email}', '${phone}');`;
    pool_db.query(sql).then (
        () => {
            cb('');
        }
    ).catch((err) => {
        console.error(sql)
        cb(err);
    });
};

exports.findPhone = async (email, cb) => {
    let sql = '';
    sql = `SELECT us_phone FROM public.users WHERE us_email = '${email}'`;
    await pool_db.query(sql).then (
        (res) => {
            cb('', res.rows);
        }
    ).catch((err) => {
        console.error(sql)
        cb(err, '');
    });
};

exports.findUser = (email, phone, cb) => {
    let sql = '';
    sql = `SELECT * FROM public.users WHERE us_email = '${email}' and us_phone = '${phone}'`;
    pool_db.query(sql).then (
        (res) => {
            cb('', res.rows);
        }
    ).catch((err) => {
        console.error(sql)
        cb(err, '');
    });
};
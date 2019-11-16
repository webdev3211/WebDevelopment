const mysql = require('mysql');
const config = require('./configs/config.json');
const mysqlCon = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});

mysqlCon.connect(err => {
    if (!err) {
        console.log(`${config.host}/${config.database} Database connection successfull`);
    } else {
        console.log(JSON.stringify(err, undefined, 2));
    }
});


module.exports = mysqlCon;
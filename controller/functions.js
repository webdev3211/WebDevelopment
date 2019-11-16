const promise = require('promise');
const bcrypt = require('bcryptjs');
const mysqlCon = require('../db');

function error(e) {
    console.log(JSON.stringify(e, undefined, 2));
}

module.exports.bcryptjs = function bcrypthash(user) {

    return new promise(
        (resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (!err)
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (!err) {
                            console.log(hash);
                            resolve({
                                "password": hash,
                                "saltSecret": salt
                            });
                        } else {
                            console.log(err);
                            error(err);

                        }
                    });
                else {
                    console.log(err);
                    error(err);

                }
            })
        }
    )
}

module.exports.userRegister = function userRegister(user) {

    return new promise((resolve, reject) => {

        mysqlCon.query(`insert into users values (NULL,'${user.name}','${user.phone}','${user.email}','${user.password}','${user.saltSecret}');`, (err, rows) => {
            if (!err) {

                console.log("USER UPDATED SUCCESSFULLY with userId :" + rows.insertId);
                resolve(rows);
            } else {

                resolve(err);

            }
        });

    })

}
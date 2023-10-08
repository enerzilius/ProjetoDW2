const { response } = require("express");
const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

async function login(credentials){
    await client.query("SELECT * FROM loginadm WHERE email LIKE ? AND senha = ?", [credentials.user, credentials.password], function (err, results){
        if (results.length > 0){
            return true
        }else{
            return false
        }
    });
}
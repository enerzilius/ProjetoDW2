const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

async function logIn(credentials){
    try {
        console.log(credentials)
        let results = await client.query("SELECT * FROM loginadm WHERE email LIKE ? AND senha = ?", [credentials.user, credentials.password])
        console.log(results[0])
        return (results[0].length >= 1) ? true : false;
    } catch (error) {
        // console.error(error)
    }
}
module.exports = {
    logIn
}
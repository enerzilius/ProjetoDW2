const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONNECTION_STRING);


async function selectTenistaPorID(params){
    console.log(params)
    const results = await client.query("SELECT * FROM projetotenis.tenistas WHERE tenistas.id = ?;",
    [id])
     //[parseInt(params.id)])
     //console.log(results)
     //console.log(results[0])
     return results[0];
}

async function cadastrarTenista(tenista){
    const values = [tenista.nomeTenista, tenista.sexo, tenista.classe_sigla];
    await client.query("INSERT INTO projetotenis.tenistas(nomeTenista,sexo,classe_sigla) VALUES (?,?,?,?)", values);
}

async function atualizarTenista(id, novoTenista){
    const values = [tenista.nomeTenista, tenista.sexo, tenista.classe_sigla, id];
    await client.query("UPDATE projetotenis.tenistas SET nomeTenista=?,sexo=?,classe_sigla=? WHERE id=?", values);
}

async function deleteCadastro(id){
    const values = [id];
    await client.query("DELETE FROM projetotenis.tenistas WHERE id=?", values);
}

module.exports = {
    selectTenistaPorID,
    cadastrarTenista,
    atualizarTenista,
    deleteCadastro
}
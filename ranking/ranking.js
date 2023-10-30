const { response } = require("express");
const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectTenistas(params){
    const results = await client.query(
    "SELECT tenistas.id, tenistas.nomeTenista, tenistas.sexo, tenistas.classe_sigla, tenistas_has_etapa.pontuacao"
    + "FROM projetotenis.tenistas" 
    + "INNER JOIN projetotenis.tenistas_has_etapa"
    + "WHERE tenistas.id = tenistas_has_etapa.tenistas_id"
    + "AND tenistas.classe_sigla = ?"
    + "AND tenistas_has_etapa.etapa_idEtapa = ?"
    + "ORDER BY tenistas_has_etapa.pontuacao DESC);", [params.classe, params.etapa]);
	return results[0];
}


async function login(credentials){
    await client.query("SELECT * FROM loginadm WHERE email LIKE ? AND senha = ?", [credentials.user, credentials.password], function (err, results){
        if (results.length > 0){
            return true
        }else{
            return false
        }
    });
}


module.exports = {
	selectTenistas
} //exporta a função para o index

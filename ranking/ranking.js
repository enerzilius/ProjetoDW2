const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectTenistas(params){
    console.log(params)
    const results = await client.query(
    "SELECT tenistas.id, tenistas.nomeTenista, tenistas_has_etapa.pontuacao"
    + " FROM projetotenis.tenistas" 
    + " INNER JOIN projetotenis.tenistas_has_etapa"
    + " WHERE tenistas.id = tenistas_has_etapa.tenistas_id"
    + " AND tenistas.classe_sigla = ?"
    + " AND tenistas_has_etapa.etapa_idEtapa = ?"
    + " ORDER BY tenistas_has_etapa.pontuacao DESC;", [params.class, parseInt(params.etapa)]);
    console.log(results)
	console.log(results[0])
	return results[0];
}


module.exports = {
	selectTenistas,
} //exporta a função para o index

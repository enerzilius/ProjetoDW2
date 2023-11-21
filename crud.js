const mysql = require("mysql2/promise");
const client = mysql.createPool(process.env.CONNECTION_STRING);


function selectTenistaPorID(id){
    return tenistas.find(t => t.id === id); 
}

function cadastrarTenista(tenista){
    tenistas.push(tenista);
}

function atualizarTenista(id, novoTenista){
    const tenista = tenistas.find(t => t.id === id);
    if(!tenista) return;
    tenista.nome = novoTenista.nome;
}



module.exports = {
    selectTenistaPorID,
    cadastrarTenista,
    atualizarTenista
}
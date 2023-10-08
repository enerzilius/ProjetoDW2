require("dotenv").config(); //carrega o pacote de configurações

const db = require("./db")
const login = require("./login/login")

const express = require("express"); //carregamento da biblioteca express

const app = express(); //cria aplicação chamando o express como função

app.get("/clientes", (request, response) => {
	response.json(db.selectClientes()); 
}) //rota que lista os cadastros

app.post("/login", (request, response) => {
	response.json(login.login()); 
}) //rota que lista os cadastros



app.get("/", (request, response, next) => {
	response.json ({
			message: "...."
	})
}) //rota padrão: nesse caso é /

app.get("/", (request, response, next) => {
	response.json ({

	})
}) //rota padrão 

app.listen(process.env.PORT, () => { //sobe a web api na porta 
	console.log("App rodando!");
}); 
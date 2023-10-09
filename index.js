require("dotenv").config(); //carrega o pacote de configurações

const db = require("./db")
const { logIn } = require("./login");

const express = require("express"); //carregamento da biblioteca express

const session = require("express-session");

const app = express(); //cria aplicação chamando o express como função

var cors  = require("cors"); //biblioteca pra adequar as requisições pro protocolo CORS, sem isso dá eror

var parser = require("body-parser") //biblioteca que transforma bytes em jsone vice e versa 

app.use(cors())

var jsonParser = parser.json()

// app.get("/clientes", (request, response) => {
// 	response.json(db.selectClientes()); 
// }) // * *  rota que lista os cadastros

app.post("/login", jsonParser, async (request, response) => {
	try {
		let logged = await logIn(request.body);
		console.log(logged)
		logged ? response.status(200).json({message: 'Logado com sucesso!'}) : response.status(204).json({message: 'Usuário ou senha incorretos!'})
	} catch (error) {
		throw error;
	}
})

app.get("/", (request, response, next) => {
	response.json ({
			message: "...."
	})
}) //rota padrão: nesse caso é /

app.listen(process.env.PORT, () => { //sobe a web api na porta 
	console.log("App rodando!");
}); 
require("dotenv").config(); //carrega o pacote de configurações

//IMPORTS
const ranking = require("./ranking/ranking")
// const logIn = require("./login")
const logIn = require("./login/login")
const express = require("express"); //carregamento da biblioteca express

var cors  = require("cors"); //biblioteca pra adequar as requisições pro protocolo CORS, sem isso dá eror

var parser = require("body-parser") //biblioteca que transforma bytes em jsone vice e versa 

const app = express(); //cria aplicação chamando o express como função

app.use(express.json()); //aparentemente faz a mesma coisa que o var parser

app.use(cors())

var jsonParser = parser.json()

//SELECT TENISTA POR ID
// app.get("/tenistas/:id", (request, response) => {
// 	const id = parseInt(request.params.id);
// 	response.json(db.selectTenistas(id)); 
// }) 

// CADASTRAR TENISTA
app.post("/tenistas", (request, response) => {
	const tenista = request.body;
	crud.cadastrarTenista(tenista);
	response.sendStatus(201);
})


// ATUALIZAR TENISTA
app.patch("/tenistas/:id", (request, response) => {
	const id = parseInt(request.params.id);
	const tenista = request.body;
	crud.atualizarTenista(id, tenista);
	response.sendStatus(200);
})


//SELECT TENISTAS
app.post("/tenistas", jsonParser, async (request, response) => {
	const results = await ranking.selectTenistas(request.body);
	response.status(200).json(results); //Ver se o Array é necessário
})
app.post("/tenistasGeral", jsonParser, async (request, response) => {
	const results = await ranking.selectGeral(request.body);
	response.status(200).json(results); //Ver se o Array é necessário
})


//LOGIN
app.post("/login", jsonParser, async (request, response) => {
	try {
		let logged = await logIn.logIn(request.body);
		console.log(logged)
		logged ? response.status(200).json({message: 'Logado com sucesso!'}) : response.status(204).json({message: 'Usuário ou senha incorretos!'})
	} catch (error) {
		throw error;
	}
})


//ROTA PADRÃO
app.get("/", (request, response, next) => {
	response.json ({
			message: "...."
	})
}) //rota padrão: nesse caso é /


//SUBIR WEB API
app.listen(process.env.PORT, () => { //sobe a web api na porta 
	console.log("App rodando!");
}); 
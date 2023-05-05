import express, { Request, Response } from "express"
import { router } from "./config/routes";

//Criando um servidor web
const app = express();

//Configurar a aplicação para receber dados em JSON
app.use(express.json());
app.use(router);

//Rodando a aplicação
app.listen(3000, function () {
  console.clear();
  console.log("Aplicação rodando na porta 3000");
});
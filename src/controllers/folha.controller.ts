import { Request, Response } from "express";
import { Folha } from "../models/folha.model";


let folhas : Folha[] = [];

export class FolhaController{

    cadastrar(request : Request, response: Response) : Response{
        let folha : Folha = new Folha();
        folha.nome = request.body.nome;
        folha.cpf = request.body.cpf;
        folha.horas = request.body.horas;
        folha.valor = request.body.valor;
        folha.mes = request.body.mes;
        folha.ano = request.body.ano;
        folhas.push(folha)
        // connection.query(`INSERT into teste_dados(nome, preco) VALUES('${produto.nome}' , '${produto.preco}')`);
        return response.status(201).json({ message: "Folha cadastrado" , folha : folhas});
    }

    listar(request : Request, response: Response) : Response{
        // connection.query("SELECT * FROM teste_dados", function (err, result, fields){
        //     console.log(result);
        // });
        return response.status(200).json({ message : "Listagem", dados : folhas});
    }

    buscar(request : Request, response : Response) : Response{
        const {cpf} = request.params;
        const {mes} = request.params;
        const {ano} = request.params;
        for(let folhaCadastrada of folhas){
            if((folhaCadastrada.cpf == cpf))  {
                return response.status(200).json({message: "Ok", dados : folhaCadastrada});
            }
        }
        return response.status(404).json({message: "Nenhuma folha encontrada"})
    }
    
}
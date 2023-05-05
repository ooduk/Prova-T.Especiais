import { Request, Response } from "express";
import { Folha } from "../models/folha.model";


let folhas : Folha[] = [];
let folhasCompletas : Folha[]  = [];

export class FolhaController{

    cadastrar(request : Request, response: Response) : Response{
        for(let folhaCadastrada of folhas) {
            if ((folhaCadastrada.cpf == request.body.cpf) && (folhaCadastrada.mes == request.body.mes) && (folhaCadastrada.ano == request.body.ano)) {
                return response.status(201).json({message: "Folha já cadastrada"});
            } 
        }
        let folha : Folha = new Folha();
        folha.nome = request.body.nome;
        folha.cpf = request.body.cpf;
        folha.horas = request.body.horas;
        folha.valor = request.body.valor;
        folha.mes = request.body.mes;
        folha.ano = request.body.ano;
        folhas.push(folha)
        return response.status(201).json({ message: "Folha cadastrada" , folha : folha});
    }

    listar(request : Request, response: Response) : Response{
        for(let folhaCadastrada of folhas){

                let salarioBruto = folhaCadastrada.horas * folhaCadastrada.valor;

                folhaCadastrada.bruto = salarioBruto;

                if (salarioBruto > 4664.68) {
                    folhaCadastrada.irff = (salarioBruto * 0.275) - 869.36
                } else if (salarioBruto > 3751.05) {
                    folhaCadastrada.irff = (salarioBruto * 0.225) - 636.13
                } else if (salarioBruto > 2826.66) {
                    folhaCadastrada.irff = (salarioBruto * 0.15) - 354.80
                } else if (salarioBruto > 1903.99) {
                    folhaCadastrada.irff = (salarioBruto * 0.075) - 142.80
                } else {
                    folhaCadastrada.irff = 0;
                }

                if(salarioBruto > 5645.80){
                    folhaCadastrada.inss = 621.03;
                } else if ( salarioBruto > 2822.91) {
                    folhaCadastrada.inss = (salarioBruto * 0.11)
                } else if (salarioBruto > 1623.73) {
                    folhaCadastrada.inss = (salarioBruto * 0.09)
                } else {
                    folhaCadastrada.inss = (salarioBruto * 0.08)
                }

                folhaCadastrada.fgts = (salarioBruto * 0.08)

                folhaCadastrada.liquido = salarioBruto - (folhaCadastrada.irff + folhaCadastrada.inss)
        }
        return response.status(200).json({ message : "Listagem", dados : folhas});
    }

    buscar(request : Request, response : Response) : Response{
        const cpf = request.params.cpf;
        const mes = request.params.mes;
        const ano = request.params.ano;

        for(let folhaCadastrada of folhas){
            if((folhaCadastrada.cpf == request.params.cpf) && (folhaCadastrada.mes.toString() == mes) && (folhaCadastrada.ano.toString() == ano))  {
                return response.status(200).json({message: "Ok", dados : folhaCadastrada});
            }
        }
        return response.status(404).json({message: "Nenhuma folha encontrada"})
    }
    
}
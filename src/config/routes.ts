import { Router } from "express";
import { FolhaController } from "../controllers/folha.controller";

const router : Router = Router();

// Configurar todas asd rotas/URLs/EndPoints da Aplicação
router.post("/folha/cadastrar", new FolhaController().cadastrar)
router.get("/folha/listar", new FolhaController().listar)
router.get("/folha/buscar/:cpf/:mes/:ano", new FolhaController().buscar)

export { router };
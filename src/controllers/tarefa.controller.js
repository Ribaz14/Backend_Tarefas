import * as service from '../services/tarefa.service.js'

export async function listar(req, res) {
    res.json(await service.listarTarefas());
}

export async function obter(req,res) {
    const tarefa = await service.obterTarefa(req.params.id);
    if(!tarefa) return res.status(404).json({error: "Tarefa não encontrada"});
    res.json(tarefa);
}

export async function criar(req,res) {
    const tarefa = await service.criarTarefa(req.body);
    res.status(201).json(tarefa);
}

export async function atualizar(req, res) {
    const tarefa = await service.atualizarTarefa(req.params.id, req.body);
    if(!tarefa) return res.status(404).json({erro: "Tarefa não encontrada."})
    res.json(tarefa);
}

export async function remover(req, res) {
    const tarefa = await service.apagarTarefa(req.params.id);
    if(!tarefa) return res.status(404).json({erro: "Tarefa não encontrada."});
    res.status(204).send();
}
import Tarefa from "../models/Tarefas.js";

export async function listarTarefas() {
    return Tarefa.find();
}

export async function obterTarefa(id) {
    return Tarefa.findById(id);
}

export async function criarTarefa(dados) {
    const existe = await Tarefa.findOne({ titulo: dados.titulo });
    if(existe) {
        const erro = new Error("Já existe uma tarefa com esse título");
        erro.status = 409;
        throw erro;
    }
    return Tarefa.create(dados);
}

export async function atualizarTarefa(id, dados) {
    return Tarefa.findByIdAndUpdate(id,dados, {new: true, runValidators: true});
}

export async function apagarTarefa(id) {
    return Tarefa.findByIdAndDelete(id);
}
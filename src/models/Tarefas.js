import mongoose from "mongoose";

const TarefasSchema = new mongoose.Schema(
    {
        titulo:{ type: String, required: true},
        descricao: { type: String, trim: true},
        concluido: { type: Boolean, default: false},
    },
    {timestamps: true}
);

export default mongoose.model('Tarefas', TarefasSchema);
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Base de Dados conectada");
    } catch (error) {
        console.error("Erro ao conectar com a base de dados:", error.message);
        process.exit(1);
    }
}
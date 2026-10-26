import express from 'express';
import cors from 'cors';
import tarefaRoutes from './routes/tarefa.routes.js';
import { naoEncontrado, tratarErros } from './middlewares/erros.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({message: "API a funcionar"}));
app.use('/tarefas', tarefaRoutes);

app.use(naoEncontrado);
app.use(tratarErros);

export default app; 
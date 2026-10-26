import {Router} from 'express';
import * as controllers from '../controllers/tarefa.controller.js';

const router = Router();

router.get('/', controllers.listar);
router.get('/:id', controllers.obter);
router.post('/', controllers.criar);
router.put('/:id', controllers.atualizar);
router.delete('/:id', controllers.remover);

export default router;
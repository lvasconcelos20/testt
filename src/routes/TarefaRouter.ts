import { Router } from 'express';
import { TarefaController } from '../controllers';

const tarefaRouter = Router();
const tarefaController = new TarefaController();

tarefaRouter.route('/')
  .post(async (req, res, next) => {
    try {
      await tarefaController.create(req, res, next);
    } catch (error) {
      next(error);
    }
  });

tarefaRouter.route('/:tarefaId')
  .get(async (req, res, next) => {
    try {
      await tarefaController.read(req, res, next);
    } catch (error) {
      next(error);
    }
  })
  .patch(async (req, res, next) => {
    try {
      await tarefaController.update(req, res, next);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await tarefaController.delete(req, res, next);
    } catch (error) {
      next(error);
    }
  });
  
export default tarefaRouter;

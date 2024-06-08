// routes/tarefaRouter.ts
import { Router, Request, Response, NextFunction } from 'express';
import { TarefaController } from '../controllers';
import { TarefaRepository } from '../repository';
import { Tarefa } from '@prisma/client';

const tarefaRouter = Router();
const tarefaController = new TarefaController();

const middlewareConvertAndFindTarefaById = async (req: Request & { tarefa?: Tarefa }, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID fornecido não é um número válido' });
    }

    // Encontra a tarefa pelo ID
    const tarefa = await TarefaRepository.findTarefaById(numericId);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Adiciona a tarefa encontrada ao objeto de requisição
    req.tarefa = tarefa;
    next();
  } catch (error) {
    next(error);
  }
};

// Roteamento das operações CRUD
tarefaRouter.route('/')
  .post(async (req, res, next) => {
    try {
      await tarefaController.create(req, res, next);
    } catch (error) {
      next(error);
    }
  });

tarefaRouter.route('/:id')
  .get(middlewareConvertAndFindTarefaById, async (req: Request & { tarefa?: Tarefa }, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(req.tarefa);
    } catch (error) {
      next(error);
    }
  })
  .patch(middlewareConvertAndFindTarefaById, async (req: Request & { tarefa?: Tarefa }, res: Response, next: NextFunction) => {
    try {
      await tarefaController.update(req, res, next);
    } catch (error) {
      next(error);
    }
  })
  .delete(middlewareConvertAndFindTarefaById, async (req: Request & { tarefa?: Tarefa }, res: Response, next: NextFunction) => {
    try {
      await tarefaController.delete(req, res, next);
    } catch (error) {
      next(error);
    }
  });

export default tarefaRouter;

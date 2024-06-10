
import { Router, Request, Response, NextFunction } from 'express';
import { TarefaController } from '../controllers';
import { Tarefa } from '@prisma/client';
import prisma from '../database';

const tarefaRouter = Router();
const tarefaController = new TarefaController();

export const middlewareFindByEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.params;

  try {
    const membro = await prisma.member.findUnique({
      where: { email }
    });

    if (!membro) {
      return res.status(404).json({ message: 'Membro não encontrado' });
    }

    next();
  } catch (error) {
    next(error);
  }
};


tarefaRouter.route('/')
  .post(async (req, res, next) => {
    try {
      await tarefaController.create(req, res, next);
    } catch (error) {
      next(error);
    }
  });

tarefaRouter.route('/:email')
  .get(middlewareFindByEmail, async (req: Request, res: Response, next: NextFunction) => {
    try {
      await tarefaController.getTarefasByEmail(req, res, next);
    } catch (error) {
      next(error);
    }
  })
  .patch(middlewareFindByEmail, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedTarefa = await tarefaController.update(req, res, next);
      res.status(200).json(updatedTarefa);
    } catch (error) {
      next(error);
    }
  })
  .delete(middlewareFindByEmail, async (req: Request, res: Response, next: NextFunction) => {
    try {
      await tarefaController.delete(req, res, next);
    } catch (error) { 
      next(error);
    }
  });

export default tarefaRouter;

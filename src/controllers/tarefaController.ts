// TarefaController.ts
import { Request, Response, NextFunction } from 'express';
import TarefaRepository from '../repository/TarefaRepository';
import { Tarefa } from '@prisma/client';

export class TarefaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const tarefaData: Tarefa = req.body;

      // Verifica se já existe uma tarefa com o mesmo nome
      const existingTarefa = await TarefaRepository.findByName(tarefaData.name);
      if (existingTarefa) {
        return res.status(400).json({ message: 'Uma tarefa com este nome já existe' });
      }

      // Cria a tarefa
      const newTarefa = await TarefaRepository.create(tarefaData);

      return res.status(201).json({
        message: 'Tarefa criada com sucesso',
        tarefa: newTarefa,
      });
    } catch (error) {
      return next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params; // Supondo que o ID da tarefa é passado na URL como parâmetro
      const tarefaData: Tarefa = req.body;

      // Verifica se existe a tarefa
      const existingTarefa = await TarefaRepository.findById(Number(id));
      if (!existingTarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      // Atualiza a tarefa
      const updatedTarefa = await TarefaRepository.update(Number(id), tarefaData);

      return res.json({
        message: 'Tarefa atualizada com sucesso',
        tarefa: updatedTarefa,
      });
    } catch (error) {
      return next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }

  public async finalize(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params; // Supondo que o ID da tarefa é passado na URL como parâmetro

      // Verifica se existe a tarefa
      const existingTarefa = await TarefaRepository.findById(Number(id));
      if (!existingTarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      // Atualiza a tarefa com finalização
      const updatedTarefa = await TarefaRepository.finalize(Number(id));

      return res.json({
        message: 'Tarefa finalizada com sucesso',
        tarefa: updatedTarefa,
      });
    } catch (error) {
      return next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params; // Supondo que o ID da tarefa é passado na URL como parâmetro
      const tarefa = await TarefaRepository.delete(Number(id));
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      return res.json({
        message: 'Tarefa deletada com sucesso',
        tarefa,
      });
    } catch (error) {
      return next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }

  public async listAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const tarefas = await TarefaRepository.findAll();

      return res.json({
        message: 'Tarefas listadas com sucesso',
        tarefas,
      });
    } catch (error) {
      return next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params; // Supondo que o ID da tarefa é passado na URL como parâmetro
      const tarefa = await TarefaRepository.findById(Number(id));
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      return res.json({
        message: 'Tarefa encontrada com sucesso',
        tarefa,
      });
    } catch (error) {
      return next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }
}

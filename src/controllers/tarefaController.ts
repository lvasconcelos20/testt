import { Request, Response, NextFunction } from 'express';
import TarefaRepository from '../repository/TarefaRepository'; // Importa o repositório
import { Prisma, Tarefa } from '@prisma/client'; // Importa Prisma para manipular tipos

export class TarefaController {
  public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const tarefaData: Prisma.TarefaCreateInput = req.body;

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
      next(error); // Passa o erro para o middleware de tratamento de erro
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params; // Supondo que o ID da tarefa é passado na URL como parâmetro
      const tarefaData: Prisma.TarefaUpdateInput = req.body;

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
      next(error); // Passa o erro para o próximo middleware de tratamento de erro
    }
  }

  public async finalize(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params; // Supondo que o ID da tarefa é passado na URL como parâmetro

      // Verifica se existe a tarefa
      const existingTarefa = await TarefaRepository.findById(Number(id));
      if (!existingTarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      // Atualiza a tarefa com finalização
      const updatedTarefa = await TarefaRepository.update(Number(id), {
        finalizada: true,
        data_termino: new Date().toISOString(),
      });

      return res.json({
        message: 'Tarefa finalizada com sucesso',
        tarefa: updatedTarefa,
      });
    } catch (error) {
      next(error); // Passa o erro para o próximo middleware de tratamento de erro
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
      next(error); // Passa o erro para o próximo middleware de tratamento de erro
    }
  }

  public async listAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const tarefas = await TarefaRepository.findAll();

      return res.json({
        message: 'Tarefas listadas com sucesso',
        tarefas,
      });
    } catch (error) {
      next(error); // Passa o erro para o próximo middleware de tratamento de erro
    }
  }
}


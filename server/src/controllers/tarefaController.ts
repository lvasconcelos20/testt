import { Request, Response, NextFunction } from 'express';
import TarefaRepository from '../repository/TarefaRepository'; // Certifique-se de que o caminho está correto
import { Tarefa, UpdateTarefa } from '../DTOs';



export class TarefaController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const tarefaData = Tarefa.parse(req.body);

      // Verifica se o campo de data_termino está no formato correto
      if (tarefaData.data_termino && !/^\d{4}-\d{2}-\d{2}$/.test(tarefaData.data_termino)) {
        return res.status(400).json({ message: 'A data deve estar no formato 0000-00-00' });
      }

      const existingTarefa = await TarefaRepository.findTarefaByName(tarefaData.name);

      if (existingTarefa) {
        return res.status(400).json({ message: 'Uma tarefa com este nome já existe' });
      }

      if (tarefaData.finalizada) {
        if (!tarefaData.data_termino) {
          return res.status(400).json({ message: 'Data de término é obrigatória para tarefas finalizadas' });
        }
        tarefaData.data_termino = new Date(tarefaData.data_termino).toISOString();
      }

      const newTarefa = await TarefaRepository.create(tarefaData);

      res.status(201).json({
        message: 'Tarefa criada com sucesso',
        tarefa: newTarefa,
      });
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'ID fornecido não é um número válido' });
      }

      const tarefa = await TarefaRepository.findTarefaById(numericId);

      if (!tarefa) {
        return next({
          status: 404,
          message: 'Tarefa não encontrada',
        });
      }

      res.status(200).json(tarefa);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'ID fornecido não é um número válido' });
      }

      // Obtem o objeto de tarefa existente
      const existingTarefa = await TarefaRepository.findTarefaById(numericId);
      if (!existingTarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      // Verifica se a tarefa é finalizada
      if (existingTarefa.finalizada) {
        return res.status(403).json({ message: 'Tarefas finalizadas não podem ser editadas' });
      }

      const tarefaData = UpdateTarefa.parse(req.body);

      if (!tarefaData.name || !tarefaData.descricao || !tarefaData.prioridade || !tarefaData.membroEmail) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
      }

      const updatedTarefa = await TarefaRepository.update(numericId, tarefaData as Required<typeof tarefaData>);

      res.status(200).json({
        message: 'Tarefa atualizada com sucesso',
        tarefa: updatedTarefa,
      });
    } catch (error) {
      next(error);
    }
  }
  async finalize(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'ID fornecido não é um número válido' });
      }

      const existingTarefa = await TarefaRepository.findTarefaById(numericId);
      if (!existingTarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      const updatedTarefa = await TarefaRepository.update(numericId, {
        finalizada: true,
        data_termino: new Date().toISOString(),
        name: existingTarefa.name ?? '',
        descricao: existingTarefa.descricao ?? '',
        prioridade: existingTarefa.prioridade,
        membroEmail: existingTarefa.membroEmail ?? ''
      });
      return res.json({
        message: 'Tarefa finalizada com sucesso',
        tarefa: updatedTarefa,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'ID fornecido não é um número válido' });
      }

      const tarefa = await TarefaRepository.delete(numericId);
      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      return res.json({
        message: 'Tarefa deletada com sucesso',
        tarefa,
      });
    } catch (error) {
      next(error);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const tarefas = await TarefaRepository.findAll();

      return res.json({
        message: 'Tarefas listadas com sucesso',
        tarefas,
      });
    } catch (error) {
      next(error);
    }
  }
}

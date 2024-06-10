import { Request, Response, NextFunction } from 'express';
import TarefaRepository from '../repository/TarefaRepository';
import { Tarefa, UpdateTarefa } from '../DTOs';

export class TarefaController {
  [x: string]: any;
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const tarefaData = Tarefa.parse(req.body);

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

      const novaTarefa = await TarefaRepository.create(tarefaData);

      res.status(201).json({
        message: 'Tarefa criada com sucesso',
        tarefa: novaTarefa,
      });
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({ message: 'Email fornecido não é válido' });
      }

      const tarefas = await TarefaRepository.getTarefasByMemberEmail(email);

      if (!tarefas || tarefas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma tarefa encontrada para este email.' });
      }

      res.status(200).json(tarefas);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.params;
      const tarefaData = UpdateTarefa.parse(req.body);

      if (!tarefaData.name || !tarefaData.descricao || !tarefaData.prioridade || tarefaData.finalizada === undefined) {
        return res.status(400).json({ mensagem: 'Nome, descrição, prioridade e finalizada são campos obrigatórios' });
      }

      if (tarefaData.finalizada && !tarefaData.data_termino) {
        return res.status(400).json({ mensagem: 'Data de término é obrigatória para tarefas finalizadas' });
      }

      const tarefaAtualizada = await TarefaRepository.update(email, {
        name: tarefaData.name,
        descricao: tarefaData.descricao,
        prioridade: tarefaData.prioridade,
        finalizada: tarefaData.finalizada,
        data_termino: tarefaData.finalizada && tarefaData.data_termino ? new Date(tarefaData.data_termino).toISOString() : null,
      });

      if (!tarefaAtualizada) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
      }

      return res.status(200).json({
        mensagem: 'Tarefa atualizada com sucesso',
        tarefa: tarefaAtualizada,
      });
    } catch (error) {
      next(error);
    }
  }

  async finalize(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.params;
      if (!email) {
        return res.status(400).json({ message: 'Email da tarefa é obrigatório' });
      }

      const tarefas = await TarefaRepository.findTarefaByEmail(email);
      if (!tarefas || tarefas.length === 0) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      const tarefa = tarefas[0]; // Supondo que você queira atualizar a primeira tarefa encontrada com este email

      const updatedTarefaData = {
        finalizada: true,
        data_termino: new Date().toISOString(),
        name: tarefa.name,
        descricao: tarefa.descricao ?? "",
        prioridade: tarefa.prioridade,
        membroEmail: tarefa.membroEmail,
      };

      const tarefaAtualizada = await TarefaRepository.update(email, updatedTarefaData);

      return res.json({
        message: 'Tarefa finalizada com sucesso',
        tarefa: tarefaAtualizada,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteByNameAndEmail(name: string, email: string, req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const tarefa = await TarefaRepository.findTarefaByNameAndEmail(name, email);

      if (!tarefa) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      const deleteResult = await TarefaRepository.deleteTarefaByNameAndEmail(name, email);

      if (!deleteResult) {
        return res.status(500).json({ message: 'Erro ao deletar tarefa' });
      }

      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const membroEmail: string | undefined = req.query.membroEmail as string;
      let tarefas;
      if (membroEmail) {
        tarefas = await TarefaRepository.getTarefasByMemberEmail(membroEmail);
      } else {
        tarefas = await TarefaRepository.findAll();
      }

      res.status(200).json(tarefas);
    } catch (error) {
      next(error);
    }
  }

  async getTarefasByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const tarefas = await TarefaRepository.findTarefaByEmail(email);

      if (!tarefas || tarefas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma tarefa encontrada para este email' });
      }

      res.status(200).json(tarefas);
    } catch (error) {
      next(error);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import TarefaRepository from '../repository/TarefaRepository'; // Certifique-se de que o caminho está correto
import { Tarefa, UpdateTarefa } from '../DTOs';



export class TarefaController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const tarefaData = Tarefa.parse(req.body); // Parseia os dados recebidos na requisição
  
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
        const { email } = req.params; 
        const tarefaData = UpdateTarefa.parse(req.body);

        // Verifica se os campos obrigatórios estão preenchidos
        if (!tarefaData.name || !tarefaData.descricao || !tarefaData.prioridade || tarefaData.finalizada === undefined) {
            return res.status(400).json({ mensagem: 'Nome, descrição, prioridade e finalizada são campos obrigatórios' });
        }

        if (tarefaData.finalizada && !tarefaData.data_termino) {
            return res.status(400).json({ mensagem: 'Data de término é obrigatória para tarefas finalizadas' });
        }

        // Verifica se os dados fornecidos pelo repositório estão conforme esperado
        const updatedTarefa = await TarefaRepository.update(email, {
            name: tarefaData.name,
            descricao: tarefaData.descricao,
            prioridade: tarefaData.prioridade,
            finalizada: tarefaData.finalizada,
            data_termino: tarefaData.finalizada && tarefaData.data_termino ? new Date(tarefaData.data_termino).toISOString() : null,
        });

        if (!updatedTarefa) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
        }

        return res.status(200).json({
            mensagem: 'Tarefa atualizada com sucesso',
            tarefa: updatedTarefa,
        });
    } catch (error) {
        next(error);
    }
}
async finalize(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
      const { email } = req.params; // Receba o email da tarefa no parâmetro
      if (!email) {
          return res.status(400).json({ message: 'Email da tarefa é obrigatório' });
      }

      // Utilize o método findTarefaByEmail para buscar uma tarefa associada ao email fornecido
      const tarefa = await TarefaRepository.findTarefaByEmail(email);
      if (!tarefa) {
          return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      // Mapeia os dados necessários para a atualização
      const updatedTarefaData = {
          finalizada: true,
          data_termino: new Date().toISOString(),
          name: tarefa.name,
          descricao: tarefa.descricao ?? "", // Caso descricao seja null ou undefined, atribui uma string vazia
          prioridade: tarefa.prioridade,
          membroEmail: tarefa.membroEmail // MembroEmail deve ser mantido
      };

      const updatedTarefa = await TarefaRepository.update(email, updatedTarefaData);

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
      const { email } = req.params;
      const tarefa = await TarefaRepository.findTarefaByEmail(email);

      if (!tarefa) {
          return res.status(404).json({ message: 'Tarefa não encontrada' });
      }

      await TarefaRepository.delete(tarefa.membroEmail);

      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
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

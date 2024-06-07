import { Request, Response, NextFunction } from 'express';
import { TarefaRepository } from '../repository'; // Importa o repositório
import { UpdateTarefa, Tarefa} from '../DTOs';

 
  export class TarefaController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
        const tarefaData = Tarefa.parse(req.body);
        const existingTarefa = await TarefaRepository.findTarefaByName(tarefaData.name);
  
        if (existingTarefa) {
          return res.status(400).json({ message: 'Uma tarefa com este nome já existe' });
        }
  
        // Se a tarefa estiver finalizada, verifica se a data de término é fornecida e converte para string se for o caso
        if (tarefaData.finalizada) {
          if (tarefaData.data_termino) {
            tarefaData.data_termino = new Date(tarefaData.data_termino).toISOString();
          } else {
            return res.status(400).json({ message: 'Data de término é obrigatória para tarefas finalizadas' });
          }
        }
  
        // Cria a tarefa
        const newTarefa = await TarefaRepository.create(tarefaData);
  
        res.status(201).json({
          message: 'Tarefa criada com sucesso',
          tarefa: newTarefa,
        });
      } catch (error) {
        next(error); // Passa o erro para o próximo middleware de tratamento de erro
      }
    }
   
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { memberId } = req.params;

      const member = await TarefaRepository.findTarefaById(Number(memberId));

      if (!member) {
        return next({
          status: 404,
          message: 'Membro não encontrado',
        });
      }

      res.status(200).json(member);

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

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
        const { id } = req.params;
        const numericId = Number(id);
  
        if (isNaN(numericId)) {
          return res.status(400).json({ message: 'ID fornecido não é um número válido' });
        }
  
        const tarefaData = UpdateTarefa.parse(req.body);
  
        const existingTarefa = await TarefaRepository.findTarefaById(numericId);
        if (!existingTarefa) {
          return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
  
        const updatedTarefa = await TarefaRepository.update(numericId, tarefaData);
        return res.json({
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


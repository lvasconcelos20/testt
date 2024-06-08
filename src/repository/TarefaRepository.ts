import { Tarefa } from '@prisma/client';
import prisma from '../database';
import { TarefaCreateInput } from '../DTOs';

class TarefaRepository {
  async create(data: TarefaCreateInput): Promise<Tarefa> {
    if (data.finalizada && !data.data_termino) {
        throw new Error('Data de término é obrigatória para tarefas finalizadas');
    }

    return await prisma.tarefa.create({
        data: {
            name: data.name,
            descricao: data.descricao,
            finalizada: data.finalizada,
            data_termino: data.data_termino,
            prioridade: data.prioridade,
            membro: {
                connect: {
                    email: data.membroEmail, // Utiliza o campo membroEmail
                },
            },
        },
    });

  }

  async findTarefaById(id: number): Promise<Tarefa | null> {
    return await prisma.tarefa.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: TarefaCreateInput): Promise<Tarefa> {
    if (data.finalizada && !data.data_termino) {
        throw new Error('Data de término é obrigatória para tarefas finalizadas');
    }

    return await prisma.tarefa.update({
        where: { id },
        data: {
            name: data.name,
            descricao: data.descricao,
            finalizada: data.finalizada,
            data_termino: data.data_termino,
            prioridade: data.prioridade,
            membro: {
                connect: {
                    email: data.membroEmail, // Utiliza o campo membroEmail
                },
            },
        },
    });
  }

  async delete(id: number): Promise<Tarefa> {
    return await prisma.tarefa.delete({
      where: { id },
    });
  }

  async findTarefaByName(name: string): Promise<Tarefa | null> {
    return await prisma.tarefa.findFirst({
      where: { name },
    });
  }

  async findAll(): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany();
  }

  async getTarefasByMemberEmail(membroEmail: string): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany({
      where: { membroEmail },
    });
  }
}

export default new TarefaRepository();

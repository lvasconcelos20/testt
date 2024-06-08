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
      include: { membro: true}, //incluir o membro
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
      include: { membro: true}
    });
  }

  async findAll(): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany({
      include: {membro: true}
    })
  }

  async getTarefasByMemberEmail(membroEmail: string): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany({
      where: { membroEmail },
      include: { membro: true}
    });
  }
}

export default new TarefaRepository();

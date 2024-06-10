import { Tarefa } from '@prisma/client';
import prisma from '../database';
import { TarefaCreateInput } from '../DTOs';

class TarefaRepository {
  async getTarefasByMemberEmail(email: string): Promise<Tarefa[]> {
    const tarefas = await prisma.tarefa.findMany({
      where: {
        membro: {
          email: email,
        },
      },
      include: {
        membro: true,
      },
    });
    return tarefas;
  }

  async create(data: TarefaCreateInput): Promise<Tarefa> {
    return await prisma.tarefa.create({
      data,
    });
  }

  async update(email: string, data: {
    name: string;
    descricao: string;
    prioridade: string;
    finalizada: boolean;
    data_termino?: string | null;
  }): Promise<Tarefa | null> {
    const membro = await prisma.member.findUnique({ where: { email } });

    if (!membro) {
      throw new Error('Membro não encontrado');
    }

    const updateData: Record<string, any> = {
      name: data.name,
      descricao: data.descricao,
      prioridade: data.prioridade,
      finalizada: data.finalizada,
      data_termino: data.data_termino ? new Date(data.data_termino).toISOString() : null,
    };

    const tarefaAtualizada = await prisma.tarefa.updateMany({
      where: { membroEmail: membro.email },
      data: updateData,
    });

    if (tarefaAtualizada.count === 0) {
      throw new Error('Nenhuma tarefa encontrada para atualizar');
    }

    const tarefa = await prisma.tarefa.findFirst({
      where: { membroEmail: membro.email, name: data.name },
      include: { membro: true },
    });

    return tarefa;
  }

  async findTarefaByEmail(email: string): Promise<Tarefa[]> {
    const tarefas = await prisma.tarefa.findMany({
      where: {
        membro: {
          email: email,
        },
      },
      include: {
        membro: true,
      },
    });
    return tarefas;
  }

  async findTarefaByName(name: string): Promise<Tarefa | null> {
    return await prisma.tarefa.findFirst({
      where: { name },
      include: { membro: true },
    });
  }

  async findAll(): Promise<Tarefa[]> {
    return await prisma.tarefa.findMany();
  }

  async delete(email: string): Promise<boolean> {
    try {
      await prisma.tarefa.deleteMany({
        where: {
          membro: {
            email: email,
          },
        },
      });
      return true;
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      return false;
    }
  }
}

export default new TarefaRepository();

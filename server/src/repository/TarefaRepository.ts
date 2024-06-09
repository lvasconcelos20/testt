import { Tarefa } from '@prisma/client';
import prisma from '../database';
import {TarefaCreateInput } from '../DTOs';


class TarefaRepository {

  
   async create(data: TarefaCreateInput): Promise<Tarefa> {
    return await prisma.tarefa.create({
      data,
    });
  }

  async findTarefaById(id: number): Promise<Tarefa | null> {
    return await prisma.tarefa.findUnique({
      where: { id },
      include: { membro: true}, //incluir o membro
    });
  }
  

 
  async update(email: string, dados: {
    name: string;
    descricao: string;
    prioridade: string;
    finalizada: boolean;
    data_termino?: string | null;
}): Promise<Tarefa | null> {
    // Busca o membro associado ao email fornecido
    const membro = await prisma.member.findUnique({ where: { email } });

    // Verifica se o membro foi encontrado
    if (!membro) {
        throw new Error('Membro não encontrado');
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!dados.name || !dados.prioridade || dados.finalizada === undefined) {
        throw new Error('Nome, prioridade e finalizada são campos obrigatórios.');
    }

    // Cria um objeto que mapeia os campos de dados do Prisma
    const updateData: Record<string, any> = {
        name: dados.name,
        descricao: dados.descricao,
        prioridade: dados.prioridade,
        finalizada: dados.finalizada,
        data_termino: dados.data_termino ? new Date(dados.data_termino).toISOString() : null, // Converte a data no formato ISO, se fornecida
    };

    // Realiza a atualização no banco de dados
    const tarefaAtualizada = await prisma.tarefa.updateMany({
        where: { membroEmail: membro.email },
        data: updateData,
    });

    // Verifica se nenhuma tarefa foi encontrada para atualizar
    if (tarefaAtualizada.count === 0) {
        throw new Error('Nenhuma tarefa encontrada para atualizar');
    }

    // Busca a tarefa atualizada para retornar
    const tarefa = await prisma.tarefa.findFirst({
        where: { membroEmail: membro.email, name: dados.name },
        include: { membro: true },
    });

    return tarefa;
}
async findTarefaByEmail(email: string): Promise<Tarefa | null> {
  const tarefa = await prisma.tarefa.findFirst({
      where: {
          membro: {
              email: email,
          },
      },
      include: {
          membro: true,
      },
  });

  return tarefa;
}

async findTarefaByName(name: string): Promise<Tarefa | null> {
  return await prisma.tarefa.findFirst({
    where: { name },
    include: { membro: true }, // Certifique-se de incluir a relação necessária
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

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.member.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })

  // Aqui, você pode adicionar uma instrução para ver o que foi gravado no banco de dados
  const members = await prisma.member.findMany() // Ou outra operação para verificar
  console.dir(members) // Exemplo de uso para inspeção de dados

  // Certifique-se de encerrar o cliente do Prisma quando terminar
  await prisma.$disconnect()  
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

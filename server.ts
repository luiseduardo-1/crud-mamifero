import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const fastify = Fastify()
fastify.register(cors, { 
  
})

fastify.post('/cadastro', async(req : any, reply : any) => {
  const chimpanze = await prisma.chimpanze.create({
    data: {
      nome: req.body.Nome,
      nome_cientifico: req.body.nome_cientifico,
      peso: req.body.peso,
      pelos: req.body.pelos
    }
  })
  reply.send('Criado com sucesso')
})

fastify.get('/busca/:nome', async(req: any, reply : any) => {
  let nome = req.params.nome
  let chimpanze = await prisma.chimpanze.findMany({
    where: {
      nome: {
        contains: nome
      }
    }
  })
  reply.send(chimpanze)
})

fastify.get('/busca/todos', async(req: any, reply : any) => {
  let nome = req.params.nome
  let chimpanze = await prisma.chimpanze.findMany()
  reply.send(chimpanze)
})

fastify.put('/atualizar/:nome', async(req: any, reply : any) => {
  let nome = req.params.nome
  await prisma.chimpanze.update({
    where: {
      nome: nome
    },
    data: {
        nome: req.body.Nome,
        nome_cientifico: req.body.nome_cientifico,
        peso: req.body.peso,
        pelos: req.body.pelos
    }
  })

  let mostrar = await prisma.chimpanze.findUnique({
    where: {
      nome: req.body.Nome
    }
  })
  reply.send(mostrar)
})


fastify.delete('/deletar/:nome', async(req: any, reply : any) => {
  let nome = req.params.nome
  let chimpanze = await prisma.chimpanze.delete({
    where: {
      nome: nome
    }
  })
  reply.send("O Chimpanze foi apagado com sucesso")
})

fastify.listen({ port: 3000 })
console.log('Online')
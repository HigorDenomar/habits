import Fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './lib/prisma';

const PORT = 3333;

const app = Fastify();

app.register(cors);

app.get('/', async () => {
  const habits = await prisma.habit.findMany();

  return habits;
});

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`🚀 Server is running on port ${PORT}.`));



import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import './database';
import { memberRouter, tarefaRouter } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002; 

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

app.use(express.json());
app.use('/member', memberRouter);
app.use('/tarefa', tarefaRouter);
app.get('/', (req, res) => {
  res.send('Servidor conectado com sucesso!');
});


app.post('/tarefa', async (req, res, next) => {
  try {
    const tarefa = req.body;
    res.status(201).json({message: 'Tarefa criada com sucesso.',
      tarefa
    });
  } catch (error) {
    next(error);
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server Rodando na porta http://localhost:${PORT}`);
});


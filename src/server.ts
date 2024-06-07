import express from 'express';
import dotenv from 'dotenv'; 
import './database';
import  { memberRouter } from './routes';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/member',  memberRouter); 

const PORT = process.env.PORT || 3001; // Porta configurada

app.listen(PORT, () => {
  console.log(`🚀 Server Rodando na porta http://localhost:${PORT}`);
});

export default app;


import express from "express"
import dotenv from "dotenv"
import "./database";

dotenv.config()
const app = express()
app.use(express.json())

app.listen(process.env.PORT || 3001, () => {
  console.log(process.env.PORT)
  console.log(`🚀 Server Rodando`);
});


export default app
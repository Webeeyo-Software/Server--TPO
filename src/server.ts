import express, {Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize, { syncDatabase } from './models';
import QuestionBankRouter from './routers/questionsBank/QuestionBankRouter';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/questionbank", QuestionBankRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

async function startServer(){
  await syncDatabase();
  app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
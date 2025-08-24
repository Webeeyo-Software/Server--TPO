import express, {Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize, { syncDatabase } from './models';
import TPORegistrations from "./routers/tpoRegistration/TPORegistration.routes";
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use("/api/tpo-registrations", TPORegistrations );


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});
app.use("/api/tpo-registrations", TPORegistrations );
async function startServer(){
  await syncDatabase();
  app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
import express, {Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize, { syncDatabase } from './models';
import router from "./routers/tpoRegistration/TPORegistration.routes"
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/profile/personal-details', router);
app.use('/api/profile/religions', Religionsrouter);
app.use('/api/profile/departments', DepartmentRouter);
app.use('/api/profile/bloodgroups', BloodgroupRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});
app.use("/api/tpo-registrations", router);
async function startServer(){
  await syncDatabase();
  app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);
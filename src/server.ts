import express, {Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize, { syncDatabase } from './models';
import router from './routers/profile/PersonalDetails.router';
import Religionsrouter from './routers/profile/Religions.router';
import DepartmentRouter from './routers/profile/Department.router';
import BloodgroupRouter from './routers/profile/Bloodgroup.router';
import companies from './routers/companies/companies';
import TPORegistrations from "./routers/tpoRegistration/TPORegistration.routes";
import notices from './routers/notices/Notice'
import QuestionBankRouter from './routers/questionsBank/QuestionBankRouter';


dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/companies', companies);
app.use('/api/profile/personal-details', router);
app.use('/api/profile/religions', Religionsrouter);
app.use('/api/profile/departments', DepartmentRouter);
app.use('/api/profile/bloodgroups', BloodgroupRouter);
app.use("/api/tpo-registrations", TPORegistrations );
app.use("/api/notice", notices);
app.use('/api/questionbank', QuestionBankRouter);

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
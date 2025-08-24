import express, {Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize, { syncDatabase } from './models';
import router from './routers/profile/PersonalDetails.router';
import Religionsrouter from './routers/profile/Religions.router';
import DepartmentRouter from './routers/profile/Department.router';
import BloodgroupRouter from './routers/profile/Bloodgroup.router';
import NationalitiesRouter from './routers/profile/Nationalities.router';
import Addressrouter from './routers/profile/AddressDetails.router';
import ExaminationDetailsRouter from './routers/profile/ExaminationDetails.router';
import AcademicDetailsrouter from './routers/profile/AcademicDetails.router';
import categoryrouter from './routers/profile/Categories.router';
import OfferLetterrouter from './routers/profile/OfferLetter.router';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
 app.use(cors({
  origin:'http://localhost:8081',
  methods:["POST","GET","PUT","DELETE"],
  allowedHeaders:['content-type','Authorization']
 }))



app.use(express.json());

app.use('/api/profile/personal-details', router);
app.use('/api/profile/religions', Religionsrouter);
app.use('/api/profile/departments', DepartmentRouter);
app.use('/api/profile/bloodgroups', BloodgroupRouter);
app.use('/api/profile/nationalities', NationalitiesRouter);
app.use('/api/profile/address-details', Addressrouter);
app.use('/api/profile/examination-details', ExaminationDetailsRouter);
app.use('/api/profile/academic-details', AcademicDetailsrouter);
app.use('/api/profile/categories', categoryrouter);
app.use('/api/profile/offer-letters', OfferLetterrouter);


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
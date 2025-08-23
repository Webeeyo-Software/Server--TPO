import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routers/auth/auth";
import db from "./models";
import userRoutes from "./routers/auth/user";
import companies from './routers/companies/companies'
import TPORegistrations from "./routers/tpoRegistration/TPORegistration.routes";
import application from "./routers/applications/application";
import router from './routers/profile/PersonalDetails.router';
import Religionsrouter from './routers/profile/Religions.router';
import DepartmentRouter from './routers/profile/Department.router';
import BloodgroupRouter from './routers/profile/Bloodgroup.router';
import { syncDatabase } from './models';
import { sendOtp ,verifyOtp} from "./controllers/auth/sentController";
import { resetPasswordByEmail } from "./controllers/auth/resetpassword";
dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("/user", userRoutes);
app.use("/resetpassword", resetPasswordByEmail);


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/companies', companies);
app.use('/api/profile/personal-details', router);
app.use('/api/profile/religions', Religionsrouter);
app.use('/api/profile/departments', DepartmentRouter);
app.use('/api/profile/bloodgroups', BloodgroupRouter);
app.use("/api/tpo-registrations", TPORegistrations );
app.use("/api/applications", application);
app.post('/auth/sendOtp', sendOtp);
app.post('/auth/verifyOtp', verifyOtp);



app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Mount under /api/companies
async function startServer() {
  await syncDatabase(); // keeps your DB auth step
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

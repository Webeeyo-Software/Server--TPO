import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routers/auth/auth";
import companies from "./routers/companies/companies";
import TPORegistrations from "./routers/tpoRegistration/TPORegistration.routes";
import application from "./routers/applications/application";
import personalDetailsRouter from "./routers/profile/PersonalDetails.router";
import religionsRouter from "./routers/profile/Religions.router";
import departmentRouter from "./routers/profile/Department.router";
import bloodgroupRouter from "./routers/profile/Bloodgroup.router";
import notice from './routers/notices/Notice';
import question from './routers/questionsBank/QuestionBankRouter';
import { syncDatabase } from "./models";
import { authenticateToken } from "./middleware/authMiddleware";
import AcademicDetails from './routers/profile/AcademicDetails.router';
import AddressDetails from './routers/profile/AddressDetails.router';
import Bloodgroup from './routers/profile/Bloodgroup.router';
import Categories from './routers/profile/Categories.router';
import Department from './routers/profile/Department.router';
import ExaminationDetails from './routers/profile/ExaminationDetails.router';
import Nationalities from './routers/profile/Nationalities.router';
import OfferLetter from './routers/profile/OfferLetter.router';
import PersonalDetails from './routers/profile/PersonalDetails.router';
import Religions from './routers/profile/Religions.router';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/companies", authenticateToken, companies);
app.use(
  "/api/profile/personal-details",
  authenticateToken,
  personalDetailsRouter
);
app.use("/api/profile/religions", authenticateToken, religionsRouter);
app.use("/api/profile/departments", authenticateToken, departmentRouter);
app.use("/api/profile/bloodgroups", authenticateToken, bloodgroupRouter);
app.use("/api/tpo-registrations", authenticateToken, TPORegistrations);
app.use("/api/applications", authenticateToken, application);
app.use("/api/notice", authenticateToken, notice);
app.use("/api/question", authenticateToken, question);
app.use("/api/AcademicDetails", authenticateToken, AcademicDetails);
app.use("/api/Bloodgroup", authenticateToken, Bloodgroup);
app.use("/api/AddressDetails", authenticateToken, AddressDetails);
app.use("/api/Categories", authenticateToken, Categories);
app.use("/api/Department", authenticateToken, Department);
app.use("/api/ExaminationDetails", authenticateToken, ExaminationDetails);
app.use("/api/Nationalities", authenticateToken, Nationalities);
app.use("/api/OfferLetter", authenticateToken, OfferLetter);
app.use("/api/PersonalDetails", authenticateToken, PersonalDetails);
app.use("/api/Religions", authenticateToken, Religions);


async function startServer() {
  await syncDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

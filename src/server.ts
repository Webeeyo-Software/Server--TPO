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

import { syncDatabase } from "./models";
import { sendOtp, verifyOtp } from "./controllers/auth/sentController";
import { resetPasswordByEmail } from "./controllers/auth/resetpassword";
import { authenticateToken } from "./middleware/authMiddleware"; 
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
app.use("/api/profile/personal-details", authenticateToken, personalDetailsRouter);
app.use("/api/profile/religions", authenticateToken, religionsRouter);
app.use("/api/profile/departments", authenticateToken, departmentRouter);
app.use("/api/profile/bloodgroups", authenticateToken, bloodgroupRouter);
app.use("/api/tpo-registrations", authenticateToken, TPORegistrations);
app.use("/api/applications", authenticateToken, application);

async function startServer() {
  await syncDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

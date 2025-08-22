import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import db, { syncDatabase } from "./models"; // clearer than importing default as 'sequelize'
import companiesRouter from "./routers/companies/CompanyDataRouter"; // point to the file that actually exists

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simple root check
app.get("/", (_req: Request, res: Response) => {
  res.send("OK");
});

// Mount under /api/companies
app.use("/api/companies", companiesRouter);

async function startServer() {
  await syncDatabase(); // keeps your DB auth step
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routers/auth/auth";
import db from "./models";
import userRoutes from "./routers/auth/user";

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

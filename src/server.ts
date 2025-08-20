import express from "express";
import noticeRoutes from "./routers/notices/Notice"; // <-- Change to "./routes/notices/Notice" if your folder is 'routes'
import companyRoutes from "./routers/questionsBank/companyRoutes";
import questionRoutes from "./routers/questionsBank/questionRoutes";
import quizRoutes from "./routers/questionsBank/quizRoutes";



const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON

// Mount router at /Notices
app.use("/Notices", noticeRoutes);
app.use("/Notices", noticeRoutes);
app.use("/Notices/filter", require("./routers/notices/FilterNotice").default);

app.use("/companies", companyRoutes);
app.use("/questions", questionRoutes);
app.use("/quizzes", quizRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

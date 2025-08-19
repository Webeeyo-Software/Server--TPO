import express from "express";
import noticeRoutes from "./routers/notices/Notice"; // <-- Change to "./routes/notices/Notice" if your folder is 'routes'

const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON

// Mount router at /Notices
app.use("/Notices", noticeRoutes);
app.use("/Notices", noticeRoutes);
app.use("/Notices/filter", require("./routers/notices/FilterNotice").default);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import express, {Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize, { syncDatabase } from './models';
import { getOfferLetterById } from './controllers/profile/OfferLetter.controller';
import offerLetterRouter from './routers/profile/OfferLetter.router';
import { addCVS, getAllCVs, updateCV, deleteCV } from './controllers/profile/UploadCV.controller';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/offer-letters', offerLetterRouter);
app.get('/api/offer-letters/:id', getOfferLetterById);
app.post('/api/cvs/upload', addCVS);
app.get('/api/cvs', getAllCVs);
app.put('/api/cvs/:id', updateCV);
app.delete('/api/cvs/:id', deleteCV);

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
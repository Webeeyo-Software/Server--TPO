import express from "express";
import { uploadOfferLetter } from "../../controllers/profile/OfferLetter.controller";
import { getOfferLetterById } from "../../controllers/profile/OfferLetter.controller";
import multer from "multer";

const OfferLetterrouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/offerletters"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

OfferLetterrouter.post("/", upload.single("file"), uploadOfferLetter);
OfferLetterrouter.get("/:id", getOfferLetterById);
export default OfferLetterrouter;
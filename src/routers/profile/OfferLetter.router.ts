import express from "express";
import { uploadOfferLetter } from "../../controllers/profile/OfferLetter.controller";
import { getOfferLetterById } from "../../controllers/profile/OfferLetter.controller";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/offerletters"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadOfferLetter);
router.get("/:id", getOfferLetterById);
export default router;

import express from "express";
import multer from "multer";
import { addCVS, getAllCVs, updateCV, deleteCV } from "../../controllers/profile/UploadCV.controller";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("file"), addCVS);
router.get("/", getAllCVs);
router.put("/:id", updateCV);
router.delete("/:id", deleteCV);

export default router;

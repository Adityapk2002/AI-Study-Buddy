import express from "express";
import { askAnything, summarizeNotes, generateQuiz } from "../controller/aiController";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/ask",askAnything);
router.post("/summarize",upload.single('file'),summarizeNotes);
router.post("/quiz",generateQuiz);

export default router;
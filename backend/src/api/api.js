import express from "express";
import checkWord from "../api/check-word.js";

const router = express.Router();

router.get("/word", checkWord);

export default router;

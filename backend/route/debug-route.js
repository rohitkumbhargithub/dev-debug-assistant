import { Router } from "express";
import { analyzeError, getHistory, searchErrorMessage } from "../controller/debug-controller.js";

const router = Router();

router.post("/analyze-error", analyzeError);
router.get("/history", getHistory);
router.get("/search", searchErrorMessage);

export default router;
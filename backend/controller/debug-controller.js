import { analyzeErrorService, searchErrorMessageService } from "../services/debug-service.js";
import { logger } from "../utils/logger.js";

export const analyzeError = async (req, res) => {
    try {
        logger.info("API hit: /analyze-error", {
            body: req.body,
            ip: req.ip,
        });
        const { errorMessage, codeSnippet } = req.body;
        if (!errorMessage) {
            return res.status(400).json({
                success: false,
                message: "errorMessage is required",
            });
        }
        const result = await analyzeErrorService(errorMessage, codeSnippet);
        res.json(result);
    } catch (error) {
        logger.error("Controller Error", { message: error.message });
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getHistory = async (req, res) => {
    try {

        logger.info("API hit: /getHistory", {
            body: req.body,
            ip: req.ip,
        });

        // const result = await getHistoryService();
        // res.json(result);
    } catch (error) {
        logger.error("getHistory Error", { message: error.message });
        res.status(500).json({ error: "Internal server error" });
    }
}

export const searchErrorMessage = async (req, res) => {
    try {
        logger.info("API hit: /searchErrorMessage", {
            body: req.body,
            ip: req.ip,
        });
        const search = req.query.search;
        if (!search) {
            return res.status(400).json({
                success: false,
                message: "search is required",
            });
        }
        const result = await searchErrorMessageService(search);
        res.json(result);
    } catch (error) {
        logger.error("searchErrorMessage Error", { message: error.message });
        res.status(500).json({ error: "Internal server error" });
    }
}

import { aiService } from "./ai-service.js";
import { findError, CreateErrorMessage, searchErrorMessage } from "../db-repo/debug-repo.js";

export const analyzeErrorService = async (errorMessage, codeSnippet) => {
    try {
        if (errorMessage.length > 500) {
            return res.status(400).json({
                error: "Error message too long",
            });
        }
        // 1. Check DB
        const existingError = await findError(errorMessage);

        if (existingError) {
            return existingError;
        }

        // 2. Call AI (or mock for now)
        // const result = await aiService(errorMessage, codeSnippet);
        const result = {
            explanation: `Mock explanation for: ${errorMessage}`,
            causes: ["Mock cause 1", "Mock cause 2"],
            fixes: ["Mock fix 1", "Mock fix 2"],
        };

        // 3. Save to DB
        const newError = await CreateErrorMessage({
            errorMessage,
            codeSnippet,
            explanation: result.explanation,
            causes: result.causes,
            fixes: result.fixes,
        });

        // 4. Return result
        return newError;

    } catch (error) {
        console.error("Service Error:", error);

        return {
            explanation: "Something went wrong while analyzing the error.",
            causes: ["Internal server issue"],
            fixes: ["Try again later"],
        };
    }
};

export const searchErrorMessageService = async (search) => {
    try {
        const result = await searchErrorMessage(search);
        return result;
    } catch (error) {
        console.error("Error searching error message:", error);
        throw error;
    }
};

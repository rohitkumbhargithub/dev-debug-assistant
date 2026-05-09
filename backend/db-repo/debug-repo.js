import { Debug } from "../model/debug-model.js";

export const findError = async (errorMessage) => {
    try {
        const findError = await Debug.findOne({ errorMessage });
        return findError;
    } catch (error) {
        console.error("Error finding error:", error);
        throw error;
    }
}

export const CreateErrorMessage = async ({ errorMessage, codeSnippet, explanation, causes, fixes }) => {
    try {
        const newError = await Debug.create({
            errorMessage,
            codeSnippet,
            explanation,
            causes,
            fixes,
        });
        return newError;
    } catch (error) {
        console.error("Error creating error:", error);
        throw error;
    }
}

export const searchErrorMessage = async (search, page, limit) => {
    try {
        const skip = (page - 1) * limit;

        const results = await Debug.find(
            { $text: { $search: search } },
            { score: { $meta: "textScore" } }
        )
            .sort({ score: { $meta: "textScore" } })
            .select("errorMessage explanation causes fixes")
            .skip(skip)
            .limit(Number(limit));

        const total = await Debug.countDocuments({
            $text: { $search: search },
        });

        return {
            page: Number(page),
            limit: Number(limit),
            total,
            results,
        };

    } catch (error) {
        console.error("Service Error:", error);
        throw error;
    }
};
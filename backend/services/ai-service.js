import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const aiService = async (errorMessage, codeSnippet) => {
    try {
        const prompt = `
            Return response ONLY in JSON format:

            {
            "explanation": "string",
            "causes": ["string"],
            "fixes": ["string"]
            }

            Error: ${errorMessage}
            Code: ${codeSnippet || "Not provided"}
        `;
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        // raw text from AI
        const content = response.choices[0].message.content;

        // convert string → JSON
        const parsed = JSON.parse(content);

        return parsed;
    } catch (error) {
        console.error("Error analyzing error:", error);
        throw error;
    }
}
import mongoose from "mongoose";

const debugSchema = new mongoose.Schema({
    errorMessage: { type: String, required: true },
    codeSnippet: { type: String, required: true },
    explanation: { type: String },
    causes: [{ type: String }],
    fixes: [{ type: String }],
}, {
    timestamps: true,
});

debugSchema.index({
    errorMessage: "text",
    explanation: "text",
});

export const Debug = mongoose.model("Debug", debugSchema);


import { useState } from "react";
import { analyzeError } from "../services/api";

const Analyze = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [codeSnippet, setCodeSnippet] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        try {
            const res = await analyzeError({ errorMessage, codeSnippet });
            setResult(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Analyze Error</h2>

            <input
                placeholder="Enter error message"
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
            />

            <textarea
                placeholder="Code snippet (optional)"
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
            />

            <button onClick={handleSubmit}>Analyze</button>

            {result && (
                <div>
                    <h3>Explanation</h3>
                    <p>{result.explanation}</p>

                    <h3>Causes</h3>
                    <ul>
                        {result.causes.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>

                    <h3>Fixes</h3>
                    <ul>
                        {result.fixes.map((f, i) => (
                            <li key={i}>{f}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Analyze;
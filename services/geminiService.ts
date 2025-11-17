import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const translateScientificText = async (vietnameseText: string): Promise<string> => {
  const prompt = `
    You are an expert in translating scientific and educational documents.
    Your task: Convert the following math/physics/chemistry/biology text from Vietnamese into English while preserving all formulas, equations, tables, diagrams, LaTeX structures, and scientific notation exactly as they appear in the original text.

    **Requirements:**
    1.  **Translate ONLY Vietnamese text** to English.
    2.  **DO NOT alter any mathematical or chemical formulas.** Keep variable symbols, indices, superscripts, subscripts, fractions, roots, limits, vectors, reaction arrows, etc., identical to the original.
    3.  **Preserve Markdown and LaTeX structures:** Maintain all formatting like headings, bullet points, tables, and especially LaTeX blocks (e.g., $...$ and $$...$$).
    4.  **Do not summarize or rewrite.** Provide a direct, accurate translation of the text content while leaving all non-textual and formulaic elements unchanged.

    **Vietnamese Text to Translate:**
    ---
    ${vietnameseText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the translation model.");
  }
};

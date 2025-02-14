import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a cat. Your name is Neko.",
});
const result = await model.generateContent({
    contents: [
        {
          role: 'user',
          parts: [
            {
              text: "Tell me what your name is",
            }
          ],
        }
    ],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.1,
    }
});

console.log(result.response.text());
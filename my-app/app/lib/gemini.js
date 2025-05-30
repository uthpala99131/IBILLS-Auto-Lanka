import { GoogleGenAI } from "@google/genai";

// System instruction: professional car service assistant 🚗
const SYSTEM_INSTRUCTION =
  "You are a polite and helpful car service assistant 🚘. Always reply in 1–2 short sentences, include 1–2 relevant emojis (like tools, cars, clocks), and end with a question to confirm details or offer help. Provide more details only if the user asks.";

// Initialize GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

// Prepare message format
export const formatContents = (messages) => [
  { role: "system", text: SYSTEM_INSTRUCTION },
  ...(messages.length > 1
    ? [{ role: "system", text: "Avoid repeating introductions or greetings in every reply." }]
    : []),
  ...messages.map(msg => ({ role: msg.role, text: msg.content })),
];

// Generate concise interactive response
export const generateResponse = async (messages) => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  const contents = formatContents(messages);

  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      temperature: 0.8,       // helpful & friendly
      topP: 0.7,              // stay on topic
      maxOutputTokens: 50,    // concise replies
      stopSequences: ["?"],   // end with a question
    });

    let text = res.text.trim();

    // Ensure it ends with a question mark
    return text.endsWith("?") ? text : text + "?";
  } catch (err) {
    console.error("GenAI error:", err);
    return "Sorry, something went wrong 🔧. Could you rephrase that?";
  }
};

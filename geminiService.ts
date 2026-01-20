import { GoogleGenAI, Type } from "@google/genai";

// Initialize using exactly the named parameter as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSportsNews = async (sport: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, exciting sports news article title and content for ${sport}.`,
      config: {
        responseMimeType: "application/json",
        // Recommended method for structured output using responseSchema and Type
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The catchy title of the news article.",
            },
            content: {
              type: Type.STRING,
              description: "The body content of the article.",
            },
          },
          required: ["title", "content"],
        },
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    try {
      return JSON.parse(text.trim());
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON:", text);
      return { title: "Breaking News Update", content: "The situation on the field is developing rapidly. Stay tuned for more details." };
    }
  } catch (error) {
    console.error("Error generating news:", error);
    return { title: "Latest Updates", content: "Stay tuned for more sports updates coming soon." };
  }
};

export const generateMatchSummary = async (matchDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a 2-sentence thrilling commentary for a match described as: ${matchDescription}`,
    });
    return response.text || "The match continues with intense action from both sides!";
  } catch (error) {
    return "The match continues with intense action from both sides!";
  }
};

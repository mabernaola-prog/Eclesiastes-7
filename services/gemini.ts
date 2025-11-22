import { GoogleGenAI } from "@google/genai";
import { GeneratedImage } from "../types";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a single image based on a specific prompt and style.
 */
const generateSingleImage = async (
  prompt: string,
  style: string,
  id: string,
  title: string
): Promise<GeneratedImage> => {
  const fullPrompt = `Generate a high-quality image. 
  Concept: ${prompt}. 
  Style constraint: ${style}. 
  Ensure the image is visually striking and high resolution.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: fullPrompt }
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: "1:1", 
        }
      }
    });

    let imageUrl = "";
    
    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in response");
    }

    return {
      id,
      url: imageUrl,
      prompt: fullPrompt,
      title
    };

  } catch (error) {
    console.error(`Error generating image for ${title}:`, error);
    throw error;
  }
};

/**
 * Orchestrates the generation of two contrasting images.
 */
export const generateContrastPair = async (
  left: { description: string; title: string },
  right: { description: string; title: string },
  style: string
): Promise<[GeneratedImage, GeneratedImage]> => {
  
  // We run these in parallel to save time
  const [leftImage, rightImage] = await Promise.all([
    generateSingleImage(left.description, style, 'left', left.title),
    generateSingleImage(right.description, style, 'right', right.title)
  ]);

  return [leftImage, rightImage];
};

import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Using gemini-2.5-flash for both chat and vision, and streaming for low-latency
const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: 'You are a friendly and helpful chatbot that speaks Moroccan Darija. Your name is "Bot". Respond to all prompts in Moroccan Darija.',
  },
});

export const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve('');
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export async function* sendMessage(prompt: string, imageFile?: File) {
  try {
    // FIX: Explicitly type `parts` as `any[]` to allow both text and image parts.
    // The original code inferred the type as `{ text: string }[]`, causing an error
    // when trying to add an image part.
    const parts: any[] = [
      { text: prompt },
    ];
    if (imageFile) {
        const imagePart = await fileToGenerativePart(imageFile);
        parts.unshift(imagePart);
    }
    
    // FIX: The `chat.sendMessageStream` method requires the content to be passed
    // within a `message` property. The original code was incorrectly using a `parts` property.
    const messageContent = imageFile ? { message: parts } : { message: prompt };

    const result = await chat.sendMessageStream(messageContent);

    for await (const chunk of result) {
      yield chunk.text;
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    yield "Sme7 lia, w9e3 chi ghalat. 3awed 7awel men be3d.";
  }
}

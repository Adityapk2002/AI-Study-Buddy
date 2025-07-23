import { Request, Response } from "express";
import { generateGeminiContent } from "../utils/gemini";
import pdfParse from "pdf-parse";

export async function askAnything(req: Request, res: Response) {
  try {
    const { question } = req.body as { question: string };
    const prompt = `You are a helpful academic assistant. Only answer questions related      to educational topics like science, math, history, computer science, literature, and school or college subjects.
     If the question is unrelated to study or academics, politely say: "Sorry, I can only assist with study-related topics."
     Now, explain this in simple terms: ${question}
`;

    const result = await generateGeminiContent(prompt);
    res.json({ response: result });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong with Gemini API." });
  }
}


export async function summarizeNotes(req : Request , res : Response){
    if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
    }
    const pdfData = await pdfParse(req.file.buffer);
    const notes = pdfData.text;
    const prompt = `
You are a helpful academic assistant. Only work with academic or study-related content such as lecture notes, textbooks, and educational materials.
If the input is not related to academic topics, respond with: "Sorry, I can only summarize educational content."
Now, summarize the following lecture notes into key bullet points:
${notes}
`;

    const response = await generateGeminiContent(prompt)
    res.json({result : response})
}

export async function generateQuiz(req : Request , res : Response){
    const {notes} = req.body as unknown as {notes : string}
    const prompt = `
You are a helpful academic assistant. Generate quiz questions **only** from study-related content such as lecture notes, academic textbooks, or class materials.
If the content is not academic, respond with: "Sorry, I can only create quizzes from educational content."
Now, generate 5 quiz questions (a mix of multiple-choice and short-answer) based on the following notes:
${notes}
`;

    const response = await generateGeminiContent(prompt)
    res.json({result : response})

}
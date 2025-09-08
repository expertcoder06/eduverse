
'use server';

/**
 * @fileOverview An AI flow that generates quiz questions for a given subject.
 *
 * - generateQuizQuestions - A function that creates a quiz.
 * - GenerateQuizInput - The input type for the function.
 * - GenerateQuizOutput - The return type for the function.
 * - QuizQuestion - The schema for a single quiz question.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateQuizInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

export const QuizQuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('An array of 4 multiple-choice options.'),
  correctAnswer: z.string().describe('The correct answer from the options array.'),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const GenerateQuizOutputSchema = z.object({
  questions: z
    .array(QuizQuestionSchema)
    .describe('An array of 5 quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuizQuestions(
  input: GenerateQuizInput
): Promise<GenerateQuizOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an expert educator and quiz creator. Your task is to generate a challenging but fair multiple-choice quiz on the given subject.

Subject: {{{subject}}}

Please generate exactly 5 multiple-choice questions. Each question must have exactly 4 options. One of these options must be the correct answer.

Ensure the questions cover a range of topics within the subject and vary in difficulty.
`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

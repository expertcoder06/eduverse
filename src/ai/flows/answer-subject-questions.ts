'use server';

/**
 * @fileOverview A flow that answers questions about a subject.
 *
 * - answerSubjectQuestion - A function that answers a question about a subject.
 * - AnswerSubjectQuestionInput - The input type for the answerSubjectQuestion function.
 * - AnswerSubjectQuestionOutput - The return type for the answerSubjectQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerSubjectQuestionInputSchema = z.object({
  subject: z.string().describe('The subject of the question.'),
  question: z.string().describe('The question to answer.'),
});
export type AnswerSubjectQuestionInput = z.infer<typeof AnswerSubjectQuestionInputSchema>;

const AnswerSubjectQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AnswerSubjectQuestionOutput = z.infer<typeof AnswerSubjectQuestionOutputSchema>;

export async function answerSubjectQuestion(input: AnswerSubjectQuestionInput): Promise<AnswerSubjectQuestionOutput> {
  return answerSubjectQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerSubjectQuestionPrompt',
  input: {schema: AnswerSubjectQuestionInputSchema},
  output: {schema: AnswerSubjectQuestionOutputSchema},
  prompt: `You are an expert in the subject of {{subject}}.

  Please answer the following question about the subject:

  {{question}}`,
});

const answerSubjectQuestionFlow = ai.defineFlow(
  {
    name: 'answerSubjectQuestionFlow',
    inputSchema: AnswerSubjectQuestionInputSchema,
    outputSchema: AnswerSubjectQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

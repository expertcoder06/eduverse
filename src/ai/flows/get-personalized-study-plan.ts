'use server';
/**
 * @fileOverview An AI agent that generates personalized study plans for students.
 *
 * - getPersonalizedStudyPlan - A function that generates personalized study plans.
 * - GetPersonalizedStudyPlanInput - The input type for the getPersonalizedStudyPlan function.
 * - GetPersonalizedStudyPlanOutput - The return type for the getPersonalizedStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPersonalizedStudyPlanInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  subject: z.string().describe('The subject for which the study plan is needed.'),
  strengths: z.string().describe('The strengths of the student in the subject.'),
  weaknesses: z.string().describe('The weaknesses of the student in the subject.'),
  examDate: z.string().describe('The date of the upcoming exam.'),
});
export type GetPersonalizedStudyPlanInput = z.infer<typeof GetPersonalizedStudyPlanInputSchema>;

const GetPersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A personalized study plan for the student.'),
});
export type GetPersonalizedStudyPlanOutput = z.infer<typeof GetPersonalizedStudyPlanOutputSchema>;

export async function getPersonalizedStudyPlan(input: GetPersonalizedStudyPlanInput): Promise<GetPersonalizedStudyPlanOutput> {
  return getPersonalizedStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPersonalizedStudyPlanPrompt',
  input: {schema: GetPersonalizedStudyPlanInputSchema},
  output: {schema: GetPersonalizedStudyPlanOutputSchema},
  prompt: `You are a virtual AI mentor. Your task is to generate a personalized study plan for the student, considering their strengths, weaknesses, and the upcoming exam date.

  Student Name: {{{studentName}}}
  Subject: {{{subject}}}
  Strengths: {{{strengths}}}
  Weaknesses: {{{weaknesses}}}
  Exam Date: {{{examDate}}}

  Generate a detailed and actionable study plan that helps the student improve their academic performance in the given subject. The study plan should include specific topics to focus on, learning resources, practice exercises, and time management tips.
  `,
});

const getPersonalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'getPersonalizedStudyPlanFlow',
    inputSchema: GetPersonalizedStudyPlanInputSchema,
    outputSchema: GetPersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview An AI agent that provides career guidance based on student interests and skills.
 *
 * - getCareerGuidance - A function that provides career recommendations.
 * - GetCareerGuidanceInput - The input type for the getCareerGuidance function.
 * - GetCareerGuidanceOutput - The return type for the getCareerGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetCareerGuidanceInputSchema = z.object({
  interests: z.string().describe('The student\'s interests and hobbies.'),
  skills: z.string().describe('The student\'s skills.'),
  subjects: z.string().describe('The student\'s favorite school subjects.'),
});
export type GetCareerGuidanceInput = z.infer<typeof GetCareerGuidanceInputSchema>;

const GetCareerGuidanceOutputSchema = z.object({
  recommendation: z.string().describe('A detailed career recommendation with potential paths, required skills, and next steps.'),
});
export type GetCareerGuidanceOutput = z.infer<typeof GetCareerGuidanceOutputSchema>;


export async function getCareerGuidance(input: GetCareerGuidanceInput): Promise<GetCareerGuidanceOutput> {
  return getCareerGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCareerGuidancePrompt',
  input: {schema: GetCareerGuidanceInputSchema},
  output: {schema: GetCareerGuidanceOutputSchema},
  prompt: `You are an expert career counselor for students. Based on the student's interests, skills, and favorite subjects, provide a thoughtful and encouraging career recommendation.

  Student Profile:
  - Interests: {{{interests}}}
  - Skills: {{{skills}}}
  - Favorite Subjects: {{{subjects}}}

  Generate a recommendation that includes:
  1.  **Top 2-3 Career Paths:** Suggest specific careers that align with the student's profile.
  2.  **Why it's a good fit:** Briefly explain why each path is a good match.
  3.  **Key Skills to Develop:** List important skills for these careers.
  4.  **Suggested Next Steps:** Recommend concrete actions the student can take, like courses to take, projects to start, or people to talk to.
  
  Format the output as a clear, well-structured markdown string.`,
});

const getCareerGuidanceFlow = ai.defineFlow(
  {
    name: 'getCareerGuidanceFlow',
    inputSchema: GetCareerGuidanceInputSchema,
    outputSchema: GetCareerGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    
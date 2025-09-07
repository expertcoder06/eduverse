'use server';

/**
 * @fileOverview AI-powered student timetable generator.
 *
 * - generateStudentTimetable - A function that generates a student timetable.
 * - GenerateStudentTimetableInput - The input type for the generateStudentTimetable function.
 * - GenerateStudentTimetableOutput - The return type for the generateStudentTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudentTimetableInputSchema = z.object({
  courses: z
    .array(z.string())
    .describe('A list of courses the student is enrolled in.'),
  preferredStudyTimes: z
    .string()
    .describe(
      'Preferred study times for the student, e.g., mornings, afternoons, evenings.'
    ),
  studentName: z.string().describe('The name of the student.'),
});
export type GenerateStudentTimetableInput = z.infer<
  typeof GenerateStudentTimetableInputSchema
>;

const GenerateStudentTimetableOutputSchema = z.object({
  timetable: z
    .string()
    .describe(
      'A weekly timetable personalized for the student, taking into account their courses and preferred study times.'
    ),
});
export type GenerateStudentTimetableOutput = z.infer<
  typeof GenerateStudentTimetableOutputSchema
>;

export async function generateStudentTimetable(
  input: GenerateStudentTimetableInput
): Promise<GenerateStudentTimetableOutput> {
  return generateStudentTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudentTimetablePrompt',
  input: {schema: GenerateStudentTimetableInputSchema},
  output: {schema: GenerateStudentTimetableOutputSchema},
  prompt: `You are an AI assistant specializing in creating personalized weekly timetables for students.

  Create a detailed weekly timetable for {{studentName}} based on the following information:

  Enrolled Courses: {{courses}}
  Preferred Study Times: {{preferredStudyTimes}}

  The timetable should be well-structured, easy to follow, and optimized for effective learning.
  The timetable should include specific time slots for each course and incorporate the student's preferred study times.
  The output should be a well-formatted string.
  Make sure that the overall weekly workload is balanced, such that there are not too many courses on a given day.
`,
});

const generateStudentTimetableFlow = ai.defineFlow(
  {
    name: 'generateStudentTimetableFlow',
    inputSchema: GenerateStudentTimetableInputSchema,
    outputSchema: GenerateStudentTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

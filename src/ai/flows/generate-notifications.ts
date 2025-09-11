'use server';

/**
 * @fileOverview An AI flow that generates relevant notifications for a student.
 *
 * - generateNotifications - A function that creates notifications.
 * - GenerateNotificationsInput - The input type for the function.
 * - GenerateNotificationsOutput - The return type for the function.
 * - Notification - The schema for a single notification.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateNotificationsInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  recentEvents: z.array(z.string()).describe('A list of recent events, like grades, deadlines, or new resources.'),
});
export type GenerateNotificationsInput = z.infer<typeof GenerateNotificationsInputSchema>;

const NotificationSchema = z.object({
  title: z.string().describe('The title of the notification.'),
  description: z.string().describe('A brief description of the notification content.'),
  category: z.enum(['Assignment', 'Exam', 'Grade', 'Resource', 'General']).describe('The category of the notification.'),
});
export type Notification = z.infer<typeof NotificationSchema>;

const GenerateNotificationsOutputSchema = z.object({
  notifications: z
    .array(NotificationSchema)
    .describe('An array of 3-5 relevant notifications for the student.'),
});
export type GenerateNotificationsOutput = z.infer<typeof GenerateNotificationsOutputSchema>;

export async function generateNotifications(
  input: GenerateNotificationsInput
): Promise<GenerateNotificationsOutput> {
  return generateNotificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNotificationsPrompt',
  input: { schema: GenerateNotificationsInputSchema },
  output: { schema: GenerateNotificationsOutputSchema },
  prompt: `You are an AI assistant for the Pro Learning platform. Your task is to generate clear, concise, and helpful notifications for a student based on recent events.

  Student Name: {{{studentName}}}
  Recent Events:
  {{#each recentEvents}}
  - {{{this}}}
  {{/each}}

  Generate a list of 3 to 5 notifications. The tone should be helpful and encouraging. Classify each notification into one of the following categories: Assignment, Exam, Grade, Resource, or General.
  `,
});

const generateNotificationsFlow = ai.defineFlow(
  {
    name: 'generateNotificationsFlow',
    inputSchema: GenerateNotificationsInputSchema,
    outputSchema: GenerateNotificationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

// src/ai/flows/analyze-clues.ts
'use server';

/**
 * @fileOverview A flow for analyzing clues and providing a detective's perspective on how strongly each clue supports a suspect's guilt.
 *
 * - analyzeClues - A function that analyzes clues and returns an analysis of how strongly each clue supports a suspect's guilt.
 * - AnalyzeCluesInput - The input type for the analyzeClues function.
 * - AnalyzeCluesOutput - The return type for the analyzeClues function.
 */

import {ai, z} from '@/ai/genkit';

const AnalyzeCluesInputSchema = z.object({
  suspects: z.array(z.string()).describe('The names of the suspects in the murder mystery.'),
  clues: z.array(z.string()).describe('The clues discovered by the player.'),
});

export type AnalyzeCluesInput = z.infer<typeof AnalyzeCluesInputSchema>;

const ClueAnalysisSchema = z.object({
    suspect: z.string().describe('The name of the suspect.'),
    clue: z.string().describe('The clue being analyzed.'),
    analysis: z.string().describe("A detective's analysis of how the clue relates to the suspect's guilt."),
});

const AnalyzeCluesOutputSchema = z.object({
    analyses: z.array(ClueAnalysisSchema).describe("An array of analyses for each clue against each suspect.")
});

export type AnalyzeCluesOutput = z.infer<typeof AnalyzeCluesOutputSchema>;

export async function analyzeClues(input: AnalyzeCluesInput): Promise<AnalyzeCluesOutput> {
  return analyzeCluesFlow(input);
}

const analyzeCluesPrompt = ai.definePrompt({
  name: 'analyzeCluesPrompt',
  input: {schema: AnalyzeCluesInputSchema},
  output: {schema: AnalyzeCluesOutputSchema},
  prompt: `You are an expert detective, skilled at analyzing clues and determining how strongly they support a suspect's guilt in a murder mystery.

You will be provided with a list of suspects and a list of clues discovered by the player.

For each suspect, analyze each clue and provide a brief explanation of how strongly that clue supports the suspect's guilt. Use language that conveys the strength of the evidence (e.g., "strongly supports", "weakly supports", "does not support").

Suspects:
{{#each suspects}}- {{{this}}}
{{/each}}

Clues:
{{#each clues}}- {{{this}}}
{{/each}}`,
});

const analyzeCluesFlow = ai.defineFlow(
  {
    name: 'analyzeCluesFlow',
    inputSchema: AnalyzeCluesInputSchema,
    outputSchema: AnalyzeCluesOutputSchema,
  },
  async input => {
    const {output} = await analyzeCluesPrompt(input);
    return output!;
  }
);

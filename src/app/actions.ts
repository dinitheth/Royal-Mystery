'use server';

import { analyzeClues } from '@/ai/flows/analyze-clues';
import type { AnalyzeCluesInput, AnalyzeCluesOutput } from '@/ai/flows/analyze-clues';
import { submitScore as submitScoreOnChain } from '@/services/monad';


export async function runClueAnalysis(input: AnalyzeCluesInput): Promise<AnalyzeCluesOutput> {
  try {
    const analysis = await analyzeClues(input);
    return analysis;
  } catch (error) {
    console.error('AI analysis failed:', error);
    throw new Error('Failed to get analysis from the detective assistant.');
  }
}

export async function submitScore(playerAddress: string, score: number) {
    return await submitScoreOnChain(playerAddress, score);
}

export type Suspect = {
  id: string;
  name: string;
  title: string;
  description: string;
  sceneId: string;
};

export type Clue = {
  id: string;
  title: string;
  description: string;
  sceneId: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  points: number;
};

export type GameScene = {
  id: string;
  type: 'intro' | 'suspect' | 'clue' | 'misdirection' | 'twist' | 'ai_assistant' | 'accusation' | 'epilogue' | 'quiz';
  backgroundId: string;
  data?: any;
};

export const SUSPECTS: Suspect[] = [
  {
    id: 'duke_alistair',
    name: 'Duke Alistair',
    title: 'The Ambitious Duke',
    description: "A man of great ambition and influence, the Duke is a powerful figure in the court. While he and the King often had political disagreements, he maintains his loyalty to the crown's stability.",
    sceneId: 'scene_suspect_1',
  },
  {
    id: 'lady_genevieve',
    name: 'Lady Genevieve',
    title: 'The Grieving Queen',
    description: 'The King\'s wife. Their marriage was a political arrangement, and rumors of a secret lover have been circulating in the court.',
    sceneId: 'scene_suspect_2',
  },
  {
    id: 'sir_reginald',
    name: 'Sir Reginald',
    title: 'The Loyal Knight',
    description: 'The King\'s most trusted knight and bodyguard. He feels immense guilt for failing to protect his King.',
    sceneId: 'scene_suspect_3',
  },
  {
    id: 'elara',
    name: 'Elara',
    title: 'The Royal Sorceress',
    description: 'An enigmatic figure who advised the King on all matters arcane. Her motives are as mysterious as her spells.',
    sceneId: 'scene_suspect_4',
  },
];

export const CLUES: Clue[] = [
  {
    id: 'poisoned_goblet',
    title: 'The Poisoned Goblet',
    description: 'A beautiful, ornate goblet, still containing the dregs of poisoned wine. It was a gift to the King.',
    sceneId: 'scene_clue_1',
  },
  {
    id: 'torn_letter',
    title: 'Torn Love Letter',
    description: 'A fragment of a passionate letter, torn in haste. It speaks of a forbidden love and a desire for freedom.',
    sceneId: 'scene_clue_2',
  },
  {
    id: 'cryptic_scroll',
    title: 'Cryptic Scroll',
    description: "A small, tightly-rolled scroll found near the King's chambers. It contains an arcane incantation in a language only Elara would know. Its purpose is unclear.",
    sceneId: 'scene_clue_3'
  }
];

export const QUIZZES: QuizQuestion[] = [
    {
        id: 'quiz_1',
        question: "What is the name of the kingdom where the murder of King Theron took place?",
        options: [
            { id: 'q1_opt1', text: 'Eldoria' },
            { id: 'q1_opt2', text: 'Alistair' },
            { id: 'q1_opt3', text: 'Reginald' },
            { id: 'q1_opt4', text: 'Genevieve' },
        ],
        correctOptionId: 'q1_opt1',
        points: 1000,
    },
    {
        id: 'quiz_2',
        question: "The torn love letter hints at a forbidden romance. Who do you suspect is involved?",
        options: [
            { id: 'q2_opt1', text: 'Duke Alistair and Elara' },
            { id: 'q2_opt2', text: 'Lady Genevieve and Sir Reginald' },
            { id: 'q2_opt3', text: 'Sir Reginald and Elara' },
            { id: 'q2_opt4', text: 'Duke Alistair and Lady Genevieve' },
        ],
        correctOptionId: 'q2_opt2',
        points: 1500,
    },
    {
        id: 'quiz_3',
        question: "Considering all the evidence, what is the most likely motive for the murder?",
        options: [
            { id: 'q3_opt1', text: 'A political move to gain more power.' },
            { id: 'q3_opt2', text: 'A crime of passion.' },
            { id: 'q3_opt3', text: 'Revenge for a past grievance.' },
            { id: 'q3_opt4', text: 'An arcane ritual gone wrong.' },
        ],
        correctOptionId: 'q3_opt1',
        points: 2000,
    }
]

export const GAME_STORY: GameScene[] = [
  { id: 'scene_intro', type: 'intro', backgroundId: 'scene-intro' },
  { id: 'scene_suspect_1', type: 'suspect', backgroundId: 'scene-suspect-1', data: { suspectId: 'duke_alistair' } },
  { id: 'scene_clue_1', type: 'clue', backgroundId: 'scene-clue-1', data: { clueId: 'poisoned_goblet' } },
  { id: 'scene_quiz_1', type: 'quiz', backgroundId: 'scene-quiz', data: { quizId: 'quiz_1'} },
  { id: 'scene_suspect_2', type: 'suspect', backgroundId: 'scene-suspect-2', data: { suspectId: 'lady_genevieve' } },
  { id: 'scene_misdirection', type: 'misdirection', backgroundId: 'scene-misdirection' },
  { id: 'scene_suspect_3', type: 'suspect', backgroundId: 'scene-suspect-3', data: { suspectId: 'sir_reginald' } },
  { id: 'scene_clue_2', type: 'clue', backgroundId: 'scene-clue-2', data: { clueId: 'torn_letter' } },
  { id: 'scene_quiz_2', type: 'quiz', backgroundId: 'scene-quiz', data: { quizId: 'quiz_2'} },
  { id: 'scene_suspect_4', type: 'suspect', backgroundId: 'scene-suspect-4', data: { suspectId: 'elara' } },
  { id: 'scene_clue_3', type: 'clue', backgroundId: 'scene-clue-3', data: { clueId: 'cryptic_scroll' } },
  { id: 'scene_twist', type: 'twist', backgroundId: 'scene-twist' },
  { id: 'scene_quiz_3', type: 'quiz', backgroundId: 'scene-quiz', data: { quizId: 'quiz_3'} },
  { id: 'scene_ai_assistant', type: 'ai_assistant', backgroundId: 'scene-accusation' },
  { id: 'scene_accusation', type: 'accusation', backgroundId: 'scene-accusation' },
  { id: 'scene_epilogue', type: 'epilogue', backgroundId: 'scene-epilogue' },
];

export const CORRECT_MURDERER_ID = 'duke_alistair';

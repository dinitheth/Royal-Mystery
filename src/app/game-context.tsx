'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback, useState } from 'react';
import { GAME_STORY, CLUES, SUSPECTS, GameScene, Clue, Suspect, QUIZZES, QuizQuestion } from '@/lib/game-data';
import { runClueAnalysis, submitScore as submitScoreAction } from './actions';
import type { AnalyzeCluesOutput } from '@/ai/flows/analyze-clues';
import { usePrivy, type CrossAppAccountWithMetadata } from '@privy-io/react-auth';
import { useToast } from '@/hooks/use-toast';


type GameState = {
  currentSceneId: string;
  discoveredClues: string[];
  analysis: AnalyzeCluesOutput | null;
  isLoadingAI: boolean;
  accusationResult: 'correct' | 'incorrect' | null;
  gameStarted: boolean;
  isGameOver: boolean;
  score: number;
};

type GameContextType = {
  gameState: GameState;
  currentScene: GameScene | undefined;
  goToScene: (sceneId: string) => void;
  addClue: (clueId: string) => void;
  getClueById: (clueId: string) => Clue | undefined;
  getSuspectById: (suspectId: string) => Suspect | undefined;
  getQuizById: (quizId: string) => QuizQuestion | undefined;
  startNextScene: () => void;
  resetGame: () => void;
  analyzeClues: () => Promise<void>;
  makeAccusation: (suspectId: string) => void;
  submitAnswer: (quizId: string, optionId: string) => boolean;
  startGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialState: GameState = {
  currentSceneId: 'scene_intro',
  discoveredClues: [],
  analysis: null,
  isLoadingAI: false,
  accusationResult: null,
  gameStarted: false,
  isGameOver: false,
  score: 0,
};

type Action =
  | { type: 'SET_STATE'; payload: GameState }
  | { type: 'START_GAME' }
  | { type: 'GO_TO_SCENE'; payload: string }
  | { type: 'ADD_CLUE'; payload: string }
  | { type: 'ADD_SCORE'; payload: number }
  | { type: 'SET_ANALYSIS'; payload: AnalyzeCluesOutput | null }
  | { type: 'SET_LOADING_AI'; payload: boolean }
  | { type: 'MAKE_ACCUSATION'; payload: 'correct' | 'incorrect' }
  | { type: 'GAME_OVER' }
  | { type: 'RESET' };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'START_GAME':
      return { ...initialState, gameStarted: true, currentSceneId: GAME_STORY[0].id };
    case 'GO_TO_SCENE':
      return { ...state, currentSceneId: action.payload };
    case 'ADD_CLUE':
      if (state.discoveredClues.includes(action.payload)) return state;
      return { ...state, discoveredClues: [...state.discoveredClues, action.payload] };
    case 'ADD_SCORE':
        return { ...state, score: state.score + action.payload };
    case 'SET_ANALYSIS':
      return { ...state, analysis: action.payload, isLoadingAI: false };
    case 'SET_LOADING_AI':
      return { ...state, isLoadingAI: action.payload };
    case 'MAKE_ACCUSATION':
      return { ...state, accusationResult: action.payload, isGameOver: true, currentSceneId: 'scene_epilogue' };
    case 'GAME_OVER':
      return { ...state, isGameOver: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const { ready, authenticated, user } = usePrivy();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (authenticated && user && ready) {
      const crossAppAccount = user.linkedAccounts.find(
        (account) =>
          account.type === 'cross_app' &&
          account.providerApp.id === 'cmd8euall0037le0my79qpz42'
      ) as CrossAppAccountWithMetadata | undefined;

      if (crossAppAccount && crossAppAccount.embeddedWallets && crossAppAccount.embeddedWallets.length > 0) {
        const address = crossAppAccount.embeddedWallets[0].address;
        setAccountAddress(address);
      }
    }
  }, [authenticated, user, ready]);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('royalMysteryGameState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Don't persist gameStarted state across refreshes if game is not over
        if (!parsedState.isGameOver) {
            delete parsedState.gameStarted;
        }
        dispatch({ type: 'SET_STATE', payload: { ...initialState, ...parsedState } });
      }
    } catch (error) {
      console.error("Failed to load game state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('royalMysteryGameState', JSON.stringify(gameState));
    } catch (error) {
      console.error("Failed to save game state to localStorage", error);
    }
  }, [gameState]);
  
  const startGame = () => dispatch({ type: 'START_GAME' });
  const goToScene = (sceneId: string) => dispatch({ type: 'GO_TO_SCENE', payload: sceneId });
  const addClue = (clueId: string) => dispatch({ type: 'ADD_CLUE', payload: clueId });

  const startNextScene = () => {
    const currentIndex = GAME_STORY.findIndex(s => s.id === gameState.currentSceneId);
    if (currentIndex < GAME_STORY.length - 1) {
      goToScene(GAME_STORY[currentIndex + 1].id);
    } else {
      dispatch({ type: 'GAME_OVER' });
    }
  };

  const resetGame = () => {
    dispatch({ type: 'RESET' });
    try {
        localStorage.removeItem('royalMysteryGameState');
    } catch (error) {
        console.error("Failed to remove game state from localStorage", error);
    }
  };

  const getClueById = (clueId: string) => CLUES.find(c => c.id === clueId);
  const getSuspectById = (suspectId: string) => SUSPECTS.find(s => s.id === suspectId);
  const getQuizById = (quizId: string) => QUIZZES.find(q => q.id === quizId);

  const analyzeClues = async () => {
    dispatch({ type: 'SET_LOADING_AI', payload: true });
    try {
      const clues = gameState.discoveredClues.map(id => getClueById(id)?.title).filter(Boolean) as string[];
      const suspects = SUSPECTS.map(s => s.name);
      const result = await runClueAnalysis({ clues, suspects });
      dispatch({ type: 'SET_ANALYSIS', payload: result });
    } catch (error) {
      console.error("Error analyzing clues:", error);
      dispatch({ type: 'SET_LOADING_AI', payload: false });
    }
  };

  const makeAccusation = (suspectId: string) => {
    const isCorrect = suspectId === 'duke_alistair'; // As defined in game-data
    dispatch({ type: 'MAKE_ACCUSATION', payload: isCorrect ? 'correct' : 'incorrect' });
  };
  
  const submitAnswer = (quizId: string, optionId: string) => {
    const quiz = getQuizById(quizId);
    if (!quiz) return false;

    const isCorrect = quiz.correctOptionId === optionId;
    if (isCorrect) {
      dispatch({ type: 'ADD_SCORE', payload: quiz.points });
      if (accountAddress) {
        submitScoreAction(accountAddress, quiz.points).then(result => {
          if (result.success) {
            console.log("Score submitted successfully:", result.hash);
            toast({
                title: "Score Submitted!",
                description: `Your score of ${quiz.points} has been recorded on-chain.`,
            });
          } else {
            console.error("Failed to submit score:", result.error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: "There was a problem submitting your score to the blockchain.",
            });
          }
        });
      }
    }
    return isCorrect;
  };

  const currentScene = GAME_STORY.find(s => s.id === gameState.currentSceneId);

  const value = {
    gameState,
    currentScene,
    goToScene,
    addClue,
    getClueById,
    getSuspectById,
    getQuizById,
    startNextScene,
    resetGame,
    analyzeClues,
    makeAccusation,
    submitAnswer,
    startGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

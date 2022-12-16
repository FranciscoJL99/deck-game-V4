import { createContext } from 'react';

export const DeckContext = createContext({
  deckState: {},
  addPlayerOne: () => undefined,
  addPlayerTwo: () => undefined,
  addDeck: () => undefined,
  endGame: () => undefined,
  setRemaining: () => undefined
});

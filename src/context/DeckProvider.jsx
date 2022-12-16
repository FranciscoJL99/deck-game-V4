import { useReducer } from 'react';
import { DeckContext } from './DeckContext';
import { deckReducer } from './deckReducer';

const INITIAL_STATE = {
	playerOne: '',
	playerTwo: '',
	deck: {
		success: false,
		deck_id: '',
		shuffled: false,
		remaining: 0,
	},
	endGame: false,
};

export const DeckProvider = ({ children }) => {
	const [deckState, dispatch] = useReducer(deckReducer, INITIAL_STATE);

	const addPlayerOne = (name) => {
		dispatch({ type: 'addPlayerOne', payload: name });
	};

	const addPlayerTwo = (name) => {
		dispatch({ type: 'addPlayerTwo', payload: name });
	};

	const addDeck = (deck) => {
		dispatch({ type: 'addDeck', payload: deck });
	};

	const setRemaining = (remaining) => {
		dispatch({ type: 'setRemaining', payload: remaining });
	};

	const endGame = (end) => {
		dispatch({ type: 'endGame', payload: end });
	};

	return (
		<DeckContext.Provider
			value={{ deckState, addPlayerOne, addPlayerTwo, addDeck, endGame, setRemaining }}
		>
			{children}
		</DeckContext.Provider>
	);
};

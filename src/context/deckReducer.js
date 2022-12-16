export const deckReducer = (state, action) => {
	switch (action.type) {
		case 'addPlayerOne':
			return {
				...state,
				playerOne: action.payload,
			};

		case 'addPlayerTwo':
			return {
				...state,
				playerTwo: action.payload,
			};

		case 'addDeck':
			return {
				...state,
				deck: action.payload,
			};

		case 'endGame':
			return {
				...state,
				endGame: action.payload,
			};

		case 'setRemaining':
			return {
				...state,
				deck: {
					...state.deck,
					remaining: action.payload
				},
			};

		default:
			return state;
	}
};

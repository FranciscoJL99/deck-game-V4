import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { ObtainedCards } from '../../components/ObtainedCards';
import { DeckContext } from '../../context/DeckContext';
import useDeckCards from '../../hooks/useDeckCards';
import { getInitialCards } from '../../services/deckService';

export const Game = () => {
	const {
		deckPlayerOne,
		deckPlayerTwo,
		setCards,
		setEndGame,
		setInitialCards,
		checkWinner
	} = useDeckCards();
	const { deckState } = useContext(DeckContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!deckPlayerOne.namePlayer || !deckPlayerTwo.namePlayer) {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		getInitialCards(deckState.deck.deck_id).then(({ cards }) => {
			setInitialCards(cards);
		});
	}, []);

	return (
		<>
			<Navbar
				setCardsRef={setCards}
				endGameRef={setEndGame}
				deckPlayerOneRef={deckPlayerOne}
				deckPlayerTwoRef={deckPlayerTwo}
			/>

			<ObtainedCards
				deckPlayerOneRef={deckPlayerOne}
				deckPlayerTwoRef={deckPlayerTwo}
				checkWinner={checkWinner}
			/>
		</>
	);
};

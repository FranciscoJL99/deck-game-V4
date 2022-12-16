import { useContext, useState } from 'react';
import { DeckContext } from '../context/DeckContext';

const useDeckCards = () => {
	const { deckState, endGame } = useContext(DeckContext);

	const INITIAL_STATE_PLAYER_ONE = {
		namePlayer: deckState.playerOne,
		cards: [],
		winner: false,
	};

	const INITIAL_STATE_PLAYER_TWO = {
		namePlayer: deckState.playerTwo,
		cards: [],
		winner: false,
	};

	const [deckPlayerOne, setDeckPlayerOne] = useState(
		INITIAL_STATE_PLAYER_ONE
	);

	const [deckPlayerTwo, setDeckPlayerTwo] = useState(
		INITIAL_STATE_PLAYER_TWO
	);

	const setInitialCards = (cards) => {
		setDeckPlayerOne({
			...deckPlayerOne,
			cards: cards.slice(0, 10),
		});

		setDeckPlayerTwo({
			...deckPlayerTwo,
			cards: cards.slice(10),
		});
	}
	// cuando recibe las 2 cartas nueva las anade a cada jugador,
	// espera 1 segundo y correo la funcion checkmano
	const setCards = (cards) => {
		setDeckPlayerOne((player) => ({
			...player,
			cards: [...player.cards, cards[0]],
		}));

		setDeckPlayerTwo((player) => ({
			...player,
			cards: [...player.cards, cards[1]],
		}));

		setTimeout(() => {
			setDeckPlayerOne(checkHand);
			setDeckPlayerTwo(checkHand);
		}, 1000)
	}
	//obtiene los codigos para operar, agrupa por numero y pinta
	const checkWinner = () => {
		const p1Codes = deckPlayerOne.cards.map(({ code }) => code)
		const p2Codes = deckPlayerOne.cards.map(({ code }) => code)

		const p1N = Object.entries(p1Codes.reduce((acc, code) => {
			const [key, val] = code.split('');
			const prev = acc[key]
			if (prev) {
				return { ...acc, [key]: [...prev, val] }
			}

			return { ...acc, [key]: [val] }

		}, {}));

		const p1NLengths = p1N.every(([, values]) => values.length === 3 || values.length === 4);
		//validacion de requisitos
		if (p1N.length === 3 && p1NLengths) {
			setDeckPlayerOne((player) => ({ ...player, winner: true }))
			return;
		}

		const p2N = Object.entries(p2Codes.reduce((acc, code) => {
			const [key, val] = code.split('');
			const prev = acc[key]
			if (prev) {
				return { ...acc, [key]: [...prev, val] }
			}

			return { ...acc, [key]: [val] }

		}, {}));

		const p2NLengths = p2N.every(([, values]) => values.length === 3 || values.length === 4);

		if (p2N.length === 3 && p2NLengths) {
			setDeckPlayerTwo((player) => ({ ...player, winner: true }))
			return;
		}

		const p1P = p1Codes.reduce((acc, code) => {
			const [key, val] = code.split('').reverse();
			const prev = acc[key]
			if (prev) {
				return {
					...acc,
					[key]: [...prev, val].sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
				}
			}

			return { ...acc, [key]: [val] }

		}, {});


		console.log(p1N)
		console.log(p1P)
	}

	const keyBy = (codes, isNum) => {
		return Object.entries(codes
			.reduce((acc, code) => {
				const [key, val] = isNum ? code.split('') : code.split('').reverse();
				const prev = acc[key]
				if (prev) {
					return { ...acc, [key]: [...prev, val] }
				}

				return { ...acc, [key]: [val] }

			}, {}))
			.sort((a, b) => a.values.length - b.values.length)
			.reduce((acc, [_key, _values]) => [
				...acc,
				..._values.map((_val) => isNum ? `${_key}${_val}` : `${_val}${_key}`)
			], [])
	}
	//valida si hay cartas, si hay mas debe revisar con cual quedarse
	const checkHand = ({ cards, ...player }) => {
		if (cards.length > 10) {
			//cntruye array con codifos
			const codes = cards.map((card) => card.code)
			//busca si hay carta repetida
			const repeated = codes
				.findIndex((code, i, _this) => (_this.findIndex((_code) => _code === code) !== i));
			//si hay repetida la descarta
			if (repeated !== -1) {
				return {
					...player,
					cards: cards.filter((_, i) => i !== repeated),
				}
			}
			//indexa, agrupa las cartas una por numero, la otrade 150 por pintas
			const sortedByNumber = keyBy(codes, true)
			const sortedByPint = keyBy(codes, false);
			//contruye un objeto, intera entre cada una.
			const [{ code: deletionCode }] = codes
				.reduce((acc, code) => {
					const numIndex = sortedByNumber.findIndex((_code) => _code === code);
					const pintIndex = sortedByPint.findIndex((_code) => _code === code);

					return [
						...acc,
						{
							code,
							points: 20 - numIndex + pintIndex * 2
						}
					]
				}, [])
				.sort((a, b) => a.points - b.points)

			const deletionIndex = codes.findIndex((code) => code === deletionCode);

			return {
				...player,
				cards: cards.filter((_, i) => i !== deletionIndex),
			}
		}

		return { ...player, cards }
	};

	const setEndGame = () => {
		if (deckState.deck.remaining) return;

		endGame(true);

		if (deckPlayerOne.winner || deckPlayerTwo.winner) return;

		setDeckPlayerOne((player) => ({ ...player, winner: false }))
		setDeckPlayerTwo((player) => ({ ...player, winner: false }))

	};

	return {
		deckPlayerOne,
		deckPlayerTwo,
		checkHand,
		setCards,
		setInitialCards,
		setEndGame,
		checkWinner
	};
};

export default useDeckCards;

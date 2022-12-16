/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import { DeckContext } from '../context/DeckContext';
import { useContext, useEffect, useMemo } from 'react';
import { getCards } from '../services/deckService';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	image: {
		marginRight: '10px',
		height: '3rem',
	},
	grow: {
		flexGrow: 1,
	},
}));

const FinalIcon = ({ success }) => (
	success ? (
		<VerifiedIcon sx={{ fontSize: 40 }} color="success" />
	) : (
		<CancelIcon sx={{ fontSize: 40 }} color="error" />
	)
);

export const Navbar = ({
	setCardsRef,
	endGameRef,
	deckPlayerOneRef,
	deckPlayerTwoRef,
}) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { deckState, setRemaining } = useContext(DeckContext);

	useEffect(() => {
		endGameRef();
	}, [deckPlayerTwoRef.winner, deckPlayerOneRef.winner, deckState.deck.remaining]);

	const isRemaining = useMemo(() => deckState.deck.remaining !== 0, [deckState.deck]);

	const getCardsClick = async () => {
		if (deckState.endGame || deckState.deck.remaining === 0) {
			navigate('/');
			return
		}

		const { cards, remaining } = await getCards(deckState.deck.deck_id);
		setRemaining(remaining)
		setCardsRef(cards);
	};

	return (
		<AppBar position="sticky">
			<Toolbar>
				<Typography variant="h5" component="div">
					{`Jugador 1: ${deckState.playerOne}`}
				</Typography>
				{deckState.endGame && <FinalIcon success={deckPlayerOneRef.winner} />}
				<div className={classes.grow}></div>
				<IconButton
					onClick={isRemaining ? getCardsClick : endGameRef}
					disabled={deckPlayerOneRef.cards.length + deckPlayerTwoRef.cards.length > 20}
				>
					<PlayCircleOutlineIcon sx={{ fontSize: 40 }} />
				</IconButton>
				<div className={classes.grow}></div>
				<Typography variant="h5" component="div">
					{`Jugador 2: ${deckState.playerTwo}`}
				</Typography>
				{deckState.endGame && <FinalIcon success={deckPlayerTwoRef.winner} />}
			</Toolbar>
		</AppBar>
	);
};

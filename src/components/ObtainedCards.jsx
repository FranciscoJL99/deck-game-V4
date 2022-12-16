/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Cards } from './Cards';
import { useEffect, useMemo } from 'react';

const CartGroup = ({ cards, border, enableDelete }) => (
	<Grid item xs={8} sx={{ borderTop: 'none', padding: '1rem 0' }}
		style={{ borderLeft: border ? '2px solid' : 'none', borderBottom: '2px solid' }}>
		<Typography align="center" variant="h6">
			Cartas obtenidas
		</Typography>
		<Grid container spacing={1} columns={8}>
			{cards.map((card, index) => (
				<Grid item xs={2} key={index}>
					<Cards
						cardRef={card.image}
						enableDelete={!!enableDelete}
					/>
				</Grid>
			))}
		</Grid>
	</Grid >
)

export const ObtainedCards = ({
	deckPlayerOneRef,
	deckPlayerTwoRef,
	checkWinner,
}) => {
	useEffect(() => {
		checkWinner()
	}, [deckPlayerOneRef.cards, deckPlayerTwoRef.cards])

	const enableDelete = useMemo(() => {
		return deckPlayerOneRef.cards.length + deckPlayerTwoRef.cards.length > 20
	}, [deckPlayerOneRef.cards, deckPlayerTwoRef.cards])

	return (
		<Grid container spacing={2} columns={16} style={{ padding: '1rem' }}>
			<CartGroup
				cards={deckPlayerOneRef.cards}
				enableDelete={enableDelete}
			/>
			<CartGroup
				cards={deckPlayerTwoRef.cards}
				enableDelete={enableDelete}
				border
			/>
		</Grid>
	)
};


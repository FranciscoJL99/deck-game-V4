import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

// eslint-disable-next-line react/prop-types
export const Cards = ({ cardRef, enableDelete, onClick = () => undefined }) => {
	return (
		<>
			<Card
				sx={{ maxWidth: 200, maxHeight: 400 }}
				style={{
					border: 'none',
					boxShadow: 'none',
					cursor: enableDelete ? 'not-allowed' : 'default'
				}}
			>
				<CardMedia component="img" image={cardRef} alt="card" onClick={() => {
					if (!enableDelete) { return; }
					onClick()
				}} />
			</Card>
		</>
	);
};

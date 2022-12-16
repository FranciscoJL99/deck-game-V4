import { Routes, Route } from 'react-router-dom';

import { DeckProvider } from "./context/DeckProvider";
import { Game } from './pages/Game/Game';
import { Home } from './pages/Home/Home';


export const App = () => (
	<DeckProvider>
		<section>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/game" element={<Game />}></Route>
				<Route path="/**" element={<Home />}></Route>
			</Routes>
		</section>
	</DeckProvider>
);

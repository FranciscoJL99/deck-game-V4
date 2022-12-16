import axios from 'axios';

export const instanceAxios = axios.create({
	baseURL: 'https://deckofcardsapi.com/api/deck',
});

import axios from 'axios';

export const logintest = (login) => axios.post('http://localhost:3000', login);

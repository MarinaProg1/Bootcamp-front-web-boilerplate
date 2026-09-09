import axios from 'axios';

const clientesAxios = axios.create({

    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',

    headers: {
        'Content-Type': 'application/json'
    }
});

export default clientesAxios;
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080/laundry/v1',
    headers: { 'Content-Type': 'application/json' },
});

export const apiWithCredentials = axios.create({
    baseURL: 'http://localhost:8080/laundry/v1',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

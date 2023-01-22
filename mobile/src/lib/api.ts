import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.0.191:3333', // replace 'localhost' with your IP address to use app on android
});

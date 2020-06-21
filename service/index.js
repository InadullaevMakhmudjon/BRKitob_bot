import axios from 'axios';

export const execute = (promise) => new Promise((resolve, reject) => {
  promise.then((res) => resolve(res.data)).catch(reject);
});

export default axios.create({
  baseURL: process.env.BOT_SERVER_URL || 'localhost:3010',
});

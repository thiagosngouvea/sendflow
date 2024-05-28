import axios from "axios";


export const URL_API = 'http://localhost:3002';

const api = () => {
  const instance = axios.create({
    baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
  });

  return instance;
};

export default api();
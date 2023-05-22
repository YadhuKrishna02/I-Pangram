import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:5000/api/auth/',
});

export default myAxios;

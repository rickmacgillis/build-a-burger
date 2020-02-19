import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-a-burger-e4058.firebaseio.com/',
});

export default instance;

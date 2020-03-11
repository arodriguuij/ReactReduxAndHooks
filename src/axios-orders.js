import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburgerbuilderreduxhooks.firebaseio.com/'
})

export default instance;
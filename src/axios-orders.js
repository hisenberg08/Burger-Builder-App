import axios from 'axios';

const instance = axios.create ({

	baseURL: 'https://burger-builder-5784d.firebaseio.com/'

});

export default instance;

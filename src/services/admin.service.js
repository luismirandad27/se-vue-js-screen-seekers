import axios from 'axios';
const API_URL = 'http://localhost:8080/api/';

class Admin{
    async getMovies(){
        try {
            const response = await axios.get(API_URL + "movies");
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    
}

export default new Admin();
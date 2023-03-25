/* eslint-disable */
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class MovieService{
    async getRandomMovies() {
        try {
            const response = await axios.get(API_URL + "movies/random", {params: {title: ""}});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllMovies() {
        try {
            const response = await axios.get(API_URL + "movies", {params: {title: ""}});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}

export default new MovieService();
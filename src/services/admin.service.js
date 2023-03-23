import axios from 'axios';
const API_URL = 'http://localhost:8080/api/';
import authHeader from '../services/auth-header.js';

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

    async getMovieById(id) {
        try {
          const response = await axios.get(API_URL + `movies/${id}`, {headers: authHeader() });
        //   const response = await axios.get(API_URL + "movies/", id);
          
          
          return response.data;
        } catch (error) {
          console.error(error);
          
          return "ERROR IS "+ error.message;
        //   throw error;
        }
      }

    
}

export default new Admin();
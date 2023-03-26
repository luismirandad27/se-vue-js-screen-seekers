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

      saveMovie(movieModel){
        try{
          const response =  axios.post(API_URL+"movies", movieModel, {headers: authHeader() })
          console.log("NO ERRORS!");
          return response;
          
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      updateMovie(id, movieModel){
        try{
          // const response =  axios.put(API_URL+`movies/${id}`, movieModel, id, {headers: authHeader() })
          const response =  axios.put(`${API_URL}movies/${id}`, movieModel, {headers: authHeader() })
          console.log("NO ERRORS!");
          return response;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      deleteaMovie(id){
        try{
          const response =  axios.delete(API_URL + `movies/${id}`, {headers: authHeader() })
          console.log("NO ERRORS!");
          return response;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

    
}

export default new Admin();
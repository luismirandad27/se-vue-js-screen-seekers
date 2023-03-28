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

      deleteAllMovies(){
        try{
          axios.delete(API_URL+'movies', {headers: authHeader() });
          console.log("ALL movies deleted");
        }catch(error){
          console.log("ERROR from delete function");
          return "ERROR FROM DEL FUNCTION" + error;
        }
      }

      saveCrew(crew){
        try{
          const response =  axios.post(API_URL+"movies/crew-members", crew, {headers: authHeader() })
          console.log("NO ERRORS!");
          return response.data;
          
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      async getCrews(){
        try{
          const response = await axios.get(API_URL+"movies/crew-members", {headers: authHeader() })
          console.log("NO ERRORS!");
          return response.data;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      async getCrewById(id){
        try{
          const response = await axios.get(API_URL+`movies/crew-members/${id}`, {headers: authHeader() })
          console.log("NO ERRORS!");
          return response.data;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      UpdateCrew(id, crewModel){
        try{
          // const response =  axios.put(API_URL+`movies/${id}`, movieModel, id, {headers: authHeader() })
          const response =  axios.put(`${API_URL}movies/crew-members/${id}`, crewModel, {headers: authHeader() })
          console.log("NO ERRORS!");
          return response;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }
      deleteCrew(id){
        try{
          const response =  axios.delete(API_URL + `movies/crew-members/${id}`, {headers: authHeader() })
          console.log("NO ERRORS!");
          return response;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      deleteAllCrew(){
        try{
          axios.delete(API_URL+'movies/crew-members', {headers: authHeader() });
          console.log("ALL movies deleted");
        }catch(error){
          console.log("ERROR from delete function");
          return "ERROR FROM DEL FUNCTION" + error;
        }
      }

      addCrewMemberToMovie(crewId, ProdModel, movieId){
        try{
          const response =  axios.post(API_URL + `movies/${movieId}/add-crew-member/${crewId}`, ProdModel, {headers: authHeader() })
          console.log("ALL good from adding production crew");
          return response;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      showCrewForThisMovie(id){
        try{
          const response =  axios.get(API_URL + `movies/${id}/crew-members` ,{headers: authHeader() });
          console.log("ALL good from getting production crew");
          console.log(response);
          return response;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

      removeCrew(crewId, movieId){
        try{
          const response =  axios.delete(API_URL + `movies/${movieId}/crew-member/${crewId}`, {headers: authHeader() })
          console.log("ALL good from removing production crew");
          return response;
        }catch(error){
          console.log("THERE IS AN ERROR!!!");
          return "ERROR IS "+ error.message;
        }
      }

    
}

export default new Admin();
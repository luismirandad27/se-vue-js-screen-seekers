import axios from 'axios';
const API_URL = 'http://localhost:8080/api/';
import authHeader from '../services/auth-header.js';

class Admin {
  async getMovies(page, size) {
    try {
      const response = await axios.get(API_URL + "movies", {
        params: {
          page: page,
          size: size
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMovieById(id) {
    try {
      const response = await axios.get(API_URL + `movies/${id}`, {
        headers: authHeader()
      });
      //   const response = await axios.get(API_URL + "movies/", id);


      return response.data;
    } catch (error) {
      console.error(error);

      return "ERROR IS " + error.message;
      //   throw error;
    }
  }

  async saveMovie(movieModel) {
    try {
      const response = await axios.post(API_URL + "movies", movieModel, {
        headers: authHeader()
      })
      return response;

    } catch (error) {
      return "ERROR IS " + error.message;
    }
  }

  async updateMovie(id, movieModel) {
    try {
      // const response =  axios.put(API_URL+`movies/${id}`, movieModel, id, {headers: authHeader() })
      const response = await axios.put(`${API_URL}movies/${id}`, movieModel, {
        headers: authHeader()
      })

      return response;
    } catch (error) {

      return "ERROR IS " + error.message;
    }
  }

  async deleteaMovie(id) {
    try {
      const response = await axios.delete(API_URL + `movies/${id}`, {
        headers: authHeader()
      })
      console.log(response);
      return response;
    } catch (error) {
      return "ERROR IS " + error.message;
    }
  }

  async deleteAllMovies() {
    try {
      await axios.delete(API_URL + 'movies', {
        headers: authHeader()
      });
      console.log("ALL movies deleted");
    } catch (error) {
      console.log("ERROR from delete function");
      return "ERROR FROM DEL FUNCTION" + error;
    }
  }

  async saveCrew(crew) {
    try {
      const response = await axios.post(API_URL + "movies/crew-members", crew, {
        headers: authHeader()
      })
      return response.data;

    } catch (error) {
      return "ERROR IS " + error.message;
    }
  }

  async getCrews(page,size) {
    try {
      const response = await axios.get(API_URL + "movies/crew-members", {
        headers: authHeader(),
        params:{
          page:page,
          size:size
        }
      })
      
      return response.data;
    } catch (error) {
      console.log("THERE IS AN ERROR!!!");
      return "ERROR IS " + error.message;
    }
  }

  async getCrewById(id) {
    try {
      const response = await axios.get(API_URL + `movies/crew-members/${id}`, {
        headers: authHeader()
      })
      console.log("NO ERRORS!");
      return response.data;
    } catch (error) {
      console.log("THERE IS AN ERROR!!!");
      return "ERROR IS " + error.message;
    }
  }

  async UpdateCrew(id, crewModel) {
    try {
      // const response =  axios.put(API_URL+`movies/${id}`, movieModel, id, {headers: authHeader() })
      const response = await axios.put(`${API_URL}movies/crew-members/${id}`, crewModel, {
        headers: authHeader()
      })
      console.log("NO ERRORS!");
      return response;
    } catch (error) {
      console.log("THERE IS AN ERROR!!!");
      return "ERROR IS " + error.message;
    }
  }
  async deleteCrew(id) {
    try {
      const response = await axios.delete(API_URL + `movies/crew-members/${id}`, {
        headers: authHeader()
      })
      return response;
    } catch (error) {
      console.log(error);
      return "ERROR IS " + error.message;
    }
  }

  async deleteAllCrew() {
    try {
      await axios.delete(API_URL + 'movies/crew-members', {
        headers: authHeader()
      });
      console.log("ALL movies deleted");
    } catch (error) {
      console.log("ERROR from delete function");
      return "ERROR FROM DEL FUNCTION" + error;
    }
  }

  async addCrewMemberToMovie(crewId, ProdModel, movieId) {
    try {
      const response = await axios.post(API_URL + `movies/${movieId}/add-crew-member/${crewId}`, ProdModel, {
        headers: authHeader()
      })
      console.log("ALL good from adding production crew");
      return response;
    } catch (error) {
      console.log("THERE IS AN ERROR!!!");
      return "ERROR IS " + error.message;
    }
  }

  async showCrewForThisMovie(id) {
    try {
      const response = await axios.get(API_URL + `movies/${id}/crew-members`, {
        headers: authHeader()
      });
      console.log("ALL good from getting production crew");
      console.log(response);
      return response;
    } catch (error) {
      console.log("THERE IS AN ERROR!!!");
      return "ERROR IS " + error.message;
    }
  }

  async removeCrew(crewId, movieId) {
    try {
      
      const response = await axios.delete(API_URL + `movies/${movieId}/remove-crew-member/${crewId}`, {
        headers: authHeader()
      })
      console.log("ALL good from removing production crew");
      return response;
    } catch (error) {
      console.log("THERE IS AN ERROR!!!");
      return "ERROR IS " + error.message;
    }
  }

  async uploadImage(movieId, filePoster, fileTrailer) {
    try {

      const formData = new FormData();

      //append the images
      if (filePoster) {
        formData.append("poster-image", filePoster);
      }

      if (fileTrailer) {
        formData.append("trailer-image", fileTrailer);
      }

      const response = await axios.put(API_URL + `movies/${movieId}/upload-images`, formData, {
        headers: authHeader()
      });

      return response;

    } catch (error) {
      console.log("Error in upload image function")
      return "ERROR in upload image functin" + error.message;
    }
  }


}

export default new Admin();
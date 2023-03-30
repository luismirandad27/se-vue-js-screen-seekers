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

    async getMoviesByTitle(title) {
        try {
            const response = await axios.get(API_URL + "movies", {params: {title: title}});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMoviesByGenre(genre) {
        try {
            const response = await axios.get(API_URL + "movies", {params: {genre: genre}});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMoviesByYear(year) {
        try {
            const response = await axios.get(API_URL + "movies", {params: {year: year}});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getMovieById(movieId){
        try {
            const response = await axios.get(API_URL + "movies/" + movieId, {params: {title: ""}});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getCrewMemberByMovie(movieId){
        try {
            const response = await axios.get(API_URL + `movies/${movieId}/crew-members`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}

export default new MovieService();
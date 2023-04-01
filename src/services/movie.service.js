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

    async getMoviesByTitle(title, page, size) {
        try {
            const response = await axios.get(API_URL + "movies", {params: 
                {title: title,
                page: page,
            size: size}});
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
    async getInTheatersMovies(page,size){
        try {
            const response = await axios.get(API_URL + `movies?isInTheaters=true`,
                {params:{
                    page: page,
                    size: size
                }});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getInStreamingMovies(page,size){
        try {
            const response = await axios.get(API_URL + `movies?isInStreaming=true`,
                {params:{
                    page: page,
                    size: size
                }});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getComingSoonMovies(page,size){
        try {
            const response = await axios.get(API_URL + `movies?isComingSoon=true`,
                {params:{
                    page: page,
                    size: size
                }});
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}

export default new MovieService();
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';
class WatchlistService {

    async createUserWatchlist(name, userId){
        try{
            const response = await axios.post(API_URL + `users/${userId}/watchlists`, {
                name: name
            }, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });

            return response.data;
            
        }catch(error){
            console.error(error);
            throw new Error('Failed to create a user watchlist');
        }
    }

    async getAllWatchlists(){
        try{
            const response = await axios.get(API_URL + `users/watchlists`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });

            return response.data;
            
        }catch(error){
            console.error(error);
            throw new Error('Failed to retrieve all watchlists');
        }
    }

    async getWatchlistByWatchlist(watchlistId){
        try{
            const response = await axios.get(API_URL + `users/watchlists/${watchlistId}`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });

            return response.data;
            
        }catch(error){
            console.error(error);
            throw new Error('Failed to retrieve the watchlist');
        }
    }


    async getWatchlistByUser(userId){
        try{
            const response = await axios.get(API_URL + `users/${userId}/watchlists`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });
            
            return response.data;

        }catch(error){
            console.error(error);
            throw new Error('Failed to retrieve the user watchlist');
        }
    }


    async updateUserWatchlist(name, watchlistId){
        try{

            const response = axios.put(API_URL + `users/watchlists/${watchlistId}`, {
                name:name
            }, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });

            return response.data;
            
        }catch(error){
            console.error(error);
            throw new Error('Failed to update user watchlist information');
        }
    }

    async deleteWatchlistByWatchlist(watchlistId){
        try{
            const response = await axios.delete(API_URL+`users/watchlists/${watchlistId}`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });
            return response.data;

        } catch(error){
            console.error(error);
            throw error;
        }
    }


    async deleteWatchlistByUser(userId){
        try{
            const response = await axios.delete(API_URL+`users/${userId}/watchlists`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });
            return response.data;

        } catch(error){
            console.error(error);
            throw error;
        }
    }


    async deleteAllWatchlists(){
        try{
            const response = await axios.delete(API_URL+`users/watchlists/`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });
            return response.data;

        } catch(error){
            console.error(error);
            throw error;
        }
    }


    async createWatchlistItem(watchlistId, movieId){
        try{
            const response = await axios.post(API_URL+`users/watchlists/${watchlistId}/add-movie/${movieId}`,{}, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });
            console.log(response);
            return response.data;

        } catch(error){
            console.error(error);
            throw new Error('Failed to add movie to the watchlist');
        }
    }

    async deleteWatchlistItem(watchlistId, movieId){
        try{
            const response = await axios.delete(API_URL+`users/watchlists/${watchlistId}/remove-movie/${movieId}`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });
            return response.data;

        } catch(error){
            console.error(error);
            throw error;
        }
    }

    }

    export default new WatchlistService();

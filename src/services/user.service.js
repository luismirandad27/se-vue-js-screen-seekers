import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';
/* eslint-disable */
class UserService {
    
    async getUserProfile(userId){
        return await axios.get(API_URL+`users/${userId}`, {headers: authHeader()})
    }
    
    async updateUserProfileImage(userId, file){
        try{
            //initialize a formData section for the API call
            const formData = new FormData();
            //append the image
            formData.append('file', file);

            const response = await axios.put(API_URL+`users/${userId}/upload-profile-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': authHeader().Authorization
                }
            });

            return response.data;

        } catch(error){
            console.error(error);
            throw new Error('Failed to update user profile image');
        }
    }

    async updateUserProfile(userId, userObj){
        try{

            const response = await axios.put(API_URL + `users/${userId}`, userObj, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                }
            });

            return response.data;
            
        }catch(error){
            console.error(error);
            throw new Error('Failed to update user profile information');
        }
    }

    async changeUserPassword(userId, oldPassword, newPassword){
        try{

            const response = await axios.put(API_URL + `users/${userId}/change-password`, 
                                {
                                    "oldPassword":oldPassword,
                                    "newPassword":newPassword
                                }, 
                                {
                                    headers:{
                                        'Content-Type': 'application/json',
                                        'Authorization': authHeader().Authorization
                                    }
                                }
            );

            return response.data;
            
        }catch(error){
            console.error(error);
            throw new Error('Failed to update user password');
        }
    }
    async getRecommendationsByUser(userId, page, size){
        try {

            const response = await axios.get(API_URL + `users/${userId}/recommend`, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': authHeader().Authorization
                },
                params:{
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
    async getRatingByMovie(movieId){
        try {
            const response = await axios.get(API_URL + `users/ratings/${movieId}`, 
                    {
                        headers:{
                        'Content-Type': 'application/json',
                        'Authorization': authHeader().Authorization
                        }
                    });

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async disableUser(userId){
        try{
            console.log(authHeader().Authorization);
            const response = await axios.put(API_URL + `users/${userId}/disable`,
                            null,
                            {
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

export default new UserService();
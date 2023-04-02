import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class RatingService {

    async saveRating(){
        try{
            const response =  axios.post(API_URL+"users/",{params: {userId: ""}},"/ratings/",{params: {movieId: ""}})
            console.log("NO ERRORS!");
            return response;
        }catch(error){
            console.log("THERE IS AN ERROR!!!");
            return "ERROR IS "+ error.message;
        }
    }
    
}

export default new RatingService();
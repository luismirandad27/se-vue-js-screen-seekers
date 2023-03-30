<template>
    <br><br><br><br><br><br>
    <div>
        <ul>
            <h2>Display a movie, overall rating and comments here </h2>
            <li v-for="movie in movies" :key="movie.id">
                {{ movie }}
            </li>
        </ul>

        <h1>Add a Rating and Comment</h1>
        <form @submit.prevent="saveRating">
            <label for="userId">UserId:</label>
            <textarea v-model="userId" id="userId" name="userId" rows="4" cols="50" required></textarea>
            <br><br>
            <label for="movieId">movieId:</label>
            <textarea v-model="movieId" id="movieId" name="movieId" rows="4" cols="50" required></textarea>
            <br><br>
            <label for="rating">Rating:</label>
            <input v-model="rating" type="number" id="rating" name="rating" min="1" max="10" required>
            <br><br>
            <label for="comment">Comment:</label>
            <textarea v-model="comment" id="comment" name="comment" rows="4" cols="50" required></textarea>
            <br><br>
            
            <button type="submit">Submit</button>
            <br><br>
            <!-- <div>
                <li> {{ result }}
                </li>
            </div> -->
        </form>
    </div>
</template>
  
<script>
//   import MovieService from '@/services/movie.service.js';
//   import Rating from '@/models/rating';
// import Rating from '@/models/rating';
import UserService from '@/services/user.service.js';

export default {
    data() {
        return {
            movies: [],
            userId: "",
            movieId: "",
            rating: "",
            comment: "",
        }
    },

    methods: {
        saveRating() {
            // UserService.getRatingByMovie
            
            // const ratingInfo = new Rating(
            //     this.rating, this.comment
            // )
            console.log(this.userId, this.movieId, this.rating, this.comment);
            UserService.saveRating(this.userId, this.movieId, this.rating, this.comment);
            // alert('Rating submitted!');
            // You can also call the submitRating function in UserService here and pass the ratingInfo object as parameter
            // let returnVal = UserService.saveRating(this.ratingInfo);
            // this.result = returnVal;
            // console.log(returnVal);

            this.rating = "";
            this.comment = "";
        },
    },
};
</script>
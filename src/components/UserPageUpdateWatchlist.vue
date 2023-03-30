<template>
  <div class="slider movie-items">
  <div class="container">
    <h1>Edit Watchlist</h1>
    <form>
    <table>

      <tr>
        <td>Watchlist name</td>
        <td><input type="text" id="title" v-model="watchlist.name"></td>
      </tr>


    </table>
  </form>
  <div>
     <button type="submit" @click="updateUserWatchlist">SAVE NEW WATCHLIST</button>
  </div>
  </div>
</div>
</template>


<script>
/* eslint-disable */
import WatchlistService from "@/services/watchlist.service.js";
import Movie from "@/models/movie.js";


export default{
    name: "ListWatchlistPage",
    data() {
        return {
          watchlist: {
              name: "",
              watchlists: [],
            }
        };
    },
    computed:{
        id(){
            return this.$route.params.id
        }
    },
    methods:{
        // Update method
        updateUserWatchlist(){

        WatchlistService.updateUserWatchlist(this.watchlist, this.id)
        .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

        },

        saveAndUpdate(){
          WatchlistService.updateUserWatchlist(this.currentTutorial.id, this.watchlist)
          .then(response => {
            console.log(response.data);
            this.message = 'The tutorial was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
        },
        // updateUserWatchlist(){
        //     try{
        //         this.userId = this.$store.state.auth.user.id;

        //         WatchlistService.updateUserWatchlist(this.watchlist, userId).then(
        //             (response) => {
        //                 this.watchlist = response.data;
        //                 console.log(response.data);
        //                 this.message = 'The watchlist was updated successfully!';
        //             }
        //         )
        //     } catch(error){
        //         console.log(error)
        //     }
        // },

        //Add movie to watchlist
        addWatchlistItem(){
            try{
                this.userId = this.$store.state.auth.user.id;
                this.movieId = this.$store.state.auth.movie.id;

                WatchlistService.updateUserWatchlist(userId, movieId).then(
                    (response) => {
                        this.watchlist = response.data;
                        console.log(response.data);
                        this.message = 'The movie was successfully added to the watchlist!';
                    }
                )
            } catch(error){
                console.log(error)
            }
        },

        //Delete a movie item
        deleteMovieItem(){
            try{
                this.userId = this.$store.state.auth.user.id;
                this.movie = this.$store.state.auth.movie.id;

                WatchlistService.deleteWatchlistItem(userId, movieId).then(
                    (response) => {
                        this.watchlist = response.data;
                        console.log(response.data);
                        this.message = 'The movie was successfully deleted from the watchlist!';
                    }
                )
            } catch(error){
                console.log(error)
            }
        }

    }
};
</script>
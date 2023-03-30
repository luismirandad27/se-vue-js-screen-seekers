<template>
  <div class="slider movie-items">
  <div class="container">
    <h1>Create a watchlist</h1>
    <form>
    <table>

      <tr>
        <td>Movie name</td>
        <td><input type="text" id="title" v-model="watchlist.name"></td>
      </tr>


    </table>
  </form>
  <div>
     <button type="submit" @click="saveWatchlist">SAVE WATCHLIST</button>
  </div>
  </div>
</div>
</template>


<script>
/* eslint-disable */
import WatchlistService from "@/services/watchlist.service.js";
import Watchlist from "@/models/watchlist.js";

export default{
    name: "CreateWatchlistPage",
    data() {
        return {
            watchlist: {
              id: null,
              name: "",
              watchlists: [],
            }
        };
    },
    methods:{
        //create new watchlist
        saveWatchlist(){
          // var data = {
          //   name: this.watchlist.name,
          //   watchlists: this.watchlist.watchlists
          // }

          WatchlistService.createUserWatchlist(this.watchlist, this.watchlist.id)
          .then(response => {
            //this.watchlist.userId = response.data.userId;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
        }
    }

  };
</script>
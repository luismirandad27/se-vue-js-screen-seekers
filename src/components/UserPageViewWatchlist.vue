<template>
    <div class="slider movie-items">
    <div class="container">
      <h1>View Watchlist</h1>
    <div>
       <button type="submit" @click="getWatchlistByUser">GET WATCHLIST</button>
    </div>
    </div>
  </div>
  </template>


<script>
import WatchlistService from "@/services/watchlist.service.js";


export default{
    name: "ListWatchlistPage",
    data() {
        return {
            watchlists: [],
            currentWatchlist: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods:{
        //get all watchlist
        // getWatchlists(){
        //     try{
        //     this.userId = this.$store.state.auth.user.id;
        //     WatchlistService.getAllWatchlists(this.userId).then(
        //         (response) => {
        //             this.watchlist = response.data;
        //             console.log(response.data);
        //         }
        //     )
        //     } catch(error){
        //         console.log(error)
        //     }
        // },

        //get watchlist by user id
        getWatchlistByUser(){
            try{
            this.userId = this.$store.state.auth.user.id;
            WatchlistService.getWatchlistByUser(this.userId).then(
                (response) => {
                    //this.watchlist = response.data;
                    console.log(response.data);
                }
            )
            } catch(error){
                console.log(error)
            }
        },

        setActiveWatchlist(watchlist, index) {
        this.currentWatchlist = watchlist;
        this.currentIndex = index;
      },

    }
};
</script>
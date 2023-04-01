<template>
  <transition name="modal">
    <modal
      :title="modalTitle"
      :status="modalStatus"
      v-if="isModalOpen"
      @close="closeModal"
    >
      <p>{{ modalMessage }}</p>
      <div v-if="modalType == 'confirmation'" class="modal-buttons">
        <button v-if="modalTypeAction == 'deleteWatchlist'" class="modal-confirm" @click="deleteWatchlist()">Confirm</button>
        <button class="modal-cancel" @click="closeModal">Cancel</button>
      </div>
    </modal>
  </transition>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>My Watchlist</h1>
            <ul class="breadcumb">
             <!--- <li class="active"><a href="#">User</a></li> -->
             <li class="active">
             <router-link to='/userProfilePage'>User</router-link>
            </li>
              <li><span class="ion-ios-arrow-right"></span> Watchlist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0; padding-bottom: 15px">
    <div class="container">
      <div class="row form-style-1 user-pro" style="margin-bottom: 0">
        <form @submit.prevent="updateWatchlistName()">
          <h3>Watchlist Information</h3>
          <div class="col-md-1 form-it">
            <label>Watchlist Name</label>
          </div>
          <div class="col-md-4 form-it">
            <input
              type="text"
              placeholder="Type the watchlist's name"
              v-model="watchlistNameInput"
              :required="true"
            />
          </div>
          <div class="col-md-2 form-it">
            <input class="submit" type="submit" value="Save" />
          </div>
        </form>
        <form @submit.prevent="deleteWatchlistConfirmation()">
          <div class="col-md-2 form-it">
            <input class="submit" type="submit" value="Delete" />
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0; padding-bottom: 15px">
    <div class="container">
      <div class="row form-style-1 user-pro" style="margin-bottom: 0">
        <h3>My Movies Selection</h3>
        <div class="row ipad-width">
          <div class="flex-wrap-movielist" style="margin-top: 15px">
            <div
              v-for="(watchlistDetail, index) in watchlistDetails"
              :key="index"
              class="movie-item-style-2 movie-item-style-1"
            >
              <img
                v-if="watchlistDetail.posterImage != null"
                :src="$MOVIE_PHOTOS_URL + '/' + watchlistDetail.posterImage"
                alt=""
              />
              <img
                v-if="watchlistDetail.posterImage == null"
                src="../../public/images/poster-template.jpeg"
                alt=""
              />
              <div class="hvr-inner">

                <a @click="deleteMovieFromWatchlist(watchlistDetail, watchlistDetail.movieId)">
                  Delete Movie <i class="ion-android-arrow-dropright"></i>
                </a>

              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">{{ watchlistDetail.title }}</a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0">
    <div class="movies-search">
      <div class="container">
        <div class="row user-pro" style="margin-bottom: 0">
          <h3>Add movie to watchlist</h3>
          <div class="top-search">
            <input
              type="text"
              placeholder="Search for a movie, TV Show that you are looking for"
              v-model="movieTitleInput"
              @input="searchMovieByTitle()"
            />
          </div>
        </div>
        <div class="row ipad-width">
          <div class="flex-wrap-movielist" style="margin-top: 15px">
            <div
              v-for="(movie, index) in moviesSearch"
              :key="index"
              class="movie-item-style-2 movie-item-style-1"
            >
              <img
                v-if="movie.posterImage != null"
                :src="$MOVIE_PHOTOS_URL + '/' + movie.posterImage"
                alt=""
              />
              <img
                v-if="movie.posterImage == null"
                src="../../public/images/poster-template.jpeg"
                alt=""
              />
              <div class="hvr-inner">
                <a @click="addMovieToWatchlist(movie.id)">
                  Add Movie <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <router-link :to="'/movies/' + movie.id">{{
                    movie.title
                  }}</router-link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WatchlistService from "@/services/watchlist.service.js";
import Watchlist from "@/models/watchlist";
import WatchlistDetail from "@/models/watchlistdetail";

import MovieService from "@/services/movie.service.js";
import Movie from "@/models/movie";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "UserWatchlistDetail",
  components: {
    Modal,
  },
  data() {
    return {
      watchlist: "",
      watchlistDetails: [],
      moviesSearch: [],
      movieTitleInput: "",
      watchlistNameInput: "",
      userId: "",
      watchlistId: "",
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType:"",
      modalTypeAction:"",
    };
  },
  methods: {
    async getWatchlistDetail() {
      const response = await WatchlistService.getWatchlistByWatchlist(
        this.watchlistId
      );

      this.watchlist = new Watchlist(
        response.id,
        response.name,
        response.watchlistDetails.length
      );
      this.watchlistNameInput = this.watchlist.name;

      if (this.watchlist.totalMovies > 0) {
        //let's get the movie list
        this.watchlistDetails = response.watchlistDetails.map(
          (watchlistDetail) => {
            return new WatchlistDetail(
              watchlistDetail.id,
              watchlistDetail.movie.movieId,
              watchlistDetail.movie.title,
              watchlistDetail.movie.posterImage,
            );
          }
        );
      }
    },
    async searchMovieByTitle() {
      if (this.movieTitleInput != "") {
        const response = await MovieService.getMoviesByTitle(
          this.movieTitleInput,
          -1,
          null
        );

        if (response.content != null) {
          this.moviesSearch = response.content.map((movieData) => {
            return new Movie(
              movieData.id,
              movieData.title,
              movieData.genre.split(","),
              movieData.releaseDate,
              movieData.length,
              movieData.synopsis,
              movieData.classificationRating,
              movieData.movieTrailerLink,
              movieData.isInTheaters,
              movieData.isInStreaming,
              movieData.isComingSoon,
              movieData.whereToWatch,
              movieData.posterImage,
              movieData.trailerImage
            );
          });
        } else {
          this.moviesSearch = [];
        }
      } else {
        this.moviesSearch = [];
      }
    },
    addMovieToWatchlist(movieId) {
      //validate if we already have that movie
      var isIncluded = false;

      for (let i = 0; i < this.watchlistDetails.length; i++) {
        if (this.watchlistDetails[i].movieId == movieId) {
          isIncluded = true;
          break;
        }
      }

      if (!isIncluded) {
        WatchlistService.createWatchlistItem(this.watchlistId, movieId).then(
          () => {
            this.modalTitle = "Success!";
            this.modalMessage = "New Movie added into your watchlist!";
            this.modalStatus = "success";
            this.isModalOpen = true;
            
          }
        );
      } else {
        this.modalTitle = "Error";
        this.modalMessage = "Movie is already included in the watchlist";
        this.modalStatus = "error";
        this.isModalOpen = true;
      }
    },
    deleteMovieFromWatchlist(watchlistDetail, movieId){
      WatchlistService.deleteWatchlistItem(this.watchlistId, movieId).then(
        () => {
            this.modalTitle = "Success!";
            this.modalMessage = watchlistDetail.title + " is deleted from the watchlist";
            this.modalStatus = "success";
            this.isModalOpen = true;
        }
      )

    },
    closeModal() {
      this.isModalOpen = false;
      this.getWatchlistDetail();
    },
    updateWatchlistName() {
      if (this.watchlistNameInput != this.watchlist.name) {
        //make update
        WatchlistService.updateUserWatchlist(
          this.watchlistNameInput,
          this.watchlistId
        ).then(
          () => {
            this.modalTitle = "Success!";
            this.modalMessage = "Watchlist name has been updated!";
            this.modalStatus = "success";
            this.isModalOpen = true;
          },
          () => {
            this.modalTitle = "Error";
            this.modalMessage =
              "We couldn't update the name. Please try again later!";
            this.modalStatus = "error";
            this.isModalOpen = true;
          }
        );
      } else {
        this.modalTitle = "Info";
        this.modalMessage = "Please type a different name";
        this.modalStatus = "info";
        this.isModalOpen = true;
      }
    },
    deleteWatchlistConfirmation(){
      this.modalType = "confirmation";
      this.modalTitle = "Confirmation";
      this.modalMessage = "Are you sure you want to delete your watchlist?"
      this.modalStatus = "confirmation";
      this.modalTypeAction = "deleteWatchlist";
      this.isModalOpen = true;
    },
    deleteWatchlist(){
      WatchlistService.deleteWatchlistByWatchlist(this.watchlistId).then(
        () =>{
          this.isModalOpen = false;
          this.$router.push("/watchlists/"+this.userId);
        },
        () =>{
          this.isModalOpen = false;
          this.modelTypeAction = "";
          this.modalTitle = "Error";
          this.modalMessage = "We couldn't delete the watchlist. Try again later";
          this.modalStatus = "error";
          this.isModalOpen = true;
        }
      )
    }
  },
  created() {
    this.userId = this.$store.state.auth.user.id;
    this.watchlistId = this.$route.params.watchlistId;
    this.getWatchlistDetail();
  },
};
</script>

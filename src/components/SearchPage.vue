<template>
  <transition name="modal">
    <modal :title="modalTitle" :status="modalStatus" v-if="isModalOpen" @close="closeModal">
      <p>{{ modalMessage }}</p>
    </modal>
  </transition>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>Movie Search</h1>
            <ul class="breadcumb">
              <li class="active"><router-link to="/">Home</router-link></li>
              <li><span class="ion-ios-arrow-right"></span> Movie's Search</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single movie_list">
    <div class="container">
      <div class="sidebar">
        <div class="search-form">
          <h4 class="sb-title">Search for movie</h4>
          <div class="form-style-1">
            <div class="row">
              <div class="col-md-12 form-it">
                <label for="search-type">Search By:</label>
                <select v-model="searchType" id="search-type" name="search-type">
                  <option value="title">Title</option>
                  <option value="genre">Genre</option>
                  <option value="year">Release Year</option>
                </select>

                <label for="search-term">Search Keywords:</label>
                <input v-model="submit" type="text" id="search-term" name="search-term" placeholder="Keywords" />
              </div>
              <div class="col-md-12">
                <a class="redbtn" value="submit" @click="handleSubmit(page, size)">Search</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row ipad-width2">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <!-- Display error message if it exists -->
          <div v-for="(movie, index) in moviesList" :key="index" class="movie-item-style-2">

            <img v-if="movie.posterImage != null" :src="
              $MOVIE_PHOTOS_URL + '/' + movie.posterImage
            " alt="" />
            <img v-if="movie.posterImage == null" src="../../public/images/poster-template.jpeg" alt="" />
            <div class="mv-item-infor">
              <h6>
                <router-link :to="'/movies/' + movie.id">{{
                  movie.title
                }}</router-link>
              </h6>
              <!-- <p class="rate">
                <i class="ion-android-star"></i><span>{{ movie.avgRating }}</span> /5
              </p> -->

              <p class="run-time">
                Run Time: {{ movie.length }}
                <span>MMPA: {{ movie.classificationRating }}</span>
                <span>Release: {{ movie.releaseDate }}</span>

              </p>
              <br />
              <p class="describe">{{ movie.synopsis }}</p>

            </div>
          </div>

          <div class="topbar-filter">
            <label>Movies per page:</label>
            <select v-model="size" @change="handleSubmit(page, size)">
              <option value="10">10 Movies</option>
              <option value="20">20 Movies</option>
            </select>
            <div v-if="totalPages <= 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a v-for="n in totalPages" :key="n" :class="{ active: n === page + 1 }" @click="handleSubmit(n - 1, size)">
                {{ n }}
              </a>
              <a href="#"><i class="ion-arrow-right-b"></i></a>
            </div>
            <div v-if="totalPages > 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a v-for="n in 8" :key="n" :class="{ active: n === page + 1 }" @click="handleSubmit(n - 1, size)">{{ n
              }}</a>
              <a>...</a>
              <a v-for="n in 2" :key="n" @click="handleSubmit(n - 1, size)">{{ totalPages - 2 + n }}</a>
              <a href="#"><i class="ion-arrow-right-b"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Movie from "@/models/movie";
import MovieService from "@/services/movie.service.js";
// import UserService from "@/services/user.service.js";
import Modal from "@/components/Modal.vue";

export default {
  name: "SearchPage",
  components: {
    Modal,
  },
  data() {
    return {

      searchType: "title",
      submit: "",
      moviesList: [],
      page: "",
      size: "",
      totalPages: "",
      totalElements: 0,
      numberElements: 0,
      listType: "",
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType: "",
      modalTypeAction: "",
    };
  },
  computed: {
    loggedIn() {
      var loggedInValue = this.$store.state.auth.status.loggedIn;
      return loggedInValue;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin(){
      if( this.currentUser != null)
        return this.$store.state.auth.user.roles.includes('ROLE_ADMIN');
      else
        return false;
    }  
  },
  methods: {
    handleSubmit(page, size) {
      switch (this.searchType) {
        case "title":
          this.searchTitle(page, size);
          break;
        case "genre":
          this.searchGenre(page, size);
          break;
        case "year":
          this.searchReleaseYear(page, size);
          break;
        default:
          console.log("Invalid search");
          break;
      }
    },
    closeModal() {
      this.isModalOpen = false;
    }
    ,
    searchTitle(page, size) {
      console.log(page + "," + size);
      MovieService.getMoviesByTitle(this.submit, page, size).then(
        async (response) => {

          this.totalPages = response.totalPages;
          this.numberElements = response.numberOfElements;
          this.page = response.number;
          
          const moviesListPromise = response.content.map(async (movieData) => {
            
            const movie = new Movie(
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
            // movie.setAvgRating(avgRating.toFixed(1));
            return movie;
          });
          this.moviesList = await Promise.all(moviesListPromise);
          // this.moviesList.sort((a, b) => b.avgRating - a.avgRating);
        }
      ).catch(
        (error) => {
          // this.submit = "";
          this.modalTitle = "Error";
          this.modalMessage =
            "We couldn't find the movies. Insert or try other keywords.";
          this.modalStatus = "error";
          this.isModalOpen = true;
          console.log(error);
        }
      );
    },
    searchGenre(page, size) {
      console.log(page + "," + size);
      MovieService.getMoviesByGenre(this.submit, page, size).then(
        async (response) => {
          this.totalPages = response.totalPages;
          this.numberElements = response.numberOfElements;
          this.page = response.number;

          console.log(response);
          console.log(response.content);

          const moviesListPromise = response.content.map(async (movieData) => {
            
            const movie = new Movie(
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
            
            return movie;
          });
          this.moviesList = await Promise.all(moviesListPromise);
        }
      ).catch(
        (error) => {
          
          this.modalTitle = "Error";
          this.modalMessage =
            "We couldn't find the movies. Insert or try other keywords.";
          this.modalStatus = "error";
          this.isModalOpen = true;
          console.log(error);
        }
      );
    },
    searchReleaseYear(page, size) {
      console.log(page + "," + size);
      MovieService.getMoviesByYear(this.submit, page, size).then(
        async (response) => {

          this.totalPages = response.totalPages;
          this.numberElements = response.numberOfElements;
          this.page = response.number;

          console.log(response);
          console.log(response.content);

          const moviesListPromise = response.content.map(async (movieData) => {
            const movie = new Movie(
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
            // movie.setAvgRating(avgRating.toFixed(1));
            return movie;
          });
          this.moviesList = await Promise.all(moviesListPromise);
        }
      ).catch(
        (error) => {
          this.modalTitle = "Error";
          this.modalMessage =
            "We couldn't find the movies. Insert or try other keywords.";
          this.modalStatus = "error";
          this.isModalOpen = true;
          console.log(error);
        }
      );
    },
  },
  watch: {
      searchType: function () {
        this.submit = "";
      },
    },
  created() {
    this.listType = this.$route.params.listType;
    if (this.loggedIn){
      //check the role
      if (!this.isAdmin){
        this.userId = this.$store.state.auth.user.id;
        this.page = 0;
        this.size = 10;
        this.sortBy = "title-desc";
      }else{
        this.$router.push("/error");  
      }
    }else{
      this.$router.push("/error");
    }
  },
};
</script>
  
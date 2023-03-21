<template>
  <div class="slider movie-items">
    <div class="container">
      <div class="row">
        <div class="social-link">
          <p>Follow us:</p>
          <a href="#"><i class="ion-social-facebook"></i></a>
          <a href="#"><i class="ion-social-twitter"></i></a>
          <a href="#"><i class="ion-social-googleplus"></i></a>
          <a href="#"><i class="ion-social-youtube"></i></a>
        </div>
        <!-- Setting a if condition to mount the splide AFTER the getRandomMovie finish-->
        <Splide
          v-if="randomMovies.length > 0"
          :options="splideOptions"
          aria-label="My Favorite Images"
        >
          <SplideSlide
            class="movie-item"
            v-for="(movie, index) in randomMovies"
            :key="index"
          >
            <div class="mv-img">
              <a href="#"
                ><img
                  :src="
                    $MOVIE_PHOTOS_URL + '/' + movie.id + '/' + movie.posterImage
                  "
                  alt=""
                  width="285"
                  height="437"
              /></a>
            </div>
            <div class="title-in">
              <div
                class="cate"
                v-for="(genre, index) in movie.genre"
                :key="index"
              >
                <span class="blue"
                  ><a href="#">{{ genre }}</a></span
                >
              </div>
              <h6>
                <a href="#">{{ movie.title }}</a>
              </h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// Default theme
import "@splidejs/vue-splide/css";

// or other themes
import "@splidejs/vue-splide/css/skyblue";
import "@splidejs/vue-splide/css/sea-green";

// or only core styles
import "@splidejs/vue-splide/css/core";

// importing Movie Service
import MovieService from "@/services/movie.service.js";
import Movie from "@/models/movie";

export default {
  name: "MainPage",
  components: {
    Splide,
    SplideSlide,
    MovieService
  },
  data() {
    return {
      splideOptions: {
        type: "loop",
        perPage: 4,
        interval: 2000,
        autoplay: true,
        arrows: false,
      },
      randomMovies: [],
    };
  },
  methods: {
    getRandomMovies() {
      //handle get random movies api method
      MovieService.getRandomMovies().then((response) => {

        //To translate into a Movie object, we can use response.map
        this.randomMovies = response.map((movieData) => {
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
            movieData.whereToWatch,
            movieData.posterImage,
            movieData.trailerImage
          );
        });
      });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.getRandomMovies();
  },
};
</script>
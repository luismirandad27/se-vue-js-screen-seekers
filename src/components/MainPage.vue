<template>
  <div class="slider movie-items">
    <div class="container">
      <div class="row">
        <div class="title-hd">
          <h2>in theaters now</h2>
        </div>
      </div>
      <div class="row">
        <!-- Setting a if condition to mount the splide AFTER the getRandomMovie finish-->
        <Splide
          v-if="inTheatersMovies.length > 0"
          :options="splideOptions"
          aria-label="My Favorite Images"
        >
          <SplideSlide
            class="movie-item"
            v-for="(movie, index) in inTheatersMovies"
            :key="index"
          >
            <div class="mv-img">
              <a href="#">
                <img v-if="movie.posterImage != null"
                  :src="
                    $MOVIE_PHOTOS_URL + '/' + movie.id + '/' + movie.posterImage
                  "
                  alt=""
                  width="285"
                  height="437"/>
                <img v-if="movie.posterImage == null"
                  :src="
                    $MOVIE_PHOTOS_URL + '/poster-template.jpeg'
                  "
                  alt=""
                  width="285"
                  height="437"/>
              </a>
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
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
  <div class="movie-items">
    <div class="container">
      <div class="row">
        <div class="title-hd">
          <h2>now Streaming</h2>
        </div>
      </div>
      <div class="row">
        <!-- Setting a if condition to mount the splide AFTER the getRandomMovie finish-->
        <Splide
          v-if="inStreamingMovies.length > 0"
          :options="splideOptions"
          aria-label="My Favorite Images"
        >
          <SplideSlide
            class="movie-item"
            v-for="(movie, index) in inStreamingMovies"
            :key="index"
          >
            <div class="mv-img">
              <a href="#">
                <img v-if="movie.posterImage != null"
                  :src="
                    $MOVIE_PHOTOS_URL + '/' + movie.id + '/' + movie.posterImage
                  "
                  alt=""
                  width="285"
                  height="437"/>
                <img v-if="movie.posterImage == null"
                  :src="
                    $MOVIE_PHOTOS_URL + '/poster-template.jpeg'
                  "
                  alt=""
                  width="285"
                  height="437"/>
              </a>
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
      inTheatersMovies: [],
      inStreamingMovies: [],
    };
  },
  methods: {
    getAllMovies() {
      //handle get random movies api method
      MovieService.getAllMovies().then((response) => {
        
        const inTheatersData = response.content.filter(movieData=>movieData.isInTheaters === true);
        const inStreamingData = response.content.filter(movieData=>movieData.isInStreaming === true);
        
        //To translate into a Movie object, we can use response.map
        this.inTheatersMovies = inTheatersData.map((movieData) => {
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

        this.inStreamingMovies = inStreamingData.map((movieData) => {
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
    this.getAllMovies();
  },
};
</script>
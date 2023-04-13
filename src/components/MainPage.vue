<template>
  <div class="slider movie-items">
    <div class="container">
      <div class="row">
        <div class="title-hd">
          <h2>in theaters now</h2>
          <router-link to="/movies/list/1" class="viewall"
            >View all <i class="ion-ios-arrow-right"></i
          ></router-link>
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
                <img
                  v-if="movie.posterImage != null"
                  :src="$MOVIE_PHOTOS_URL + '/' + movie.posterImage"
                  alt=""
                  width="285"
                  height="437"
                />
                <img
                  v-if="movie.posterImage == null"
                  src="../../public/images/poster-template.jpeg"
                  alt=""
                  width="285"
                  height="437"
                />
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
                <router-link :to="'/movies/' + movie.id">{{
                  movie.title
                }}</router-link>
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
          <router-link to="/movies/list/2" class="viewall"
            >View all <i class="ion-ios-arrow-right"></i
          ></router-link>
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
                <img
                  v-if="movie.posterImage != null"
                  :src="$MOVIE_PHOTOS_URL + '/' + movie.posterImage"
                  alt=""
                  width="285"
                  height="437"
                />
                <img
                  v-if="movie.posterImage == null"
                  src="../../public/images/poster-template.jpeg"
                  alt=""
                  width="285"
                  height="437"
                />
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
  <div class="trailers">
    <div class="container">
      <div class="row ipad-width">
        <div class="col-md-12">
          <div class="title-hd">
            <h2>Coming Soon</h2>
            <router-link to="/movies/list/3" class="viewall"
              >View all <i class="ion-ios-arrow-right"></i
            ></router-link>
          </div>
          <div class="videos">
            <Splide
              ref="previewSplide"
              :options="previewOptions"
              class="video-ft"
            >
              <SplideSlide
                v-for="(item, index) in inComminSoonMovies"
                :key="index"
              >
                <iframe class="item-video" :src="item.movieTrailerLink" />
              </SplideSlide>
            </Splide>
            <Splide
              ref="thumbnailSplide"
              :options="thumbnailOptions"
              class="thumb-ft"
            >
              <SplideSlide
                v-for="(item, index) in inComminSoonMovies"
                :key="index"
                class="item"
              >
                <div class="trailer-img">
                  <img
                    v-if="item.trailerImage != null"
                    :src="$MOVIE_PHOTOS_URL + '/' + item.trailerImage"
                    alt=""
                  />
                  <img
                    v-if="item.trailerImage == null"
                    src="../../public/images/trailer-template.jpeg"
                    alt=""
                  />
                </div>
                <div class="trailer-infor">
                  <h4 class="desc">{{ item.title }}</h4>
                </div>
              </SplideSlide>
            </Splide>
          </div>
        </div>
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
  metaInfo () {
    return {
      title: this.title,
      meta: [],
    }
  },
  components: {
    Splide,
    SplideSlide,
    MovieService,
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
      previewOptions: {
        width: "100%",
        heightRatio: 0.6,
        arrows: false,
        pagination: false,
        drag: false,
        rewind: true,
        sync: "thumbnailSplide",
      },
      thumbnailOptions: {
        type: "slide",
        width: "100%",
        perPage: 4,
        perMove: 1,
        focus: "center",
        heightRatio: 1,
        arrows: true,
        drag: true,
        pagination: false,
        direction: "ttb", // vertical direction
        sync: "previewSplide", // sync with the main slider,
        arrow: {
          prev: ".splide__arrow--prev",
          next: ".splide__arrow--next",
        },
      },
      inTheatersMovies: [],
      inStreamingMovies: [],
      inComminSoonMovies: [],
      activeSlide: 0, // initialize the active slide index
    };
  },
  methods: {
    getAllMovies() {
      //handle get random movies api method
      MovieService.getAllMovies().then( async (response) => {

        if (response != ""){

          const inTheatersData = await response.content.filter(
            (movieData) => movieData.isInTheaters === true
          );
          const inStreamingData = await response.content.filter(
            (movieData) => movieData.isInStreaming === true
          );
          const inComingSoonData = await response.content.filter(
            (movieData) => movieData.isComingSoon === true
          );
          
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

          this.inComminSoonMovies = inComingSoonData.map((movieData) => {
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
          
          console.log(this.inComminSoonMovies);

        }
      });
    },
    configuringThumbnailSplide() {
      const previewSplide = this.$refs.previewSplide.splide;
      const prevArrow = document.querySelector(
        ".thumb-ft .splide__arrow--prev"
      );
      const nextArrow = document.querySelector(
        ".thumb-ft .splide__arrow--next"
      );

      prevArrow.addEventListener("click", () => {
        previewSplide.go("-1");
      });

      nextArrow.addEventListener("click", () => {
        previewSplide.go("+1");
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
    document.title = 'Screen Seekers';
    this.getAllMovies();
    this.configuringThumbnailSplide();
    
  }
};
</script>
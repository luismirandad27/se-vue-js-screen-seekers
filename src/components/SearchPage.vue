<template>
  <!-- <br><br><br><br> -->
  <!-- <div>
      <h1>Movie Search</h1>
      <form @submit.prevent="handleSubmit">
        <label for="search-type">Search By:</label>
        <select v-model="searchType" id="search-type" name="search-type">
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="year">Release Year</option>
        </select>
        <br><br>
        <label for="search-term">Search Term:</label>
        <input v-model="submit" type="text" id="search-term" name="search-term">
        <br><br>
        <button type="submit">Search</button>

        <ul>
          <li v-for="movie in movies" :key="movie.id">
            {{ movie }}
          </li>
        </ul>
      </form>
    </div> -->
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>Movie Search</h1>
            <ul class="breadcumb">
              <li class="active"><a href="#">Movie</a></li>
              <li><span class="ion-ios-arrow-right"></span> Search</li>
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

                <label for="search-term">Search Term:</label>
                <input v-model="submit" type="text" id="search-term" name="search-term" />
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
                <span> ({{ movie.releaseDate }})</span>
              </h6>
              <p class="rate">
                <i class="ion-android-star"></i><span>{{ movie.avgRating }}</span> /5
              </p>

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
              <a v-for="n in totalPages" :key="n" :class="{ active: n === page + 1 }"
                @click="handleSubmit(n - 1, size)">
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


        <!-- New -->

      </div>
    </div>
  </div>
</template>
  
<script>
import Movie from "@/models/movie";
import MovieService from "@/services/movie.service.js";

export default {
  name: "SearchPage",
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
    };
  },
  methods: {
    async getMovieListByType(page, size) {
      switch (this.listType) {
        case "1":
          //Recommendations
          this.getRecommendations(page, size);
          break;
        case "2":
          //In Theaters
          this.getInTheatersMovies(page, size);
          break;
        case "3":
          //In Streaming
          this.getInStreamingMovies(page, size);
          break;
        case "4":
          //Coming Soon
          this.getComingSoonMovies(page, size);
          break;
        default:
          break;
      }
    },
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
          console.log("Invalid search type");
          alert("Not found! Please try again.");
          break;
      }
    },

    // Pass this.submit to the method
    // searchTitle() {
    //   console.log(this.submit);
    //   MovieService.getMoviesByTitle(this.submit).then(
    //    async (response) => {

    //     // this.totalPages = response.totalPages;
    //     //   this.numberElements = response.numberOfElements;
    //     //   this.page = response.number;

    //       console.log(response.content)
    //     const moviesListPromise = response.content.map(async (movieData) => {
    //       const movie = new Movie(
    //         movieData.id,
    //         movieData.title,
    //         movieData.genre.split(","),
    //         movieData.releaseDate,
    //         movieData.length,
    //         movieData.synopsis,
    //         movieData.classificationRating,
    //         movieData.movieTrailerLink,
    //         movieData.isInTheaters,
    //         movieData.isInStreaming,
    //         movieData.isComingSoon,
    //         movieData.whereToWatch,
    //         movieData.posterImage,
    //         movieData.trailerImage
    //       );
    //       return movie;
    //     }

    //   );
    //   this.moviesList = await Promise.all(moviesListPromise);
    //    },
    //     (error) => {
    //       this.submit = "";
    //       console.log(error);
    //     })
    // },

    searchTitle(page, size) {
      console.log(page + "," + size);
      MovieService.getMoviesByTitle(this.submit, page, size).then(
        async (response) => {

          this.totalPages = response.totalPages;
          this.numberElements = response.numberOfElements;
          this.page = response.number;

          console.log(response);
          console.log(response.content);

          const moviesListPromise = response.content.map(async (movieData) => {
            // //Getting the rating by movie
            // const ratingResponse = await UserService.getRatingByMovie(
            //     movieData.id
            //   );

            //   const movieRating = ratingResponse;
            //   const totalRatings = movieRating.length;
            //   const sumRatings = totalRatings == 0 ? 0 : movieRating.reduce(
            //     (sum, rating) => sum + rating.userRating, 0
            //   );
            //   const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
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
        },
        (error) => {
          this.submit = "";
          console.log(error);
        }
      );
    },
    searchGenre() {
      console.log(this.submit);
      MovieService.getMoviesByGenre(this.submit).then(
        async (response) => {
          // this.totalPages = response.totalPages;
          //   this.numberElements = response.numberOfElements;
          //   this.page = response.number;

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
        },
        (error) => {
          this.submit = "";
          console.log(error);
        }
      );
    },
    searchReleaseYear() {
      console.log(this.submit);
      MovieService.getMoviesByYear(this.submit).then(
        async (response) => {
          // this.totalPages = response.totalPages;
          //   this.numberElements = response.numberOfElements;
          //   this.page = response.number;

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
        },
        (error) => {
          this.submit = "";
          console.log(error);
        }
      );
    },
    watch: {
      searchType: function () {
        this.submit = "";
      },
    },
  },

  created() {
    this.listType = this.$route.params.listType;
    this.userId = this.$store.state.auth.user.id;
    this.page = 0;
    this.size = 10;
    this.sortBy = "title-desc";
    this.getMovieListByType(this.page, this.size);
  },
};
</script>
  
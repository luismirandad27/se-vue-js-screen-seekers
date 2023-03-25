<template>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct movies">
            <h1>Recommendations for you</h1>
            <ul class="breadcumb">
              <li class="active"><a href="#">Home</a></li>
              <li><span class="ion-ios-arrow-right"></span> Recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single">
    <div class="container">
      <div class="row ipad-width">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="topbar-filter">
            <p>
              Found <span>{{ numberElements }} movies</span> in total
            </p>
          </div>
          <div class="flex-wrap-movielist">
            <div class="movie-item-style-2 movie-item-style-1" v-for="(movie, index) in moviesList" :key="index">
              <img v-if="movie.posterImage != null" :src="
                $MOVIE_PHOTOS_URL + '/' + movie.id + '/' + movie.posterImage
              " alt="" />
              <img v-if="movie.posterImage == null" src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">{{ movie.title }}</a>
                </h6>
                <p class="rate">
                  <i class="ion-android-star"></i><span>{{ movie.avgRating }}</span> /5
                </p>
              </div>
            </div>
          </div>
          <div class="topbar-filter">
            <label>Movies per page:</label>
            <select v-model="size" @change="getRecommendations(page, size)">
              <option value="10">10 Movies</option>
              <option value="20">20 Movies</option>
            </select>
            <div v-if="totalPages <= 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a v-for="n in totalPages" :key="n" :class="{ active: n === page + 1 }"
                @click="getRecommendations(n - 1, size)">
                {{ n }}
              </a>
              <a href="#"><i class="ion-arrow-right-b"></i></a>
            </div>
            <div v-if="totalPages > 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a v-for="n in 8" :key="n" :class="{ active: n === page + 1 }" @click="getRecommendations(n - 1, size)">{{ n
              }}</a>
              <a>...</a>
              <a v-for="n in 2" :key="n" @click="getRecommendations(n - 1, size)">{{ totalPages - 2 + n }}</a>
              <a href="#"><i class="ion-arrow-right-b"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import UserService from "@/services/user.service.js";
import Movie from "@/models/movie";

export default {
  name: "MovieRecommendation",
  data() {
    return {
      moviesList: [],
      userId: "",
      page: "",
      size: "",
      totalPages: "",
      totalElements: 0,
      numberElements: 0,
    };
  },
  methods: {
    getRecommendations(page, size) {

      UserService.getRecommendationsByUser(
        this.userId,
        page,
        size
      ).then(
        async (response) => {
          
          console.log(response.content);
          this.totalPages = response.totalPages;
          this.numberElements = response.numberOfElements;
          this.page = response.number;
          const moviesListPromise = response.content.map(async (movieData) => {

            //Getting the rating by movie
            const ratingResponse = await UserService.getRatingByMovie(
              movieData.id
            );

            const movieRating = ratingResponse;
            const totalRatings = movieRating.length;
            const sumRatings = movieRating.reduce(
              (sum, rating) => sum + rating.userRating, 0
            );

            const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

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

            movie.setAvgRating(avgRating.toFixed(1));
            return movie;
          });
          this.moviesList = await Promise.all(moviesListPromise);
          this.moviesList.sort((a, b) => b.avgRating - a.avgRating);
        },
        (error) => {
          console.log(error);
        }
      );

    },
  },
  created() {
    this.userId = this.$store.state.auth.user.id;
    this.page = 0;
    this.size = 10;
    this.sortBy = "title-desc";
    this.getRecommendations(this.page, this.size);
  },
};
</script>
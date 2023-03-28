<template>
  <div class="hero mv-single-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12"></div>
      </div>
    </div>
  </div>
  <div class="page-single movie-single movie_single">
    <div class="container">
      <div class="row ipad-width2">
        <div class="col-md-4 col-sm-12 col-xs-12">
          <div class="movie-img sticky-sb">
            <img
              v-if="movieObj.posterImage != null"
              :src="$MOVIE_PHOTOS_URL + '/' + movieObj.posterImage"
              alt=""
            />
            <img
              v-if="movieObj.posterImage == null"
              src="../../public/images/poster-template.jpeg"
              alt=""
            />
            <div class="movie-btn">
              <div class="btn-transform transform-vertical red">
                <div>
                  <a href="#" class="item item-1 redbtn">
                    <i class="ion-play"></i> Watch Trailer</a
                  >
                </div>
                <div>
                  <a
                    v-if="movieObj != null"
                    :href="movieObj.movieTrailerLink"
                    class="item item-2 redbtn fancybox-media hvr-grow"
                    ><i class="ion-play"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-sm-12 col-xs-12">
          <div class="movie-single-ct main-content">
            <h1 class="bd-hd">
              {{ movieObj.title }}
              <span>{{
                new Date(movieObj.releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                })
              }}</span>
            </h1>
            <div class="movie-rate">
              <div class="rate">
                <i class="ion-android-star"></i>
                <p>
                  <span>Average Rating: {{ movieObj.avgRating }}</span> /5<br />
                </p>
              </div>
            </div>
            <div class="movie-tabs">
              <div class="tabs">
                <ul class="tab-links tabs-mv">
                  <li class="active"><a href="#overview">Overview</a></li>
                </ul>
                <div class="tab-content">
                  <div id="overview" class="tab active">
                    <div class="row">
                      <div class="col-md-8 col-sm-12 col-xs-12">
                        <p>
                          {{ movieObj.synopsis }}
                        </p>
                        <div class="title-hd-sm">
                          <h4>cast</h4>
                        </div>
                        <div class="mvcast-item">
                          <div
                            v-for="(crewmember, index) in castsArray"
                            :key="index"
                            class="cast-it"
                          >
                            <div class="cast-left">
                              <img
                                v-if="crewmember.profileImage != null"
                                :src="
                                  $CREW_PHOTOS_URL +
                                  '/' +
                                  crewmember.profileImage
                                "
                                alt=""
                                height="40"
                                width="40"
                              />
                              <img
                                v-if="crewmember.profileImage == null"
                                src="../../public/images/crew-no-name.png"
                                alt=""
                                height="40"
                                width="40"
                              />
                              <a href="#">{{
                                crewmember.firstName + " " + crewmember.lastName
                              }}</a>
                            </div>
                            <p>... {{ crewmember.charName }}</p>
                          </div>
                        </div>
                        <div v-if="ratingsArray.length>0" class="title-hd-sm">
                          <h4>User reviews</h4>
                          <a href="#" class="time"
                            >See All {{ ratingsArray.length }} Reviews
                            <i class="ion-ios-arrow-right"></i
                          ></a>
                        </div>
                        
                        <div v-if="ratingsArray.length>0" class="mv-user-review-item">
                          <div class="no-star">
                            <i v-for = "n in ratingsArray[0].userRating" :key="n" class="ion-android-star"></i>
                            <i v-for = "n in range(ratingsArray[0].userRating + 1,5)" :key="n" class="ion-android-star last"></i>
                          </div>
                          <p class="time">
                            {{ new Date(ratingsArray[0].createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              ) }} by <a href="#"> {{ ratingsArray[0].user.username }} </a>
                          </p>
                          <p>
                            {{ ratingsArray[0].comment }}
                          </p>
                        </div>
                      </div>
                      <div class="col-md-4 col-xs-12 col-sm-12">
                        <div class="sb-it">
                          <h6>Director:</h6>
                          <p
                            v-for="(director, index) in directorsArray"
                            :key="index"
                          >
                            <a href="#">{{
                              director.firstName + " " + director.lastName
                            }}</a>
                          </p>
                        </div>
                        <div class="sb-it">
                          <h6>Writer:</h6>
                          <p
                            v-for="(writer, index) in writersArray"
                            :key="index"
                          >
                            <a href="#">{{
                              writer.firstName + " " + writer.lastName
                            }}</a>
                          </p>
                        </div>
                        <div class="sb-it">
                          <h6>Genres:</h6>
                          <p
                            v-for="(genre, index) in movieObj.genre"
                            :key="index"
                          >
                            <a href="#">{{ genre }}</a>
                          </p>
                        </div>
                        <div class="sb-it">
                          <h6>Release Date:</h6>
                          <p>
                            {{
                              new Date(movieObj.releaseDate).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            }}
                          </p>
                        </div>
                        <div class="sb-it">
                          <h6>Run Time:</h6>
                          <p>{{ movieObj.length }} min</p>
                        </div>
                        <div class="sb-it">
                          <h6>MMPA Rating:</h6>
                          <p>{{ movieObj.classificationRating }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieService from "@/services/movie.service.js";
import UserService from "@/services/user.service.js";
import Movie from "@/models/movie.js";
import CrewMember from "@/models/crewmember.js";

export default {
  name: "MovieDetail",
  data() {
    return {
      movieId: "",
      movieObj: null,
      directorsArray: [],
      writersArray: [],
      castsArray: [],
      ratingsArray: [],
    };
  },
  methods: {
    async getMovieDetail() {
      const responseMovie = await MovieService.getMovieById(this.movieId);
      this.movieObj = new Movie(
        responseMovie.id,
        responseMovie.title,
        responseMovie.genre.split(","),
        responseMovie.releaseDate,
        responseMovie.length,
        responseMovie.synopsis,
        responseMovie.classificationRating,
        responseMovie.movieTrailerLink,
        responseMovie.isInTheaters,
        responseMovie.isInStreaming,
        responseMovie.isComingSoon,
        responseMovie.whereToWatch,
        responseMovie.posterImage,
        responseMovie.trailerImage
      );

      const responseCrew = await MovieService.getCrewMemberByMovie(
        this.movieId
      );

      if (responseCrew.length > 0) {
        const respDirectorCrew = responseCrew.filter(
          (pCrewData) => pCrewData.role === "Director"
        );

        if (respDirectorCrew.length > 0) {
          this.directorsArray = respDirectorCrew.map((crewMember) => {
            return new CrewMember(
              crewMember.id,
              crewMember.charName,
              crewMember.role,
              crewMember.movieId,
              crewMember.crewMember.firstName,
              crewMember.crewMember.lastName,
              crewMember.crewMember.nationality,
              crewMember.crewMember.award,
              crewMember.crewMember.profileImage
            );
          });
        }

        const respWritersCrew = responseCrew.filter(
          (pCrewData) => pCrewData.role === "Writer"
        );

        if (respWritersCrew.length > 0) {
          this.writersArray = respWritersCrew.map((crewMember) => {
            return new CrewMember(
              crewMember.id,
              crewMember.charName,
              crewMember.role,
              crewMember.movieId,
              crewMember.crewMember.firstName,
              crewMember.crewMember.lastName,
              crewMember.crewMember.nationality,
              crewMember.crewMember.award,
              crewMember.crewMember.profileImage
            );
          });
        }
        
        const respCastCrew = responseCrew.filter(
          (pCrewData) => pCrewData.role === "Cast"
        );

        if (respCastCrew.length > 0) {
          this.castsArray = respCastCrew.map((crewMember) => {
            return new CrewMember(
              crewMember.id,
              crewMember.charName,
              crewMember.role,
              crewMember.movieId,
              crewMember.crewMember.firstName,
              crewMember.crewMember.lastName,
              crewMember.crewMember.nationality,
              crewMember.crewMember.award,
              crewMember.crewMember.profileImage
            );
          });
        }
      }

      const ratingResponse = await UserService.getRatingByMovie(this.movieId);

      if (ratingResponse.length > 0) {
        this.ratingsArray = ratingResponse;
        const totalRatings = this.ratingsArray.length;
        const sumRatings = this.ratingsArray.reduce(
          (sum, rating) => sum + rating.userRating,
          0
        );
        const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
        this.movieObj.setAvgRating(avgRating.toFixed(1));
        this.ratingsArray.sort((a, b) => b.userRating - a.userRating);
        console.log(this.ratingsArray)
      }
    },
    range(start, end) {
				return Array(end - start + 1).fill().map((val, i) => start + i)
		}
  },
  created() {
    this.movieId = this.$route.params.id;
    this.getMovieDetail();
  },
};
</script>
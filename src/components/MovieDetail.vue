<template>
  <transition name="modal">
    <modal
      :title="modalTitle"
      :status="modalStatus"
      v-if="isModalOpen"
      @close="closeModal"
    >
      <p>{{ modalMessage }}</p>
    </modal>
  </transition>
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
                  <li><a href="#reviews"> Reviews</a></li>
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
                                src="../../public/images/crew-no-name.jpg"
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
                  <div id="reviews" class="tab review">
                    <div class="row">
                      <div class="topbar-filter">
                        <p>
                          Found <span>{{ numberElements }} reviews</span> in
                          total
                        </p>
                      </div>
                      <div
                        v-for="(rating, index) in ratingsArray"
                        :key="index"
                        class="mv-user-review-item"
                      >
                        <div class="user-infor">
                          <img
                            v-if="rating.user.profileImage != null"
                            :src="
                              $USER_PHOTOS_URL + '/' + rating.user.profileImage
                            "
                            alt=""
                          />
                          <img
                            v-if="rating.user.profileImage == null"
                            src="../../public/images/user-no-name.jpg"
                            alt=""
                          />
                          <div>
                            <div class="no-star">
                              <i
                                v-for="n in rating.userRating"
                                :key="n"
                                class="ion-android-star"
                              ></i>
                              <i
                                v-for="n in range(rating.userRating + 1, 5)"
                                :key="n"
                                class="ion-android-star last"
                              ></i>
                            </div>
                            <p class="time">
                              {{
                                new Date(rating.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              }}
                              by <a href="#"> {{ rating.user.username }} </a>
                            </p>
                          </div>
                        </div>
                        <p>{{ rating.comment }}</p>
                      </div>
                      <div class="topbar-filter">
                        <label>Reviews per page:</label>
                        <select
                          v-model="size"
                          @change="getRatingList(page, size)"
                        >
                          <option value="5">5 Reviews</option>
                          <option value="10">10 Reviews</option>
                        </select>
                        <div v-if="totalPages <= 10" class="pagination2">
                          <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
                          <a
                            v-for="n in totalPages"
                            :key="n"
                            :class="{ active: n === page + 1 }"
                            @click="getRatingList(n - 1, size)"
                          >
                            {{ n }}
                          </a>
                          <a href="#"><i class="ion-arrow-right-b"></i></a>
                        </div>
                        <div v-if="totalPages > 10" class="pagination2">
                          <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
                          <a
                            v-for="n in 8"
                            :key="n"
                            :class="{ active: n === page + 1 }"
                            @click="getRatingList(n - 1, size)"
                            >{{ n }}</a
                          >
                          <a>...</a>
                          <a
                            v-for="n in 2"
                            :key="n"
                            @click="getRatingList(n - 1, size)"
                            >{{ totalPages - 2 + n }}</a
                          >
                          <a href="#"><i class="ion-arrow-right-b"></i></a>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="loggedIn && !userRatedMovie"
                      class="row form-style-1 user-pro"
                    >
                      <form @submit.prevent="addNewRating">
                        <h3>RATE THE MOVIE</h3>
                        <div class="row">
                          <div class="col-md-4 form-it">
                            <label>Number of Stars</label>
                            <input
                              type="number"
                              placeholder="From 0 to 5"
                              max="5"
                              min="0"
                              v-model="ratingInput"
                              :required="true"
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12 form-it">
                            <label>Comment</label>
                            <textarea
                              placeholder="Tell us your opinion (max 500 character)"
                              rows="5"
                              v-model="ratingCommentInput"
                              :maxlength="500"
                              :required="true"
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4 form-it">
                            <input
                              class="submit"
                              type="submit"
                              value="Rate & Review"
                            />
                          </div>
                        </div>
                      </form>
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
// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

import $ from "jquery";

export default {
  name: "MovieDetail",
  components: {
    Modal,
  },
  data() {
    return {
      movieId: "",
      movieObj: null,
      directorsArray: [],
      writersArray: [],
      castsArray: [],
      ratingsArray: [],
      page: "",
      size: "",
      totalPages: "",
      totalElements: 0,
      numberElements: 0,
      userRatedMovie: false,
      ratingInput: "",
      ratingCommentInput: "",
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType: "",
      modalTypeAction: "",
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

      if (responseCrew != "") {
        const respDirectorCrew = responseCrew.filter(
          (pCrewData) => pCrewData.role === "Director"
        );

        if (respDirectorCrew != "") {
          this.directorsArray = respDirectorCrew.map((crewMember) => {
            return new CrewMember(
              crewMember.id,
              crewMember.charName,
              crewMember.role,
              crewMember.movieId,
              crewMember.crewMember.crewId,
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

        if (respWritersCrew != "") {
          this.writersArray = respWritersCrew.map((crewMember) => {
            return new CrewMember(
              crewMember.id,
              crewMember.charName,
              crewMember.role,
              crewMember.movieId,
              crewMember.crewMember.crewId,
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

        if (respCastCrew != "") {
          this.castsArray = respCastCrew.map((crewMember) => {
            return new CrewMember(
              crewMember.id,
              crewMember.charName,
              crewMember.role,
              crewMember.movieId,
              crewMember.crewMember.crewId,
              crewMember.crewMember.firstName,
              crewMember.crewMember.lastName,
              crewMember.crewMember.nationality,
              crewMember.crewMember.award,
              crewMember.crewMember.profileImage
            );
          });
        }
      }

      const ratingResponse = await UserService.getRatingByMovie(
        this.movieId,
        this.page,
        this.size
      );

      if (ratingResponse != "") {
        this.ratingsArray = ratingResponse.content;
        const totalRatings = this.ratingsArray.length;
        const sumRatings = this.ratingsArray.reduce(
          (sum, rating) => sum + rating.userRating,
          0
        );
        const avgRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
        this.movieObj.setAvgRating(avgRating.toFixed(1));
      }
    },
    async getRatingList(page, size) {
      const ratingsResponse = await UserService.getRatingByMovie(
        this.movieId,
        page,
        size
      );
      if (ratingsResponse != "") {
        this.totalPages = ratingsResponse.totalPages;
        this.numberElements = ratingsResponse.totalElements;
        this.page = ratingsResponse.number;
        this.ratingsArray = ratingsResponse.content;
      }
    },
    range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((val, i) => start + i);
    },
    activeTabs() {
      var tabsClick = $(".tabs .tab-links a, .tab-links-2 a, .tab-links-3 a");
      tabsClick.on("click", function (e) {
        var currentAttrValue = $(this).attr("href");
        var tabsCurrent = $(".tabs " + currentAttrValue);
        // Show/Hide Tabs
        tabsCurrent.show().siblings().hide();
        // Change/remove current tab to active
        $(this)
          .parent("li")
          .addClass("active")
          .siblings()
          .removeClass("active");
        e.preventDefault();
        //reset position for tabs
      });
    },
    async validateUserRatedMovie() {
      const user = this.$store.state.auth.user;
      if (user != null) {
        const response = await UserService.getUserRatings(user.id);
        if (response != null) {
          const ratingUser = response.content.filter(
            (rating) => rating.movie.id == this.movieId
          );
          if (ratingUser.length == 0) {
            this.userRatedMovie = false;
          } else {
            this.userRatedMovie = true;
          }
        } else {
          this.userRatedMovie = false;
        }
      }
    },
    addNewRating() {
      const userId = this.currentUser.id;
      UserService.addUserRating(
        userId,
        this.movieId,
        this.ratingInput,
        this.ratingCommentInput
      ).then(
        (response) => {
          console.log(response);
          this.modalTitle = "Success!";
          this.modalMessage = "Rating registered successfully!";
          this.modalStatus = "success";
          this.isModalOpen = true;
        },
        (error) => {
          console.log(error);
          this.modalTitle = "Error";
          this.modalMessage =
            "We couldn't perfom the operation. Try again later";
          this.modalStatus = "error";
          this.isModalOpen = true;
        }
      );
    },
    closeModal() {
      this.page = 0;
      this.size = 5;
      this.getMovieDetail();
      this.getRatingList(this.page, this.size);
      this.validateUserRatedMovie();
      this.isModalOpen = false;
    },
  },
  created() {
    this.movieId = this.$route.params.id;
    this.page = 0;
    this.size = 5;
    this.getMovieDetail();
    this.getRatingList(this.page, this.size);
    this.validateUserRatedMovie();
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
    this.activeTabs();
  },
};
</script>
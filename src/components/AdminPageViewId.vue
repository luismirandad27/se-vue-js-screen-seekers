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
        <button
          v-if="modalTypeAction == 'deleteMovie'"
          class="modal-confirm"
          @click="deleteMovie()"
        >
          Confirm
        </button>
        <button class="modal-cancel" @click="closeModal">Cancel</button>
      </div>
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
              <div class="btn-transform red">
                <div>
                  <a @click="uploadPoster()" class="item item-1 yellowbtn"
                    ><i class="ion-android-upload"></i> Upload Poster Image</a
                  >
                </div>
              </div>
            </div>
            <img
              v-if="movieObj.trailerImage != null"
              :src="$MOVIE_PHOTOS_URL + '/' + movieObj.trailerImage"
              alt=""
            />
            <img
              v-if="movieObj.trailerImage == null"
              src="../../public/images/trailer-template.jpeg"
              alt=""
            />
            <div class="movie-btn">
              <div class="btn-transform red">
                <div>
                  <a @click="uploadTrailerImage()" class="item item-1 yellowbtn"
                    ><i class="ion-android-upload"></i>Upload Trailer Image</a
                  >
                </div>
              </div>
            </div>
            <div class="movie-btn">
              <div class="btn-transform red">
                <div>
                  <a
                    @click="deleteMovieConfirmation()"
                    class="item item-1 redbtn"
                  >
                    <i class="ion-trash-a"></i>DELETE THIS MOVIE</a
                  >
                </div>
              </div>
              <div class="btn-transform">
                <div>
                  <router-link
                    class="item item-1 yellowbtn"
                    :to="'/admin/movies/update/' + movieId"
                  >
                    <i class="ion-android-create"></i> UPDATE THIS MOVIE
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-sm-12 col-xs-12">
          <div class="movie-single-ct main-content">
            <h1 class="bd-hd">
              {{ movieObj.title }}
              <span
                >({{
                  new Date(movieObj.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                  })
                }})</span
              >
            </h1>
            <div class="social-btn">
              <router-link :to="'/addCrew/' + movieObj.id" class="parent-btn"
                ><i class="ion-plus"></i>Add a Crew Member</router-link
              >
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
                        <p>{{ movieObj.synopsis }}</p>
                        <div class="title-hd-sm">
                          <h4>cast</h4>
                        </div>
                        <!-- movie cast -->
                        <div
                          class="mvcast-item"
                          v-for="(x, i) in castsArray"
                          :key="i"
                        >
                          <div class="cast-it">
                            <div class="cast-left">
                              <img
                                src="../../public/images/crew-no-name.jpg"
                                alt=""
                                height="40"
                                width="40"
                              />
                              <a href="#">{{ x.charName }} </a>
                            </div>
                            <p>{{ x.firstName }} {{ x.lastName }}</p>
                            <a
                              @click="remove(x.crewId)"
                              class="redbtn"
                              style="margin-right: 0px; color: white"
                            >
                              Remove
                            </a>
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
                            <a
                              @click="remove(director.crewId)"
                              style="margin-right: 0px; color: Red"
                            >
                              (Remove)
                            </a>
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
                            <a
                              @click="remove(writer.crewId)"
                              style="margin-right: 0px; color: Red"
                            >
                              (Remove)
                            </a>
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
// import r from 'public/js/plugins.js';
import Admin from "../services/admin.service.js";

import MovieService from "@/services/movie.service.js";
import UserService from "@/services/user.service.js";
import Movie from "@/models/movie.js";
import CrewMember from "@/models/crewmember.js";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "AdminPageViewId",
  components: {
    Modal,
  },
  data() {
    return {
      msg: "AdminPageViewId",
      movieObj: null,
      directorsArray: [],
      writersArray: [],
      castsArray: [],
      ratingsArray: [],
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType: "",
      modalTypeAction: "",
    };
  },
  methods: {
    async getAmovie() {
      try {
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

        console.log(responseCrew === "");

        if (responseCrew !== "") {
          const respDirectorCrew = responseCrew.filter(
            (pCrewData) => pCrewData.role === "Director"
          );

          if (respDirectorCrew !== "") {
            this.directorsArray = respDirectorCrew.map((prodMember) => {
              return new CrewMember(
                prodMember.id,
                prodMember.charName,
                prodMember.role,
                prodMember.movieId,
                prodMember.crewMember.crewId,
                prodMember.crewMember.firstName,
                prodMember.crewMember.lastName,
                prodMember.crewMember.nationality,
                prodMember.crewMember.award,
                prodMember.crewMember.profileImage
              );
            });
          } else {
            this.directorsArray = [];
          }

          const respWritersCrew = responseCrew.filter(
            (pCrewData) => pCrewData.role === "Writer"
          );

          if (respWritersCrew !== "") {
            this.writersArray = respWritersCrew.map((prodMember) => {
              return new CrewMember(
                prodMember.id,
                prodMember.charName,
                prodMember.role,
                prodMember.movieId,
                prodMember.crewMember.crewId,
                prodMember.crewMember.firstName,
                prodMember.crewMember.lastName,
                prodMember.crewMember.nationality,
                prodMember.crewMember.award,
                prodMember.crewMember.profileImage
              );
            });
          } else {
            this.writersArray = [];
          }

          const respCastCrew = responseCrew.filter(
            (pCrewData) => pCrewData.role === "Cast"
          );

          if (respCastCrew !== "") {
            this.castsArray = respCastCrew.map((prodMember) => {
              return new CrewMember(
                prodMember.id,
                prodMember.charName,
                prodMember.role,
                prodMember.movieId,
                prodMember.crewMember.crewId,
                prodMember.crewMember.firstName,
                prodMember.crewMember.lastName,
                prodMember.crewMember.nationality,
                prodMember.crewMember.award,
                prodMember.crewMember.profileImage
              );
            });
          } else {
            this.castsArray = [];
          }
        } else {
          this.directorsArray = [];
          this.writersArray = [];
          this.castsArray = [];
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
      } catch (error) {
        console.log(error);
      }
    },
    uploadPoster() {
      //trigger the upload file form
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      //open the file upload form
      input.onchange = () => {
        const filePoster = input.files[0];
        Admin.uploadImage(this.movieId, filePoster, null).then(
          (response) => {
            this.movieObj.posterImage = response.data.posterImage;
            this.modalTitle = "Success!";
            this.modalTypeAction = "";
            this.modalType = "";
            this.modalMessage = "Poster Image has been added successfully!";
            this.modalStatus = "success";
            this.isModalOpen = true;
          },
          (error) => {
            this.modalTitle = "Error";
            this.modalTypeAction = "";
            this.modalType = "";
            this.modalMessage =
              "We couldn't perfom the operation. Try again later";
            this.modalStatus = "error";
            this.isModalOpen = true;
            console.log(error);
          }
        );
      };
      input.click();
    },
    uploadTrailerImage() {
      //trigger the upload file form
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      //open the file upload form
      input.onchange = () => {
        const fileTrailer = input.files[0];
        Admin.uploadImage(this.movieId, null, fileTrailer).then(
          (response) => {
            this.movieObj.trailerImage = response.data.trailerImage;
            this.modalTitle = "Success!";
            this.modalTypeAction = "";
            this.modalType = "";
            this.modalMessage = "Trailer Image has been added successfully!";
            this.modalStatus = "success";
            this.isModalOpen = true;
          },
          (error) => {
            this.modalTitle = "Error";
            this.modalTypeAction = "";
            this.modalType = "";
            this.modalMessage =
              "We couldn't perfom the operation. Try again later";
            this.modalStatus = "error";
            this.isModalOpen = true;
            console.log(error);
          }
        );
      };
      input.click();
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async remove(crewId) {
      try {
        await Admin.removeCrew(crewId, this.movieId);
        this.modalTitle = "Success!";
        this.modalTypeAction = "";
        this.modalType = "";
        this.modalMessage =
          "Crew Member has been remove from the movie successfully!";
        this.modalStatus = "success";
        this.isModalOpen = true;
        this.getAmovie();
      } catch (error) {
        console.log("error is " + error);
      }
    },
    deleteMovieConfirmation() {
      this.modalType = "confirmation";
      this.modalTypeAction = "deleteMovie";
      this.modalTitle = "Warning";
      this.modalMessage = "Are you sure you want to delete the movie?";
      this.modalStatus = "confirmation";
      this.isModalOpen = true;
      //const response = Admin.deleteaMovie(id);
      //console.log(response);
    },
    deleteMovie() {
      Admin.deleteaMovie(this.movieId).then(
        (response) => {
          console.log(response);
          this.$router.push("/admin/movies");
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  computed: {
    loggedIn() {
      var loggedInValue = this.$store.state.auth.status.loggedIn;
      return loggedInValue;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser != null)
        return this.$store.state.auth.user.roles.includes("ROLE_ADMIN");
      else return false;
    },
  },
  created() {
    if (this.loggedIn && this.isAdmin) {
      this.movieId = this.$route.params.id;
      this.getAmovie();
    } else {
      this.$router.push("/error");
    }
  },
};
</script>
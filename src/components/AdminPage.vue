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
          v-if="modalTypeAction == 'deleteMovies'"
          class="modal-confirm"
          @click="deleteAll()"
        >
          Confirm
        </button>
        <button
          v-if="modalTypeAction == 'deleteCrews'"
          class="modal-confirm"
          @click="deleteAllCrew()"
        >
          Confirm
        </button>
        <button class="modal-cancel" @click="closeModal">Cancel</button>
      </div>
    </modal>
  </transition>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>Movie Listing (ADMIN)</h1>
            <ul class="breadcumb">
              <li class="active"><a href="#">Home</a></li>
              <li><span class="ion-ios-arrow-right"></span> movie admin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single-admin">
    <div class="container">
      <div class="row ipad-width" style="display: flex; gap: 10px">
        <a class="redbtn" @click="addMovie">add Movie</a>
        <a class="redbtn" @click="deleteAllMovieConfirmation">Remove All Movies</a>
        <a class="redbtn" @click="addCrew">Add a Crew Member</a>
        <a class="redbtn" @click="getAllCrew">Get all Crew Member</a>
        <a class="redbtn" @click="deleteAllCrewConfirmation">Delete all Crew Member</a>
      </div>
    </div>
  </div>

  <div class="page-single-admin movie_list_admin">
    <div class="movies-search">
      <div class="container">
        <div
          class="row user-pro"
          style="margin-bottom: 0; padding: 30px 0px 30px 0px"
        >
          <div class="top-search">
            <input
              type="text"
              placeholder="Search for a movie, TV Show that you are looking for"
              v-model="movieTitleInput"
              @input="searchMovieByTitle()"
            />
          </div>
        </div>
        <div class="row ipad-width2">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="topbar-filter">
              <p>Found <span>{{totalElements}} movies</span> in total</p>
            </div>
            <!-- movie details here -->
            <div
              class="movie-item-style-2"
              v-for="movie in result.content"
              :key="movie.id"
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
              <div class="mv-item-infor">
                <h6>
                  <a href="moviesingle.html"
                    ><router-link :to="'/admin/movies/' + movie.id"
                      >{{ movie.title }}
                    </router-link>
                    <span
                      >({{
                        new Date(movie.releaseDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                          }
                        )
                      }})</span
                    ></a
                  >
                </h6>
                <p class="describe">{{ movie.synopsis }}</p>
                <p class="run-time">
                  {{ movie.length }} min
                  <span>{{ movie.classificationRating }}</span>
                  <span>{{
                    new Date(movie.releaseDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  }}</span>
                </p>
                <p>Director: <a href="#">Joss Whedon</a></p>
                <p>
                  Stars: <a href="#">Robert Downey Jr.,</a>
                  <a href="#">Chris Evans,</a> <a href="#"> Chris Hemsworth</a>
                </p>
              </div>
            </div>
            <!--end movie details here -->
            <div v-if = "page!= -1" class="topbar-filter">
            <label>Results per page:</label>
            <select v-model="size" >
              <option value="5">5 Movies</option>
              <option value="10">10 Movies</option>
            </select>
            <div v-if="totalPages <= 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a
                v-for="n in totalPages"
                :key="n"
                :class="{ active: n === page + 1 }"
                @click="getAllMovies(n - 1, size)"
              >
                {{ n }}
              </a>
              <a v-if="page<totalPages-1" @click="getAllMovies(page+1,size)"><i class="ion-arrow-right-b"></i></a>
            </div>
            <div v-if="totalPages > 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a
                v-for="n in 8"
                :key="n"
                :class="{ active: n === page + 1 }"
                @click="getAllMovies(n - 1, size)"
                >{{ n }}</a
              >
              <a>...</a>
              <a
                v-for="n in 2"
                :key="n"
                @click="getAllMovies(n - 1, size)"
                >{{ totalPages - 2 + n }}</a
              >
              <a v-if="page<totalPages-1"  @click="getAllMovies(page+1,size)"><i class="ion-arrow-right-b"></i></a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
  <script>
import Admin from "../services/admin.service.js";
import MovieService from "@/services/movie.service.js";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "AdminPage",
  components:{
    Modal
  },
  data() {
    return {
      result: {},
      resultCrew: {},
      page:0,
      size:5,
      totalPages: "",
      totalElements: 0,
      numberElements: 0,
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType: "",
      modalTypeAction: "",
    };
  },
  methods: {
    async getAllMovies(page,size) {
      this.page = page;
      const response = await Admin.getMovies(page,size);
      this.result = response;
      this.totalPages = response.totalPages;
      this.numberElements = response.numberOfElements;
      this.totalElements = response.totalElements;
    },
    addMovie() {
      this.$router.push("/admin/movies/new");
    },
    deleteMovie(id) {
      const response = Admin.deleteaMovie(id);
      this.result = response;
    },
    deleteAllMovieConfirmation(){
      this.modalType = "confirmation";
      this.modalTypeAction = "deleteMovies";
      this.modalTitle = "Warning";
      this.modalMessage =
        "Are you sure you want to delete ALL movies?";
      this.modalStatus = "confirmation";
      this.isModalOpen = true;
    },
    async deleteAll() {
      await Admin.deleteAllMovies();
      this.$router.push("/admin/movies");
      this.isModalOpen=false;
    },
    addCrew() {
      this.$router.push("/admin/crews/new");
    },
    getAllCrew() {
      this.$router.push({ name: "getAllCrew" });
    },
    deleteCrew(id) {
      const response = Admin.deleteCrew(id);
      this.resultCrew = response;
    },
    async deleteAllCrew() {
      await Admin.deleteAllCrew();
      this.$router.push("/admin/movies");
      this.isModalOpen=false;
    },
    deleteAllCrewConfirmation(){
      this.modalType = "confirmation";
      this.modalTypeAction = "deleteCrews";
      this.modalTitle = "Warning";
      this.modalMessage =
        "Are you sure you want to delete ALL crew members?";
      this.modalStatus = "confirmation";
      this.isModalOpen = true;
    },
    async searchMovieByTitle() {
      if (this.movieTitleInput != "") {
        const response = await MovieService.getMoviesByTitle(
          this.movieTitleInput,
          -1,
          null
        );

        if (response.content != null) {
          this.result = response;
          this.totalElements = response.totalElements;
          this.page = -1;
        } else {
          this.page = -1;
          this.result = [];
          this.totalPages = "";
          this.numberElements = 0;
          this.totalElements = 0;
        }
      } else {
        this.page = -1;
        this.result = [];
        this.totalPages = "";
        this.numberElements = 0;
        this.totalElements = 0;
      }
    },
    closeModal(){
      this.isModalOpen=false;
    }
  },
  created(){
    this.getAllMovies(this.page,this.size);
  },

  watch:{
    size(newValue, oldValue){
      console.log(oldValue);
      this.page = 0;
      this.getAllMovies(this.page,newValue);
    }
  }
};
</script>
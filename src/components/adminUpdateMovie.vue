<template>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>My Watchlist</h1>
            <ul class="breadcumb">
              <!--- <li class="active"><a href="#">User</a></li> -->
              <li class="active">
                <router-link to="/admin/movies">User</router-link>
              </li>
              <li><span class="ion-ios-arrow-right"></span> Watchlist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0; padding-bottom: 15px">
    <div class="container">
      <div class="form-style-1 user-pro">
        <form @submit.prevent="updateMovie()" class="user">
          <div class="row">
            <div class="col-md-6 form-it">
              <label>Movie Title</label>
              <input
                type="text"
                placeholder="edwardkennedy"
                v-model="model.title"
                id="title"
                required
              />
            </div>
            <div class="col-md-6 form-it">
              <label>MovieGenre</label>
              <input
                type="text"
                placeholder="edward@kennedy.com"
                v-model="model.genre"
                id="genre"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>Release Date</label>
              <input
                type="text"
                placeholder="Edward "
                v-model="model.releaseDate"
                id="releaseDate"
                required
              />
            </div>
            <div class="col-md-6 form-it">
              <label>Length</label>
              <input
                type="text"
                placeholder="Kennedy"
                v-model="model.length"
                id="length"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>Synopsis</label>
              <input
                type="text"
                placeholder="Kennedy"
                v-model="model.synopsis"
                id="synopsis"
                required
              />
            </div>
            <div class="col-md-6 form-it">
              <label>classificationRating</label>
              <input
                type="text"
                placeholder="Kennedy"
                v-model="model.classificationRating"
                id="classificationRating"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>MovieTrailerLink</label>
              <input
                type="text"
                placeholder="Kennedy"
                v-model="model.movieTrailerLink"
                id="movieTrailerLink"
                required
              />
            </div>
            <div class="col-md-6 form-it">
              <label>IsInTheaters</label>
              <select v-model="model.isInTheaters" id="isInTheaters" required>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>IsInStreaming</label>
              <select v-model="model.isInStreaming" id="isInStreaming" required>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div class="col-md-6 form-it">
              <label>IsComingSoon</label>
              <select v-model="model.isComingSoon" id="isComingSoon" required>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>WhereToWatch</label>
              <input
                type="text"
                placeholder="Kennedy"
                v-model="model.whereToWatch"
                id="whereToWatch"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <input class="submit" type="submit" value="Update" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Admin from "../services/admin.service.js";
export default {
  name: "adminUpdateMovie",
  data() {
    return {
      object: {},
      model: {
        title: "",
        genre: "",
        releaseDate: "",
        length: "",
        synopsis: "",
        classificationRating: "",
        movieTrailerLink: "",
        isInTheaters: "",
        isInStreaming: "",
        isComingSoon: "",
        whereToWatch: "",
      },
      result: "",
      posterImage: null,
      trailerImage: null,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async getAmovie() {
      try {
        const response = await Admin.getMovieById(this.id);
        this.model = response;

        if (response.releaseDate == null) {
          this.model.releaseDate(null);
        } else {
          let date = new Date(response.releaseDate);
          let formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          this.model.releaseDate = formattedDate;
        }
      } catch (error) {
        this.object = "ERROR";
      }
    },

    getPoster(event) {
      this.posterImage = event.target.files[0];
    },
    getPoster2(event) {
      this.trailerImage = event.target.files[0];
    },

    async updateMovie() {
      try {
        if (this.model.releaseDate != "") {
          //validate if it's in the right format
          const dateRegex =
            /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
          const isValid = dateRegex.test(this.model.releaseDate);

          if (isValid) {
            const date = new Date(this.model.releaseDate);
            const formattedDate = date.toISOString();
            this.model.releaseDate = formattedDate;
          } else {
            console.log("not valid");
            return;
          }
        } else {
          this.model.releaseDate = null;
          return
        }

        await Admin.updateMovie(this.id, this.model);

        this.getAmovie();

        
      } catch (error) {
        this.result = "ERROR";
      }
    },
    deleteMovie(id) {
      const response = Admin.deleteaMovie(id);
      this.result = response;
    },
  },
  mounted() {
    this.getAmovie();
    this.result = "TEST";
  },
};
</script>
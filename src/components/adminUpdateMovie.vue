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
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>MOVIE UPDATE</h1>
            <ul class="breadcumb">
              <!--- <li class="active"><a href="#">User</a></li> -->
              <li class="active">
                <router-link to="/admin/movies">Admin</router-link>
              </li>
              <li><span class="ion-ios-arrow-right"></span> Movie</li>
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
                placeholder="Movie Title"
                v-model="model.title"
                id="title"
                required
              />
            </div>
            <div class="col-md-6 form-it">
              <label>Movie Genre</label>
              <input
                type="text"
                placeholder="Separated by comas. E.g. 'Crime,Action,Science Fiction'"
                v-model="model.genre"
                id="genre"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>Release Date (MM/DD/YYYY)</label>
              <input
                type="text"
                placeholder="Release Date"
                v-model="model.releaseDate"
                id="releaseDate"
                required
              />
            </div>
            <div class="col-md-6 form-it">
              <label>Length</label>
              <input
                type="text"
                placeholder="Lenght in minutes"
                v-model="model.length"
                id="length"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 form-it">
              <label>Synopsis</label>
              <textarea
                type="text"
                placeholder="Synopsis"
                v-model="model.synopsis"
                id="synopsis"
                required
                rows="5"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>Classification Rating</label>
              <input
                type="text"
                placeholder="Classification Rating (PG-15)"
                v-model="model.classificationRating"
                id="classificationRating"
                required
              />
            </div>
            <div class="col-md-6 form-it">
              <label>Movie Trailer URL</label>
              <input
                type="text"
                placeholder="Movie Trailer URL"
                v-model="model.movieTrailerLink"
                id="movieTrailerLink"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>Is In Theaters</label>
              <select v-model="model.isInTheaters" id="isInTheaters" required>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div class="col-md-6 form-it">
              <label>Is In Streaming</label>
              <select v-model="model.isInStreaming" id="isInStreaming" required>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 form-it">
              <label>Is Coming Soon</label>
              <select v-model="model.isComingSoon" id="isComingSoon" required>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div class="col-md-6 form-it">
              <label>Where To Watch</label>
              <input
                type="text"
                placeholder="Separated by comas (e.g. 'Netflix,Amazon Prime,Disney+')"
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

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "adminUpdateMovie",
  components: {
    Modal,
  },
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
      posterImage: null,
      trailerImage: null,
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
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
        console.log(error);
      }
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
          return;
        }

        await Admin.updateMovie(this.id, this.model);

        this.modalTitle = "Success!";
        this.modalTypeAction = "";
        this.modalType = "";
        this.modalMessage = "Movie information has been updated successfully!";
        this.modalStatus = "success";
        this.isModalOpen = true;
        this.getAmovie();
      } catch (error) {
        console.log(error);
      }
    },
    closeModal(){
      this.isModalOpen = false;
    }
  },
  mounted() {
    this.getAmovie();
  },
};
</script>
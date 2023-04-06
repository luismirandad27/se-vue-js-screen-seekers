<template>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>New Movie</h1>
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
      <form @submit.prevent="saveMovie()" class="user">
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
              placeholder="Release Date "
              v-model="model.releaseDate"
              id="releaseDate"
              required
            />
          </div>
          <div class="col-md-6 form-it">
            <label>Length</label>
            <input
              type="number"
              placeholder="Duration in minutes"
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
              placeholder="Insert a synopsis"
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
              placeholder="Trailer Video URL"
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
            <input class="submit" type="submit" value="save" />
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
  name: "AdminAddMovie",
  data() {
    return {
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
      object: {},
    };
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
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    saveMovie() {
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
		  
        }

        //this makes the whereToWatch an array, since array is the expected input by the movie controller for this property
        let whereToWatchInput = this.model.whereToWatch;
        let whereToWatchArray = [];
        whereToWatchArray.push(whereToWatchInput);
        this.model.whereToWatch = whereToWatchArray;

        Admin.saveMovie(this.model).then(
          (response) =>{
            //move to the movie detail
            this.$router.push("/admin/movies/"+response.data.id);
          },
          (error) =>{
            console.log(error);
          }
        );

      } catch (error) {
        this.result = "ERROR";
      }
    }
  },
  created(){
    if(!this.loggedIn || !this.isAdmin){
      this.$router.push("/error");
    }
  }
};
</script>
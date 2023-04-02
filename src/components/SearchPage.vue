<template>
  <div>
    <br><br><br><br>
    <div>
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
        <input v-model="searchTerm" type="text" id="search-term" name="search-term">
        <br><br>
        <button type="submit">Search</button>

        <ul>
          <li v-for="movie in movies" :key="movie.id">
            {{ movie }}
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>
  
<script>
import MovieService from "@/services/movie.service.js";
// import Movie from "@/models/movie";

export default {
  data() {
    return {
      searchType: "title",
      searchTerm: "",
      movies: [],
    };
  },
  methods: {
    handleSubmit() {
      switch (this.searchType) {
        case "title":
          this.searchTitle(this.searchTerm);
          break;
        case "genre":
          this.searchGenre(this.searchTerm);
          break;
        case "year":
          this.searchReleaseYear(this.searchTerm);
          break;
        default:
          console.log("Invalid search type");
          alert("Not found! Please try again.");
          break;
      }
    },

    searchTitle() {
      console.log(this.searchTerm);
      MovieService.getMoviesByTitle(this.searchTerm).then(
        (response) => {
          console.log(response)
          this.movies = response;
        }
      )
        .catch(error => {
          this.searchTerm = "";
          console.log(error.response.data);
        })
    }
    ,
    searchGenre() {
      console.log(this.searchTerm);
      MovieService.getMoviesByGenre(this.searchTerm).then(
        (response) => {
          console.log(response)
          this.movies = response;
        }
      )
        .catch(error => {
          this.searchTerm = "";
          console.log(error.response.data);
        })
    },
    searchReleaseYear() {
      console.log(this.searchTerm);
      MovieService.getMoviesByYear(this.searchTerm).then(
        (response) => {
          console.log(response)
          this.movies = response;
        }
      )
        .catch(error => {
          this.searchTerm = "";
          console.log(error.response.data);
        })
    },
  },
      mounted() {
      this.searchTerm = "";
    },
    watch: {
    searchType: function () {
      this.searchTerm = "";
    },
  },
};

</script>
  
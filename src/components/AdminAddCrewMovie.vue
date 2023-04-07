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
  <div class="slider movie-items">
    <div class="container">
      <!-- <h1>This is the admin page, Adding a Crew</h1> -->
      <div class="container">
        <form @submit.prevent="sendForm">
          <div class="form-style-1 user-pro">
            <div class="user">
              <h4>
                Add Crew To Moive {{ object.title }}
                <br />
                <!-- {{ result }} -->
              </h4>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Crew</label>
                  <select name="crewName" id="crewName" v-model="crewId">
                    <option
                      v-for="crew in crewNames"
                      :key="crew.id"
                      :value="crew.id"
                    >
                      {{ crew.firstName }} {{ crew.lastName }}
                    </option>
                  </select>
                  <!-- <input type="text" placeholder="edwardkennedy"> -->
                </div>
                <div class="col-md-6 form-it">
                  <label>Movie Role</label>
                  <select v-model="model.movieRole">
                    <option value="Cast">Cast</option>
                    <option value="Director">Director</option>
                    <option value="Writer">Writer</option>
                  </select>
                </div>
                <div class="col-md-6 form-it">
                  <label>Character Name</label>
                  <input
                    type="text"
                    placeholder="E.g Ironman"
                    v-model="model.characterName"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <input class="submit" type="submit" value="save" />
              </div>
            </div>
          </div>
        </form>
        <div>
          <!-- <button type="submit" @click="saveCrew">SAVE Crew</button> -->
        </div>
        <div>
          <!-- {{ result }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Admin from "../services/admin.service.js";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "AdminAddCrewMovie",
  components:{
    Modal
  },
  data() {
    return {
      object: {},
      crewNames: {},
      crewId: "",
      model: {
        movieRole: "",
        characterName: "",
      },
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
    };
  },
  methods: {
    async getAmovie() {
      try {
        const response = await Admin.getMovieById(this.id);

        this.object = response;
        console.log(response);
      } catch (error) {
        this.object = "ERROR";
      }
    },
    async getAllCew() {
      // this.crewNames.push(Admin.getCrews());
      const response = await Admin.getCrews();
      
      if (response != ""){
        this.crewNames = response.content;
      }
    },
    async sendForm() {
      try {
        await Admin.addCrewMemberToMovie(this.crewId, this.model, this.id);
        this.$router.push("/admin/movies/" + this.id);
      } catch (error) {
          this.modalTitle = "Error";
          this.modalMessage =
          "We couldn't perform the action. It's possible that you are trying to add member already added";
          this.modalStatus = "error";
          this.isModalOpen = true;
        console.log("Error is " + error);
      }
    },
    closeModal(){
      this.isModalOpen=false;
    }
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
  mounted() {
    if(this.loggedIn && this.isAdmin){
      this.getAmovie();
      this.getAllCew();
    }else{
      this.$router.push("/error");
    }
    
  },
};
</script>

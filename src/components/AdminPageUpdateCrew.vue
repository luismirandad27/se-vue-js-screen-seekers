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
            <h1>CREW UPDATE</h1>
            <ul class="breadcumb">
              <!--- <li class="active"><a href="#">User</a></li> -->
              <li class="active">
                <router-link to="/admin/movies">Admin</router-link>
              </li>
              <li><span class="ion-ios-arrow-right"></span> Crew</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0; padding-bottom: 15px">
    <div class="container">
        <form @submit.prevent="UpdateCrew()">
          <div class="form-style-1 user-pro">
            <div class="user">
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    v-model="model.firstName"
                    id="firstName"
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    v-model="model.lastName"
                    id="lastName"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Date of Birth (MM/DD/YYYY)</label>
                  <input
                    type="text"
                    placeholder="Date of Birth"
                    v-model="model.dateOfBirth"
                    id="dateOfBirth"
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Nationality</label>
                  <input
                    type="text"
                    placeholder="Nationality"
                    v-model="model.nationality"
                    id="nationality"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Award</label>
                  <input
                    type="text"
                    placeholder="Award(s)"
                    v-model="model.award"
                    id="award"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2">
                <input
                  class="submit"
                  type="submit"
                  value="Update"
                  @click="UpdateCrew"
                />
              </div>
            </div>
          </div>
        </form>
        <div>
          <!-- <button type="submit" @click="saveCrew">SAVE Crew</button> -->
        </div>
      </div>
    </div>

</template>
<script>
import Admin from "../services/admin.service.js";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "AdminPageUpdateCrew",
  components: {
    Modal,
  },
  data() {
    return {
      model: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        award: "",
        createdAt: "",
      },
      result: {},
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
    };
  },
  methods: {
    async UpdateCrew() {
        if (this.model.dateOfBirth != "") {
          //validate if it's in the right format
          const dateRegex =
            /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
          const isValid = dateRegex.test(this.model.dateOfBirth);

          if (isValid) {
            const date = new Date(this.model.dateOfBirth);
            const formattedDate = date.toISOString();
            this.model.dateOfBirth = formattedDate;
          } else {
            console.log("not valid");
            return;
          }
        } else {
          this.model.dateOfBirth = null;
          return;
        }
        
        await Admin.UpdateCrew(this.id, this.model);
        this.modalTitle = "Success!";
        this.modalTypeAction = "";
        this.modalType = "";
        this.modalMessage = "Crew information has been updated successfully!";
        this.modalStatus = "success";
        this.isModalOpen = true;
        this.getACrew();

      
    },
    closeModal(){
        this.isModalOpen = false;
    },
    async getACrew() {
      try {
        const response = await Admin.getCrewById(this.id);
        this.model = response;
        if (response.dateOfBirth == null) {
          this.model.dateOfBirth(null);
        } else {
          let date = new Date(response.dateOfBirth);
          let formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          this.model.dateOfBirth = formattedDate;
        }
        
      } catch (error) {
        this.object = "ERROR";
      }
    },
    deleteCrew() {
      const response = Admin.deleteCrew(this.id);
      this.resultCrew = response;
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
    id () {
      return this.$route.params.id
    }
  },
  mounted() {
    if(this.loggedIn && this.isAdmin){
      this.getACrew();
    }else{
      this.$router.push("/error");
    }
  },
};
</script>
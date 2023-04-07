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
  <div class="hero user-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-12 col-xs-12"></div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div class="hero-ct">
            <h1>
              {{
                fullName == null
                ? "PLEASE COMPLETE YOUR USER INFORMATION"
                : fullName
              }}
            </h1>
            <ul class="breadcumb">
              <li class="active">
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <span class="ion-ios-arrow-right"></span>Profile
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single">
    <div class="container">
      <div class="row ipad-width">
        <div class="col-md-3 col-sm-12 col-xs-12">
          <div class="user-information">
            <div class="user-img">
              <a v-if="user.profileImage != null" href="#"><img :src="$USER_PHOTOS_URL + '/' + user.profileImage"
                  alt="No User Profile" /><br /></a>
              <a v-if="user.profileImage == null" href="#"><img src="../../public/images/user-no-name.jpg"
                  alt="No User Profile" /><br /></a>
              
              <a class="redbtn" @click="updateProfileImage">Change avatar</a>
            </div>
            <div class="user-fav">
              <p>Account Details</p>
              <ul>
                <li class="active">
                  <a @click="activeTab = 1">Profile</a>
                </li>
                <li v-if="!isAdmin">
                  <a @click="activeTab = 2">Recommendations</a>
                </li>
                <li v-if="!isAdmin">
                  <a @click="activeTab = 3">Rated Movies</a>
                </li>
                <li v-if="!isAdmin">
                  <a @click="activeTab = 4">My Watchlist</a>
                </li>
              </ul>
            </div>
            <div class="user-fav">
              <p>Others</p>
              <ul>
                <li><a @click="logout()">Log out</a></li>
              </ul>
            </div>
          </div>
        </div>
        <UserProfileForm v-if="activeTab == 1"/>
        <UserProfileRecommendations v-if="activeTab == 2"/>
        <UserProfileRatings v-if="activeTab == 3"/>
        <UserProfileWatchlists v-if="activeTab == 4"/>
      </div>
    </div>
  </div>
</template>
<script>
import UserProfileForm from '@/components/UserProfileForm.vue'
import UserProfileRecommendations from '@/components/UserProfileRecommendations.vue'
import UserProfileWatchlists from '@/components/UserProfileWatchlists.vue'
import UserProfileRatings from '@/components/UserProfileRatings.vue'

import UserService from "@/services/user.service.js";
import User from "@/models/user";
import Modal from '@/components/Modal.vue'

export default {
  name: "UserProfilePage",
  components:{
    UserProfileForm,
    UserProfileRecommendations,
    UserProfileWatchlists,
    UserProfileRatings,
    Modal
  },
  data(){
    return {
      user: new User(),
      userId: 0,
      fullName: null,
      oldPassword: null,
      newPassword: null,
      newPassword2: null,
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType:"",
      modalTypeAction:"",
      activeTab: 1
    };
  },
  methods:{
    getUserProfileInfo() {
      this.userId = this.$store.state.auth.user.id;
      UserService.getUserProfile(this.userId).then(
        (response) => {
          const userData = response.data;
          this.user = new User(
            userData.username,
            userData.email,
            userData.password,
            userData.profileImage,
          );
          this.user.setFirstName(userData.firstName);
          this.user.setLastName(userData.lastName);

          if (this.user.firstName != null && this.user.lastName != null) {
            this.fullName =
              this.user.firstName + " " + this.user.lastName + "'s Profile";
          }

          if (userData.dateOfBirth == null) {
            this.user.setDateOfBirth(null);
          } else {
            let date = new Date(userData.dateOfBirth);
            let formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            this.user.setDateOfBirth(formattedDate);
          }

          this.user.setPhone(userData.phone);
          this.user.setAddress(userData.address);
          this.user.setCity(userData.city);
          this.user.setProvince(userData.province);
          this.user.setCountry(userData.country);
          this.user.setProfileImage(userData.profileImage);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    updateProfileImage() {
      //trigger the upload file form
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      //open the file upload form
      input.onchange = () => {
        const file = input.files[0];
        UserService.updateUserProfileImage(this.userId, file).then(
          (response) => {
            this.user.profileImage = response.profileImage;
            this.modalTitle = "Success!";
            this.modalMessage = "User avatar has been changed successfully!";
            this.modalStatus = "success";
            this.isModalOpen = true;
          },
          (error) => {
            this.modalTitle = "Error";
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
    closeModal(){
      this.isModalOpen = false;
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
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
  },
  created() {
    if (this.loggedIn){
      document.title = 'SS - My Account';
      this.activeTab = this.$route.query.activeTab || 1;
      this.getUserProfileInfo()
    }else{
      this.$router.push("/error");
    }
    
  },
}
</script>


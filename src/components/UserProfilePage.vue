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
              <li class="active"><a href="#">Home</a></li>
              <li><span class="ion-ios-arrow-right"></span>Profile</li>
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
              <a v-if="user.profileImage == null" href="#"
                ><img
                  :src="$USER_PHOTOS_URL + '/user-photos/user-no-name.png'"
                  alt="No User Profile" /><br
              /></a>
              <a v-if="user.profileImage != null" href="#"
                ><img
                  :src="$USER_PHOTOS_URL + user.profileImage"
                  alt="No User Profile" /><br
              /></a>
              <a href="#" class="redbtn" @click="updateProfileImage"
                >Change avatar</a
              >
            </div>
            <div class="user-fav">
              <p>Account Details</p>
              <ul>
                <li class="active"><a href="userprofile.html">Profile</a></li>
                <li><a href="userfavoritelist.html">Favorite movies</a></li>
                <li><a href="userrate.html">Rated movies</a></li>
              </ul>
            </div>
            <div class="user-fav">
              <p>Others</p>
              <ul>
                <li><a href="#">Change password</a></li>
                <li><a href="#">Log out</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div class="form-style-1 user-pro" action="#">
            <form @submit.prevent="handleUpdateProfile">
              <h4>01. Profile details</h4>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="username"
                    v-model="user.username"
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Email Address</label>
                  <input
                    type="text"
                    placeholder="edward@kennedy.com"
                    v-model="user.email"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Your First Name"
                    v-model="user.firstName"
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Your Last Name"
                    v-model="user.lastName"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Date Of Birth</label>
                  <input
                    type="text"
                    placeholder="Your Date of Birth"
                    v-model="user.dateOfBirth"
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    v-model="user.phone"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Your Address"
                    v-model="user.address"
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Your City"
                    v-model="user.city"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Province</label>
                  <input
                    type="text"
                    placeholder="Your Province"
                    v-model="user.province"
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Your Country"
                    v-model="user.country"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-2 form-it">
                  <input class="submit" type="submit" value="save" />
                </div>
              </div>
            </form>
            <form @submit="handleChangePassword">
              <div class="row">
				<h4>02. Change password</h4>
                <div class="col-md-6 form-it">
                  <label>Old Password</label>
                  <input
                    type="password"
                    placeholder="**********"
                    v-model="oldPassword"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>New Password</label>
                  <input
                    type="text"
                    placeholder="***************"
                    v-model="newPassword"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Confirm New Password</label>
                  <input
                    type="text"
                    placeholder="***************"
                    v-model="newPassword2"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <input class="submit" type="submit" value="change" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import UserService from "@/services/user.service.js";
import User from "@/models/user";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "UserProfilePage",
  components: {
    UserService,
    Modal,
  },
  data() {
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
    };
  },
  methods: {
    getUserProfileInfo() {
      this.userId = this.$store.state.auth.user.id;
      UserService.getUserProfile(this.userId).then(
        (response) => {
          const userData = response.data;
          this.user = new User(
            userData.username,
            userData.email,
            userData.password
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
    handleUpdateProfile(e) {
      e.preventDefault();
      const inputElements = e.target.elements;
      const username = inputElements[0].value;
      const email = inputElements[1].value;

      const updatedUser = new User(username, email, null);

      updatedUser.setFirstName(inputElements[2].value);
      updatedUser.setLastName(inputElements[3].value);

      const dateString = inputElements[4].value;

      if (dateString != "") {
        const date = new Date(dateString);
        const formattedDate = date.toISOString();
        updatedUser.setDateOfBirth(formattedDate);
      } else {
        updatedUser.setDateOfBirth(null);
      }

      updatedUser.setPhone(inputElements[5].value);
      updatedUser.setAddress(inputElements[6].value);
      updatedUser.setCity(inputElements[7].value);
      updatedUser.setProvince(inputElements[8].value);
      updatedUser.setCountry(inputElements[9].value);

      UserService.updateUserProfile(this.userId, updatedUser).then(
        () => {
          this.getUserProfileInfo();
          this.modalTitle = "Success!";
          this.modalMessage = "User information has been changed successfully!";
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
    },
    handleChangePassword(e) {
      e.preventDefault();
      //first validate if the newPassword and newPassword2 are equal
      if (this.newPassword == this.newPassword2) {
        UserService.changeUserPassword(
          this.userId,
          this.oldPassword,
          this.newPassword
        ).then(
          (response) => {
            this.modalTitle = "Success!";
            this.modalMessage =
              "User password has been changed successfully!";
            this.modalStatus = "success";
            this.isModalOpen = true;
			this.oldPassword = "";
			this.newPassword = "";
			this.newPassword2 = "";
            console.log(response);
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
      } else {
        console.log("New passwords don't match!");
      }
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  created() {
    this.getUserProfileInfo();
  },
};
</script>


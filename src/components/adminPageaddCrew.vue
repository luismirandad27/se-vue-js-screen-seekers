<template>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>NEW CREW</h1>
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
        <form @submit.prevent="saveCrew">
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
                    required
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    v-model="model.lastName"
                    id="lastName"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Date Of Birth (MM/DD/YYYY)</label>
                  <input
                    type="text"
                    placeholder="Date of Birth"
                    v-model="model.dateOfBirth"
                    id="dateOfBirth"
                    required
                  />
                </div>
                <div class="col-md-6 form-it">
                  <label>Nationality</label>
                  <input
                    type="text"
                    placeholder="Nationality"
                    v-model="model.nationality"
                    id="nationality"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-it">
                  <label>Award</label>
                  <input
                    type="text"
                    placeholder="Any Award"
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
                  value="save"
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
import Admin from '../services/admin.service.js'

export default {
  name: "AdminPageAddCrew",
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
    };
  },
  methods: {
    async saveCrew() {
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
          return;
        }
      } else {
        this.model.dateOfBirth = null;
        return;
      }

      await Admin.saveCrew(this.model);
      
      this.$router.push("/admin/crews")

    },
  },
};
</script>
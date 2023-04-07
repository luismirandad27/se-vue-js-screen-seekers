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
            <h1>celebrity listing - list</h1>
            <ul class="breadcumb">
              <li class="active"><router-link to="/admin/movies">Admin</router-link></li>
              <li>
                <span class="ion-ios-arrow-right"></span> celebrity listing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- celebrity list section-->
  <div class="page-single">
    <div class="container">
      <div class="row ipad-width2">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div class="topbar-filter">
            <p class="pad-change">
              Found <span>{{ totalElements }} celebrities</span> in total
            </p>
          </div>
          <div class="row">
            <div class="col-md-12" v-for="(r, i) in resultCrew" :key="i">
              <div class="ceb-item-style-2">
                <img src="../../public/images/crew-no-name.jpg" alt="" height="141" width="130"/>
                <div class="ceb-infor">
                  <h2>
                    <a href="#"
                      ><router-link :to="'/admin/crews/update/' + r.id">{{
                        r.firstName
                      }} {{ r.lastName }}</router-link></a
                    >
                  </h2>
                  <p>
                    Nationality: {{ r.nationality }}
                    <br />
                    Awards : {{ r.award }}
                  </p>
                  <a @click="deleteCrew(r.id)" class="redbtn">Delete</a>
                </div>
              </div>
            </div>
          </div>
          <div v-if = "page!= -1" class="topbar-filter">
            <label>Results per page:</label>
            <select v-model="size">
              <option value="5">5 Crew Members</option>
              <option value="10">10 Crew Members</option>
            </select>
            <div v-if="totalPages <= 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a
                v-for="n in totalPages"
                :key="n"
                :class="{ active: n === page + 1 }"
                @click="getAllCrew(n - 1, size)"
              >
                {{ n }}
              </a>
              <a v-if="page<totalPages-1" @click="getAllCrew(page+1,size)"><i class="ion-arrow-right-b"></i></a>
            </div>
            <div v-if="totalPages > 10" class="pagination2">
              <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
              <a
                v-for="n in 8"
                :key="n"
                :class="{ active: n === page + 1 }"
                @click="getAllCrew(n - 1, size)"
                >{{ n }}</a
              >
              <a>...</a>
              <a
                v-for="n in 2"
                :key="n"
                @click="getAllCrew(n - 1, size)"
                >{{ totalPages - 2 + n }}</a
              >
              <a v-if="page<totalPages-1"  @click="getAllCrew(page+1,size)"><i class="ion-arrow-right-b"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end of celebrity list section-->
</template>

<script>
import Admin from "../services/admin.service.js";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "AdminGetAllCrew",
  components:{
    Modal,
  },
  data() {
    return {
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
    }
  },
  methods: {
    async getAllCrew(page,size) {
      this.page = page;
      const response = await Admin.getCrews(page,size);
      this.totalPages = response.totalPages;
      this.numberElements = response.numberOfElements;
      this.totalElements = response.totalElements;
      this.resultCrew = response.content;
    },
    async deleteCrew(id) {
      await Admin.deleteCrew(id);
      this.modalTitle = "Success!";
      this.modalTypeAction = "";
      this.modalType = "";
      this.modalMessage =
        "Crew Member deleted from the database!";
      this.modalStatus = "success";
      this.isModalOpen = true;
      this.page = 0;
      this.getAllCrew(this.page,this.size);  
      
    },
    closeModal(){
      this.isModalOpen = false;
      this.$router.push("/admin/crews");
    }
  },
  created() {
    if(this.loggedIn && this.isAdmin){
      this.getAllCrew(this.page,this.size);
    }else{
      this.$router.push("/error");
    }
    
  },
  watch:{
    size(newValue, oldValue){
      console.log(oldValue);
      this.page = 0;
      this.getAllCrew(this.page,newValue);
    }
  }
};
</script>
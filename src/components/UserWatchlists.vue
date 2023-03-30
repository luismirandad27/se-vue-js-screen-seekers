<template>
  <transition name="modal">
    <modal
      :title="modalTitle"
      :status="modalStatus"
      v-if="isModalOpen"
      @close="closeModal"
    >
      <div class="container">
        <form @submit.prevent="addNewWatchlist">
          <div class="row">
            <div class="col-md-6 col-md-offset-2">
              <input
                type="text"
                placeholder="Type the watchlist's name"
                v-model="watchlistNameInput"
                :required="true"
              />
            </div>
            <div class="col-md-2 modal-buttons">
              <input
                type="submit"
                class="modal-confirm"
                value="Create"
              />
            </div>
          </div>
        </form>
      </div>
    </modal>
  </transition>
  <div class="hero common-hero">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="hero-ct">
            <h1>My Watchlist</h1>
            <ul class="breadcumb">
              <li class="active"><a href="#">User</a></li>
              <li><span class="ion-ios-arrow-right"></span> Watchlist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0">
    <div class="container">
      <div class="row ipad-width2">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="row">
            <div class="col-md-4">
              <div class="ceb-item-style-2">
                <img src="../../public/images/uploads/ceb23.jpg" alt="" />
                <div class="ceb-infor">
                  <h2>
                    <a href="celebritysingle.html">My Favorite Action Movies</a>
                  </h2>
                  <span>13 movies</span>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="ceb-item-style-2">
                <img src="../../public/images/uploads/ceb21.jpg" alt="" />
                <div class="ceb-infor">
                  <h2><a href="celebritysingle.html">Marvel Movies</a></h2>
                  <span>10 movies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <a @click="openWatchlistModal()" class="item item-1 redbtn"
            >New Watchlist</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "UserWatchlists",
  components: {
    Modal,
  },
  data() {
    return {
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType: "",
      modalTypeAction: "",
      watchlistNameInput:""
    };
  },
  methods: {
    openWatchlistModal() {
      this.isModalOpen = true;
      this.modalTitle = "New Watchlist";
    },
    closeModal() {
      this.isModalOpen = false;
    },
    addNewWatchlist(){
      alert("Inserting "+this.watchlistNameInput);
      this.$router.push("/watchlistDetail");
    }
  },
};
</script>

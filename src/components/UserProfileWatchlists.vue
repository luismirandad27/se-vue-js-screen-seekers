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
            <div class="col-md-8 col-md-offset-1">
              <input
                type="text"
                placeholder="Watchlist's name (50 character max)"
                v-model="watchlistNameInput"
                maxlength="50"
                required="true"
              />
            </div>
            <div class="col-md-2 modal-buttons">
              <input type="submit" class="modal-confirm" value="Create" />
            </div>
          </div>
        </form>
      </div>
    </modal>
  </transition>
  <div class="col-md-9 col-sm-12 col-xs-12">
    <div class="row">
      <div class="col-md-12 user-hero-subtitle">
        <h1>My Watchlist</h1>
      </div>
    </div>
    <div class="row ipad-width2">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="row">
          <div
            v-for="(watchlist, index) in watchlists"
            :key="index"
            class="col-md-4"
          >
            <div class="ceb-item-style-2">
              <img src="../../public/images/watchlist-template.jpg" alt="" height="200" width="150" />
              <div class="ceb-infor">
                <h2>
                  <router-link :to="'watchlistDetail/' + watchlist.id">{{
                    watchlist.name
                  }}</router-link>
                </h2>
                <span>{{ watchlist.totalMovies }} Movies</span>
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
</template>
<script>
// importing Modal Vue Component
import Modal from "@/components/Modal.vue";
import WatchlistService from "@/services/watchlist.service.js";
import Watchlist from "@/models/watchlist";

export default {
  name: "UserProfileWatchlists",
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
      watchlistNameInput: "",
      watchlists: [],
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
    addNewWatchlist() {
      try {
        WatchlistService.createUserWatchlist(
          this.watchlistNameInput,
          this.userId
        ).then(
          (response) => {
            const newWatchlistId = response.id;
            this.$router.push("watchlistDetail/" + newWatchlistId);
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    getWatchlistsByUser() {
      try {
        WatchlistService.getWatchlistByUser(this.userId).then(
          (response) => {
            if (response != "") {
              this.watchlists = response.map((watchlistData) => {
                return new Watchlist(
                  watchlistData.id,
                  watchlistData.name,
                  watchlistData.watchlistDetails.length
                );
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log(error);
      }
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
  },
  created() {
    if (this.loggedIn && !this.isAdmin) {
      this.userId = this.$store.state.auth.user.id;
      this.getWatchlistsByUser();
    } else {
      this.$router.push("/error");
    }
  },
};
</script>

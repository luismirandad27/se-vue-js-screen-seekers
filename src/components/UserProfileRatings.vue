<template>
<transition name="modal">
    <modal :title="modalTitle" :status="modalStatus" v-if="isModalOpen" @close="closeModal">
      <p>{{ modalMessage }}</p>
      <div v-if="modalType == 'confirmation'" class="modal-buttons">
        <button v-if="modalTypeAction == 'deleteRating'" class="modal-confirm" @click="deleteRating()">Confirm</button>
        <button class="modal-cancel" @click="closeModal">Cancel</button>
      </div>
    </modal>
  </transition>
  <div class="col-md-9 col-sm-12 col-xs-12">
    <div class="row">
      <div class="col-md-12 user-hero-subtitle">
        <h1>Your Ratings</h1>
      </div>
    </div>
    <div class="row ipad-width2">
      <div class="topbar-filter">
        <p>
          Found <span>{{ totalElements }} rates</span> in total
        </p>
      </div>
      <div
        v-for="(rating, index) in userRatings"
        :key="index"
        class="movie-item-style-2 userrate"
      >
        <img
          v-if="rating.movie.posterImage != null"
          :src="$MOVIE_PHOTOS_URL + '/' + rating.movie.posterImage"
          alt=""
        />
        <img
          v-if="rating.movie.posterImage == null"
          src="../../public/images/poster-template.jpeg"
          alt=""
        />
        <div class="mv-item-infor">
          <h6>
            {{ rating.movie.title }}
            <span ><a @click="removeRatingConfirmation(rating.id)" style="color:red"> (Delete)</a></span>
          </h6>
          <p class="time sm-text">your rate:</p>
          <p class="rate">
            <i class="ion-android-star"></i
            ><span>{{ rating.userRating }}</span> /5
          </p>
          <p class="time sm">
            {{
              new Date(rating.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }}
          </p>
          <p>{{ rating.comment }}</p>
        </div>
      </div>
      <div class="topbar-filter">
        <label>Reviews per page:</label>
        <select v-model="size" @change="getUserRatings(page, size)">
          <option value="5">5 Reviews</option>
          <option value="10">10 Reviews</option>
        </select>
        <div v-if="totalPages <= 10" class="pagination2">
          <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
          <a
            v-for="n in totalPages"
            :key="n"
            :class="{ active: n === page + 1 }"
            @click="getUserRatings(n - 1, size)"
          >
            {{ n }}
          </a>
          <a href="#"><i class="ion-arrow-right-b"></i></a>
        </div>
        <div v-if="totalPages > 10" class="pagination2">
          <span>Page {{ page + 1 }} of {{ totalPages }}:</span>
          <a
            v-for="n in 8"
            :key="n"
            :class="{ active: n === page + 1 }"
            @click="getUserRatings(n - 1, size)"
            >{{ n }}</a
          >
          <a>...</a>
          <a v-for="n in 2" :key="n" @click="getMovieListByType(n - 1, size)">{{
            totalPages - 2 + n
          }}</a>
          <a href="#"><i class="ion-arrow-right-b"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "@/services/user.service";

// importing Modal Vue Component
import Modal from "@/components/Modal.vue";

export default {
  name: "UserProfileRatings",
  components:{
    Modal
  },
  data() {
    return {
      userId: "",
      userRatings: [],
      page: "",
      size: "",
      totalPages: "",
      totalElements: 0,
      numberElements: 0,
      ratingIdToDelete:0,
      isModalOpen: false,
      modalTitle: "",
      modalMessage: "",
      modalStatus: "",
      modalType: "",
      modalTypeAction: "",
    };
  },
  methods: {
    async getUserRatings(page, size) {
      const response = await UserService.getUserRatings(
        this.userId,
        page,
        size
      );

      this.totalPages = response.totalPages;
      this.numberElements = response.numberOfElements;
      this.totalElements = response.totalElements;
      this.userRatings = response.content;
    },
    removeRatingConfirmation(ratingId){
      this.ratingIdToDelete = ratingId;
      this.modalType = "confirmation";
      this.modalTitle = "Confirmation";
      this.modalMessage = "Are you sure you want to delete your rating?";
      this.modalStatus = "confirmation";
      this.modalTypeAction = "deleteRating";
      this.isModalOpen = true;
    },
    deleteRating(){
      UserService.deleteUserRating(this.ratingIdToDelete).then(
        () =>{
          this.modalType = "";
          this.modalTitle = "Success!";
          this.modalMessage = "Rating has been deleted successfully!";
          this.modalStatus = "success";
          this.isModalOpen = true;
          this.page = 0;
          this.size = 5;
          this.getUserRatings(this.page, this.size);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    closeModal(){
      this.isModalOpen = false;
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
    if (this.loggedIn && !this.isAdmin) {
      this.userId = this.$store.state.auth.user.id;
      this.page = 0;
      this.size = 5;
      this.getUserRatings(this.page, this.size);
    } else {
      this.$router.push("/error");
    }
  },
};
</script>
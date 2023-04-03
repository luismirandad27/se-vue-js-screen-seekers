<template>
  <Header/>
  <router-view></router-view>

  <Footer />
</template>


<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Footer,
    Header
  },
  computed: {
    loggedIn() {
      var loggedInValue = this.$store.state.auth.status.loggedIn;
      return loggedInValue;
    },
  }
};
</script>


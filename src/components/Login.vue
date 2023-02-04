<template>
  <!--
  <li v-if="!loggedIn" class="loginLink"><a href="#">LOG In</a></li>
  <li v-if="loggedIn" class="logoutLink">
    <a @click.prevent="handleLogout">LOG Out</a>
  </li>
  <li class="btn signupLink"><a href="#">sign up</a></li>-->
  <!--login form popup-->
  <div class="overlay">
  <div class="login-wrapper" id="login-content">
    <div class="login-content">
      <a href="#" class="close">x</a>
      <h3>Login</h3>
      <form @submit="handleLogin">
        <div class="row">
          <label for="username">
            Username:
            <input
              type="text"
              name="username"
              v-model="username"
              id="username"
            />
          </label>
        </div>
        <div class="row">
          <label for="password">
            Password:
            <input
              type="password"
              name="password"
              v-model="password"
              id="password"
            />
          </label>
        </div>
        <div class="row">
          <div class="remember">
            <div>
              <input type="checkbox" name="remember" value="Remember me" /><span
                >Remember me</span
              >
            </div>
            <a href="#">Forget password ?</a>
          </div>
        </div>
        <div class="row">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  <!--end of login form popup-->
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      user: new User("", ""),
    };
  },
  computed: {
    loggedIn() {
      var isLoggedIn = this.$store.state.auth.status.loggedIn;
      return isLoggedIn;
    },
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      this.user = new User(this.username, "", this.password);
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            console.log("login successful");
          },
          (error) => {
            alert(error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    handleLogout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

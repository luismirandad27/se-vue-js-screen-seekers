<template>
  <!--login form popup-->
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
  <!--end of login form popup-->
  <!-------------------------------------------->
  <!--signup form popup-->
  <div class="login-wrapper" id="signup-content">
    <div class="login-content">
      <a href="#" class="close">x</a>
      <h3>sign up</h3>
      <div class="alert alert-danger close" role="alert" id="alert-dialog-signup">
      </div>
      <form @submit.prevent="handleSignup">
        <div class="row">
          <label for="username-2">Username:
            <input
              type="text"
              name="username"
              id="username-2"
              required="required"
              minlength="8"
              pattern="^[a-zA-Z][a-zA-Z0-9\-\.]{7,19}$"
              title="Username must start with a letter and only can have words and numbers"
              v-model="usernameSignup"
              />
          </label>
        </div>
        <div class="row">
          <label for="email-2">
            your email:
            <input
              type="text"
              name="email"
              id="email-2"
              required="required"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              v-model="emailSignup"
            />
          </label>
        </div>
        <div class="row">
          <label for="password-2">
            Password:
            <input
              type="password"
              name="password"
              id="password-2"
              placeholder=""
              minlength="6"
              maxlength="40"
              title="Password must be between 6 and 40 characters"
              required="required"
              v-model="passwordSignup"
            />
          </label>
        </div>
        <div class="row">
          <label for="repassword-2">
            re-type Password:
            <input
              type="password"
              name="password"
              id="repassword-2"
              :pattern="passwordSignup"
              titte="The password must match"
              required="required"
              v-model="password2Signup"
            />
          </label>
        </div>
        <div class="row">
          <button type="submit">sign up</button>
        </div>
      </form>
    </div>
  </div>
  <!--end of signup form popup -->
  <header class="ht-header">
    <div class="container">
      <nav class="navbar navbar-default navbar-custom">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header logo">
          <div
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span class="sr-only">Toggle navigation</span>
            <div id="nav-icon1">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <a href="index-2.html"
            ><img
              class="logo"
              src="../../public/images/logo1.png"
              alt=""
              width="200"
              height="200"
          /></a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div
          class="collapse navbar-collapse flex-parent"
          id="bs-example-navbar-collapse-1"
        >
          <ul v-if="!isAdmin" class="nav navbar-nav flex-child-menu menu-left">
            <li class="hidden">
              <a href="#page-top"></a>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
              >
                Home
              </a>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                movies
              </a>
            </li>
            <li v-if="loggedIn" class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                my watchlists
              </a>
            </li>
          </ul>
          <ul v-if="isAdmin" class="nav navbar-nav flex-child-menu menu-left">
            <li class="hidden">
              <a href="#page-top"></a>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
              >
                Home
              </a>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                movies administration
              </a>
            </li>
          </ul>
          <ul class="nav navbar-nav flex-child-menu menu-right">
            <li><a href="#">About Us</a></li>
            <li v-if="!loggedIn" class="loginLink"><a>LOG In</a></li>
            <li v-if="!loggedIn" class="btn signupLink">
              <a href="#">sign up</a>
            </li>
            <li class="dropdown first" v-if="loggedIn">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                Hi, {{ currentUser.username }}
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li><a @click="goToUserProfile">My Account</a></li>
                <li><a @click="logout">LOG Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </nav>
    </div>
  </header>
</template>
 
<script>
/* eslint-disable */
import User from "../models/user";
import $ from "jquery";

export default {
  name: "Header",
  computed: {
    loggedIn() {
      var loggedInValue = this.$store.state.auth.status.loggedIn;
      return loggedInValue;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin(){
      if( this.currentUser != null)
        return this.$store.state.auth.user.roles.includes('ROLE_ADMIN');
      else
        return false;
    }
    
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      this.user = new User(this.username, "", this.password);
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            const objOverlayLogin = $(".openform");
            objOverlayLogin.removeClass("openform");
            this.$router.push("/userMainPage");
          },
          (error) => {
            alert(error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    handleSignup(e){
      e.preventDefault();
      if(this.passwordSignup == this.password2Signup){
        this.newUser = new User(this.usernameSignup, this.emailSignup, this.passwordSignup);
        this.$store.dispatch("auth/register",this.newUser).then(
          (response) => {
              const objOverlaySignup = $(".openform");
              objOverlaySignup.removeClass("openform");
              //now, let's signin
              this.$store.dispatch("auth/login", this.newUser).then(
                () => {
                  this.$router.push("/userProfilePage");
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {
            document.getElementById("alert-dialog-signup").classList.remove("close");
            document.getElementById("alert-dialog-signup").innerText = error.response.data.message;
          }
        )
      }else{
        document.getElementById("alert-dialog-signup").classList.remove("close");
        document.getElementById("alert-dialog-signup").innerText = "Passwords are not matching! Try again!";
      }
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    addingOverlay() {
      var loginWrap = $(".login-wrapper");
      loginWrap.each(function () {
        $(this).wrap('<div class="overlay"></div>');
      });
    },
    addingLoginClickListener() {
      var loginLink = $(".loginLink");
      var loginct = $("#login-content");
      var overlay = $(".overlay");

      //pop up for login form
      loginLink.on("click", function (event) {
        event.preventDefault();
        loginct.parent(overlay).addClass("openform");
        $(document).on("click", function (e) {
          var target = $(e.target);
          if ($(target).hasClass("overlay")) {
            $(target)
              .find(loginct)
              .each(function () {
                $(this).removeClass("openform");
              });
            setTimeout(function () {
              $(target).removeClass("openform");
            }, 350);
          }
        });
      });
    },
    addingSignupClickListener() {
      var signupLink = $(".signupLink");
      var signupct= $("#signup-content");
      var overlay = $(".overlay");

      //pop up for signup form
      signupLink.on("click", function (event) {
        event.preventDefault();
        signupct.parents(overlay).addClass("openform");
        document.getElementById("alert-dialog-signup").classList.add("close");
        $(document).on("click", function (e) {
          var target = $(e.target);
          if ($(target).hasClass("overlay")) {
            $(target)
              .find(signupct)
              .each(function () {
                $(this).removeClass("openform");
              });
            setTimeout(function () {
              $(target).removeClass("openform");
            }, 350);
          }
        });
      });
    },
    addingDropdownMenu() {
      /* eslint-disable */
      var windowWidth = $(window).width();
      if (windowWidth > 1024) {
        var dropdown = $(".dropdown");
        dropdown.hover(
          function () {
            $(this).children(".dropdown-menu").fadeIn(300);
          },
          function () {
            $(this).children(".dropdown-menu").fadeOut(300);
          }
        );
      } else {
        var dropdownClick = $(".navbar a.dropdown-toggle");
        dropdownClick.on("click", function (e) {
          var $el = $(this);
          var $parent = $(this).offsetParent(".dropdown-menu");
          var $open = $(".nav li.open");
          $(this).parent("li").toggleClass("open");

          if (!$parent.parent().hasClass("nav")) {
            $el
              .next()
              .css({ top: $el[0].offsetTop, left: $parent.outerWidth() - 4 });
          }
          $open.not($(this).parents("li")).removeClass("open");
          return false;
        });
      }
    },
    goToUserProfile(){
      this.$router.push("/userProfilePage")
    }
  },
  mounted() {
    console.log(this.$store.state.auth.user);
    this.addingOverlay();
    this.addingLoginClickListener();
    this.addingSignupClickListener();
    this.addingDropdownMenu();
  },
  updated() {
    this.addingLoginClickListener();
    this.addingSignupClickListener();
    this.addingDropdownMenu();
  },
};
</script>

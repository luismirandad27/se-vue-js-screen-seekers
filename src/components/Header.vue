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
              width="119"
              height="58"
          /></a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div
          class="collapse navbar-collapse flex-parent"
          id="bs-example-navbar-collapse-1"
        >
          <ul class="nav navbar-nav flex-child-menu menu-left">
            <li class="hidden">
              <a href="#page-top"></a>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
              >
                Home <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li><a href="index-2.html">Home 01</a></li>
                <li><a href="homev2.html">Home 02</a></li>
                <li><a href="homev3.html">Home 03</a></li>
              </ul>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                movies<i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                    >Movie grid<i class="ion-ios-arrow-forward"></i
                  ></a>
                  <ul class="dropdown-menu level2">
                    <li><a href="moviegrid.html">Movie grid</a></li>
                    <li>
                      <a href="moviegridfw.html">movie grid full width</a>
                    </li>
                  </ul>
                </li>
                <li><a href="movielist.html">Movie list</a></li>
                <li><a href="moviesingle.html">Movie single</a></li>
                <li class="it-last">
                  <a href="seriessingle.html">Series single</a>
                </li>
              </ul>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                celebrities <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li><a href="celebritygrid01.html">celebrity grid 01</a></li>
                <li><a href="celebritygrid02.html">celebrity grid 02 </a></li>
                <li><a href="celebritylist.html">celebrity list</a></li>
                <li class="it-last">
                  <a href="celebritysingle.html">celebrity single</a>
                </li>
              </ul>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                news <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li><a href="bloglist.html">blog List</a></li>
                <li><a href="bloggrid.html">blog Grid</a></li>
                <li class="it-last">
                  <a href="blogdetail.html">blog Detail</a>
                </li>
              </ul>
            </li>
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                community <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li><a href="userfavoritegrid.html">user favorite grid</a></li>
                <li><a href="userfavoritelist.html">user favorite list</a></li>
                <li><a href="userprofile.html">user profile</a></li>
                <li class="it-last"><a href="userrate.html">user rate</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav flex-child-menu menu-right">
            <li class="dropdown first">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                pages <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li><a href="landing.html">Landing</a></li>
                <li><a href="404.html">404 Page</a></li>
                <li class="it-last">
                  <a href="comingsoon.html">Coming soon</a>
                </li>
              </ul>
            </li>
            <li><a href="#">Help</a></li>
            <li v-if="!loggedIn" class="loginLink">
              <!--<a @click="login">LOG In</a>-->
              <a>LOG In</a>
            </li>
            <li class="dropdown first" v-if="loggedIn">
              <a
                class="btn btn-default dropdown-toggle lv1"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                Hi, {{ currentUser.username }} <i class="fa fa-angle-down" aria-hidden="true"></i>
              </a>
              <ul class="dropdown-menu level1">
                <li><a href="landing.html">My Account</a></li>
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
import User from "../models/user";
import $ from "jquery";

export default {
  name: "Header",
  computed: {
    loggedIn() {
      var loggedInValue = this.$store.state.auth.status.loggedIn;
      return loggedInValue;
    },
    currentUser(){
      return  this.$store.state.auth.user;
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
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    addingOverlay(){
      var loginWrap = $(".login-wrapper");
      loginWrap.each(function () {
          $(this).wrap('<div class="overlay"></div>');
        });
    },
    addingLoginClickListener(){
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
    addingDropdownMenu(){
      /* eslint-disable */
      var windowWidth = $(window).width();
      if(windowWidth > 1024){
        var dropdown = $( '.dropdown');
        dropdown.hover(
              function(){
                  $(this).children('.dropdown-menu').fadeIn(300);
              },
              function(){
                  $(this).children('.dropdown-menu').fadeOut(300);
              }
          );	   
      }else{
        var dropdownClick = $('.navbar a.dropdown-toggle');
        dropdownClick.on('click', function(e) {
          var $el = $(this);
          var $parent = $(this).offsetParent(".dropdown-menu");
          var $open = $('.nav li.open');
          $(this).parent("li").toggleClass('open');

          if(!$parent.parent().hasClass('nav')) {
            $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
          }
          $open.not($(this).parents("li")).removeClass("open");
          return false;
        });
      }
      /* eslint-enable */
    }
  },
  mounted(){
    this.addingOverlay();
    this.addingLoginClickListener();
    this.addingDropdownMenu();
  },
  updated(){
    this.addingLoginClickListener();
    this.addingDropdownMenu();
  }
};
</script>

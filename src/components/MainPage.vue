<template>
  <div class="slider movie-items">
    <div class="container">
      <div class="row">
        <div class="social-link">
          <p>Follow us:</p>
          <a href="#"><i class="ion-social-facebook"></i></a>
          <a href="#"><i class="ion-social-twitter"></i></a>
          <a href="#"><i class="ion-social-googleplus"></i></a>
          <a href="#"><i class="ion-social-youtube"></i></a>
        </div>
        <Splide :options="splideOptions" aria-label="My Favorite Images">
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <a href="#"
                ><img
                  src="images/uploads/slider1.jpg"
                  alt=""
                  width="285"
                  height="437"
              /></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span>
              </div>
              <h6><a href="#">Interstellar</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <a href="#"
                ><img
                  src="images/uploads/slider2.jpg"
                  alt=""
                  width="285"
                  height="437"
              /></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="yell"><a href="#">action</a></span>
              </div>
              <h6><a href="#">The revenant</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <a href="#"
                ><img
                  src="images/uploads/slider3.jpg"
                  alt=""
                  width="285"
                  height="437"
              /></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="green"><a href="#">comedy</a></span>
              </div>
              <h6><a href="#">Die hard</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <a href="#"
                ><img
                  src="images/uploads/slider4.jpg"
                  alt=""
                  width="285"
                  height="437"
              /></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span>
                <span class="orange"><a href="#">advanture</a></span>
              </div>
              <h6><a href="#">The walk</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <a href="#"
                ><img
                  src="images/uploads/slider1.jpg"
                  alt=""
                  width="285"
                  height="437"
              /></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span>
              </div>
              <h6><a href="#">Interstellar</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <a href="#"
                ><img
                  src="images/uploads/slider2.jpg"
                  alt=""
                  width="285"
                  height="437"
              /></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="yell"><a href="#">action</a></span>
              </div>
              <h6><a href="#">The revenant</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <img
                src="images/uploads/slider3.jpg"
                alt=""
                width="285"
                height="437"
              />
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="green"><a href="#">comedy</a></span>
              </div>
              <h6><a href="#">Die hard</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <img
                src="images/uploads/slider4.jpg"
                alt=""
                width="285"
                height="437"
              />
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span>
                <span class="orange"><a href="#">advanture</a></span>
              </div>
              <h6><a href="#">The walk</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
          <SplideSlide class="movie-item">
            <div class="mv-img">
              <img
                src="images/uploads/slider3.jpg"
                alt=""
                width="285"
                height="437"
              />
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="green"><a href="#">comedy</a></span>
              </div>
              <h6><a href="#">Die hard</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// Default theme
import '@splidejs/vue-splide/css';

// or other themes
import '@splidejs/vue-splide/css/skyblue';
import '@splidejs/vue-splide/css/sea-green';

// or only core styles
import '@splidejs/vue-splide/css/core';

export default {
  name: 'MainPage',
  components:{
    Splide,
    SplideSlide,
  },
  data(){
    return {
      splideOptions:{
        "type":"loop",
        "perPage":4,
        "interval":2000,
        "autoplay":true,
        "arrows":false
      }
    };
  },
  computed:{
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods:{
    restartLogInForm(){
      var loginLink = $(".loginLink");
      var loginct = $( "#login-content" );
      var loginWrap = $(".login-wrapper");
      var overlay = $(".overlay");
      loginWrap.each( function(){
        $(this).wrap('<div class="overlay"></div>')
      });
        //pop up for login form
        loginLink.on('click', function(event){
          event.preventDefault();
          loginct.parents(overlay).addClass("openform");
        $(document).on('click', function(e){
        var target = $(e.target);
        if ($(target).hasClass("overlay")){
            $(target).find(loginct).each( function(){
              $(this).removeClass("openform");
            });
            setTimeout( function(){
              $(target).removeClass("openform");
            }, 350);
          }	
        });
        });
    }
  },
  mounted(){
    this.restartLogInForm();
  }
}
</script>

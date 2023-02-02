<template>
  <!--login form popup-->
  <div class="login-wrapper" id="login-content">
    <div class="login-content">
      <a href="#" class="close">x</a>
      <h3>Login</h3>
      <form method="post" action="#">
        <div class="row">
          <label for="username">
            Username:
            <input type="text" name="username" id="username" placeholder="Hugh Jackman"
              pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$" required="required" />
          </label>
        </div>

        <div class="row">
          <label for="password">
            Password:
            <input type="password" name="password" id="password" placeholder="******"
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" />
          </label>
        </div>
        <div class="row">
          <div class="remember">
            <div>
              <input type="checkbox" name="remember" value="Remember me"><span>Remember me</span>
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
  <!--signup form popup-->
  <div class="login-wrapper" id="signup-content">
    <div class="login-content">
      <a href="#" class="close">x</a>
      <h3>sign up</h3>
      <form method="post" action="#">
        <div class="row">
          <label for="username-2">
            Username:
            <input type="text" name="username" id="username-2" placeholder="Hugh Jackman"
              pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$" required="required" />
          </label>
        </div>

        <div class="row">
          <label for="email-2">
            your email:
            <input type="password" name="email" id="email-2" placeholder=""
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" />
          </label>
        </div>
        <div class="row">
          <label for="password-2">
            Password:
            <input type="password" name="password" id="password-2" placeholder=""
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" />
          </label>
        </div>
        <div class="row">
          <label for="repassword-2">
            re-type Password:
            <input type="password" name="password" id="repassword-2" placeholder=""
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" />
          </label>
        </div>
        <div class="row">
          <button type="submit">sign up</button>
        </div>
      </form>
    </div>
  </div>
  <!--end of signup form popup-->
  <div class="slider movie-items">
    <div class="container">
      <div class="row">
        <div class="social-link">
          <p>Follow us: </p>
          <a href="#"><i class="ion-social-facebook"></i></a>
          <a href="#"><i class="ion-social-twitter"></i></a>
          <a href="#"><i class="ion-social-googleplus"></i></a>
          <a href="#"><i class="ion-social-youtube"></i></a>
        </div>
        <div class="slick-multiItemSlider">
          <div class="movie-item">
            <div class="mv-img">
              <a href="#"><img src="images/uploads/slider1.jpg" alt="" width="285" height="437"></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span>
              </div>
              <h6><a href="#">Interstellar</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <a href="#"><img src="images/uploads/slider2.jpg" alt="" width="285" height="437"></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="yell"><a href="#">action</a></span>
              </div>
              <h6><a href="#">The revenant</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <a href="#"><img src="images/uploads/slider3.jpg" alt="" width="285" height="437"></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="green"><a href="#">comedy</a></span>
              </div>
              <h6><a href="#">Die hard</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <a href="#"><img src="images/uploads/slider4.jpg" alt="" width="285" height="437"></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span> <span class="orange"><a href="#">advanture</a></span>
              </div>
              <h6><a href="#">The walk</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <a href="#"><img src="images/uploads/slider1.jpg" alt="" width="285" height="437"></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span>
              </div>
              <h6><a href="#">Interstellar</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <a href="#"><img src="images/uploads/slider2.jpg" alt="" width="285" height="437"></a>
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="yell"><a href="#">action</a></span>
              </div>
              <h6><a href="#">The revenant</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <img src="images/uploads/slider3.jpg" alt="" width="285" height="437">
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="green"><a href="#">comedy</a></span>
              </div>
              <h6><a href="#">Die hard</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <img src="images/uploads/slider4.jpg" alt="" width="285" height="437">
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="blue"><a href="#">Sci-fi</a></span> <span class="orange"><a href="#">advanture</a></span>
              </div>
              <h6><a href="#">The walk</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
          <div class="movie-item">
            <div class="mv-img">
              <img src="images/uploads/slider3.jpg" alt="" width="285" height="437">
            </div>
            <div class="title-in">
              <div class="cate">
                <span class="green"><a href="#">comedy</a></span>
              </div>
              <h6><a href="#">Die hard</a></h6>
              <p><i class="ion-android-star"></i><span>7.4</span> /10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
    msg: String
  }
}
</script>



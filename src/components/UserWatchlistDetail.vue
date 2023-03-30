<template>
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
  <div class="page-single" style="padding-top: 0; padding-bottom: 15px">
    <div class="container">
      <div class="row form-style-1 user-pro" style="margin-bottom: 0">
        <h3>Watchlist Information</h3>
        <div class="col-md-1 form-it">
          <label>Watchlist Name</label>
        </div>
        <div class="col-md-4 form-it">
          <input
            type="text"
            placeholder="Type the watchlist's name"
            v-model="watchlistNameInput"
            :required="true"
          />
        </div>
        <div class="col-md-2 form-it">
          <input class="submit" type="submit" value="Save" />
        </div>
        <div class="col-md-2 form-it">
          <input class="submit" type="submit" value="Delete" />
        </div>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0; padding-bottom: 15px">
    <div class="container">
      <div class="row form-style-1 user-pro" style="margin-bottom: 0">
        <h3>My Movies Selection</h3>
        <div class="row ipad-width">
          <div class="flex-wrap-movielist" style="margin-top: 15px">
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-single" style="padding-top: 0">
    <div class="movies-search">
      <div class="container">
        <div class="row user-pro" style="margin-bottom: 0">
          <h3>Add movie to watchlist</h3>
          <div class="top-search">
            <input
              type="text"
              placeholder="Search for a movie, TV Show or celebrity that you are looking for"
            />
          </div>
        </div>
        <div class="row ipad-width">
          <div class="flex-wrap-movielist" style="margin-top: 15px">
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
            <div class="movie-item-style-2 movie-item-style-1">
              <img src="../../public/images/poster-template.jpeg" alt="" />
              <div class="hvr-inner">
                <a href="moviesingle.html">
                  Read more <i class="ion-android-arrow-dropright"></i>
                </a>
              </div>
              <div class="mv-item-infor">
                <h6>
                  <a href="#">Test</a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserWatchlistDetail",
};
</script>

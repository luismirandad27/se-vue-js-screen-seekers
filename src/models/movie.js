export default class Movie{

    constructor(id, title, genre, releaseDate, length, synopsis, classificationRating,
         movieTrailerLink, isInTheaters, isInStreaming, isComingSoon, whereToWatch, posterImage, trailerImage){
            this.id = id;
            this.title = title;
            this.genre = genre;
            this.releaseDate = releaseDate;
            this.length = length;
            this.synopsis = synopsis;
            this.classificationRating = classificationRating;
            this.movieTrailerLink = movieTrailerLink;
            this.isInTheaters = isInTheaters;
            this.isInStreaming = isInStreaming;
            this.isComingSoon = isComingSoon;
            this.whereToWatch = whereToWatch;
            this.posterImage = posterImage;
            this.trailerImage = trailerImage;
         }
   
   setAvgRating(avgRating){
            this.avgRating = avgRating;
        }

}
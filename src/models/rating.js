export default class Rating {
    constructor(userId,movieId , userRating, comment) {
       
        this.userId = userId;
        this.movieId = movieId;
        this.userRating = userRating;
        this.comment = comment;
    }
}
export default class User {
  constructor(
    userId,
    clerkId,
    email,
    username,
    photoUrl,
    movies,
    createdAt,
    isLoggedIn
  ) {
    this.userId = userId;
    this.clerkId = clerkId;
    this.email = email;
    this.username = username;
    this.photoUrl = photoUrl;
    this.movies = movies;
    this.createdAt = createdAt;
    this.isLoggedIn = isLoggedIn;
  }

  getFormattedMovies() {
    return this.movies.join(", ");
  }
}

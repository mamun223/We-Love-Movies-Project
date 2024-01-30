const knex = require("../db/connection");

const tableName = "movies";

function list () {
    return knex(tableName).select("*")
}

function moviesShowing () {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id" , "mt.movie_id" )
    .select("m.*")
    .where({ "mt.is_showing": true })
    .then((arr) => {
      const uniqueMovies = Array.from(new Set(arr.map(JSON.stringify)), JSON.parse);
      return uniqueMovies;
    });
}


function read(movieId) {
  return knex(tableName)
    .select("*")
    .where({ movie_id: movieId })
    .first()
}

function theatersShowingMovie (movieId) {
  return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .join("theaters as t", "t.theater_id", "mt.theater_id")
  .select("t.*", "mt.is_showing", "m.movie_id")
  .where({ "m.movie_id": movieId, "mt.is_showing": true })
}

function movieReviews (movieId) {
  return knex("movies as m")
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select("r.*", "c.*")
  .where({ "m.movie_id": movieId })
  .then((reviews) => {
      // Map the results to transform them into the desired structure
      return reviews.map((review) => {
        return {
          review_id: review.review_id,
          content: review.content,
          score: review.score,
          created_at: review.created_at,
          updated_at: review.updated_at,
          critic_id: review.critic_id,
          movie_id: review.movie_id,
          critic: {
            critic_id: review.critic_id,
            preferred_name: review.preferred_name,
            surname: review.surname,
            organization_name: review.organization_name,
            created_at: review.critic_created_at,
            updated_at: review.critic_updated_at,
          },
        };
      });
    });
}



module.exports = {
    list,
    moviesShowing,
    read,
    theatersShowingMovie,
    movieReviews,
}
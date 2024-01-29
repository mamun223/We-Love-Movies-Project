const knex = require("../db/connection");

function list() {
  return knex("theaters as t")
    .select("t.*")
    .then((theaters) => {
      // Use map to create an array of promises
      const promises = theaters.map((theater) => {
        return knex("movies as m")
          .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
          .join("theaters as t", "t.theater_id", "mt.theater_id")
          .select("m.*")
          .where({ "mt.is_showing": true, "t.theater_id": theater.theater_id });
      });

      // Use Promise.all to wait for all promises to resolve
      return Promise.all(promises).then((moviesByTheater) => {
        // Combine the results into a single array of theaters with associated movies
        return theaters.map((theater, index) => {
          return {
            ...theater,
            movies: moviesByTheater[index],
          };
        });
      });
    });
}





module.exports = {
  list,
}
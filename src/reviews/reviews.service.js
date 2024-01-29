const knex = require("../db/connection");

const tableName = "reviews"

function destroy (reviewId) {
  return knex("reviews as r")
  .where({ "r.review_id": reviewId })
  .del()
}

function read(reviewId) {
  return knex("reviews as r")
  .select("r.review_id")
  .where({ "r.review_id": reviewId })
  .first()
}

function update(updatedReview) {
  // Perform the update
  return knex("reviews as r")
    .join("critics as c", "c.review_id", "r.review_id")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, ["r.score", "r.content"])
    .then((review_id) => {
      return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ review_id })
        .first()
        .then((result) => {
          return {
            critic: {
             critic_id: "critics.critic_id",
             preferred_name: "critics.preferred_name",
             surname: "critics.surname",
             organization_name: "critics.organization_name",
             created_at: "critics.created_at",
             updated_at: "critics.updated_at",
            },
            ...result
          }
        })
    })
}


module.exports = {
  read,
  destroy,
  update,
}
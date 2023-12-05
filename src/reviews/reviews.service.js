const db = require("../db/connection");
const mapProps = require("../utils/map-properties");

const tableName = "reviews";

async function destroy(review_id) {
  return db("reviews").where({ review_id }).del();
}

async function list(movie_id) {
  return db("movies as m")
      .join("reviews as r", "r.movie_id", "m.movie_id")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .select("*")
      .where({"m.movie_id" : movie_id})
      .then((reviews) => reviews.map(mapProps(
        {
          critic_id: "critic.critic_id",
          preferred_name: "critic.preferred_name",
          surname: "critic.surname",
          organization_name: "critic.organization_name"
        }
      )));
}

async function read(review_id) {
  // TODO: Write your code here
  return db("reviews").select("*").where({review_id}).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  console.log("Review: ", review)
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};

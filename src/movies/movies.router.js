const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsGet = cors({methods: "GET"});

router
  .route("/movies?is_showing=true")
  .get(cors(), controller.moviesShowing)
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/")
  .get(cors(), controller.list)
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(cors(), controller.read)
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(cors(), controller.theatersShowingMovie)
  .options(corsGet)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(cors(), controller.movieReviews)
  .options(corsGet)
  .all(methodNotAllowed);

module.exports = router;

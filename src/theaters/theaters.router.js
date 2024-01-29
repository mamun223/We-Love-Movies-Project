const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

const corsGet = cors({methods: "GET"});

router
  .route("/")
  .get(cors(), controller.list)
  .options(corsGet)
  .all(methodNotAllowed)

module.exports = router;
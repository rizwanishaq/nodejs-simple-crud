const router = require("express").Router();
const usersController = require("../controllers/users");

router.route("/").get(usersController.index).post();

module.exports = router;

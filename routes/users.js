const router = require("express-promise-router")();
const usersController = require("../controllers/users");

router.route("/").get(usersController.index).post(usersController.newUser);

// /users/:id
router
  .route("/:userId")
  .get(usersController.getUser)
  .put(usersController.replaceUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;

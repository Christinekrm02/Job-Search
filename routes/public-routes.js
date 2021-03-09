const { postRegisterUser } = require("../controllers/public-controller");
const router = require("express").Router();

/*POST route to use/register user, destination with public access */
router.route("/register").post(postRegisterUser);

module.exports = router;

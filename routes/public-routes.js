const {
  postRegisterUser,
  postRegisterEmployer,
  postLoginUser,
  getAllJobPostsByEmployerId,
  getJobPostById,
} = require("../controllers/public-controller");
const router = require("express").Router();

/*@POST 
destination api/register/postRegisterUser
access public
*/
router.route("/api/register/job-seeker").post(postRegisterUser);
/*@POST 
destination api/register/postRegisterEmployer
access public
*/
router.route("/api/register/employer").post(postRegisterEmployer);
/*@POST 
destination api/login/postLoginUser
access public
*/
router.route("/api/login").post(postLoginUser);
/*@GET 
destination api/job-listings/getAllJobPostsByEmployerId
access public
*/
router
  .route("/api/job-listings/all-job-listings-by-employer")
  .get(getAllJobPostsByEmployerId);

/*@GET 
destination api/job-listings/getJobPostById
access public
*/
router.route("/api/job-listings/job-listing-by-id").get(getJobPostById);

module.exports = router;

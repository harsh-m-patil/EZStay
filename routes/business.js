const express = require("express");
const router = express.Router();
const business = require("../controllers/business");
const { verifyToken } = require("../middleware/business");

router.get("/business_signup", business.newBusinesses);
router.post("/business_signup", business.createBusiness);

// login handler
router.get("/business_login", business.getBusinesses);
router.post("/business_login", business.accessBusiness);

router.get('/dashboard',verifyToken,business.businessDashboard)
// Logout
router.get("/business_logout", business.logout);

module.exports = router;
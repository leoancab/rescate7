const express = require("express")
const router = express.Router()

const visitsController = require("../controllers/visitController")
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, visitsController.createVisit)
router.get("/", visitsController.getVisits);
router.get("/visits/usuer/:id", visitsController.getVisitsByUser);

module.exports = router;
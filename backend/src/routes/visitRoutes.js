const express = require("express")
const router = express.Router()

const visitsController = require("../controllers/visitController")

router.get("/visits", visitsController.getVisits);
router.get("/visits/usuer/:id", visitsController.getVisitsByUser);

module.exports = router;
const express = require("express")
const router = express.Router()

const prospectController = require("../controllers/prospectController")

router.post("/prospect", prospectController.createProspect);
router.get("/prospect", prospectController.getProspects);
router.get("/prospect/:id", prospectController.getProspect);
router.put("/prospect/:id/convert", prospectController.convertToMember);

module.exports = router;
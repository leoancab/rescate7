const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");

router.get("/cant/:id", groupController.getCantidadMiGrupo);
router.post("/", groupController.createGroup);
router.get("/", groupController.getGroups);
router.get("/:id", groupController.getGroup);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);
router.get("/:id/users", groupController.getUserByGroup);

module.exports = router;
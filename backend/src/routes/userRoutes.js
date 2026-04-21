const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/by-rol", authMiddleware, userController.getUsuariosByRol);
router.get("/count", authMiddleware, userController.countByIglesia);
router.get("/", authMiddleware, userController.getUsers)
router.get("/:id", authMiddleware, userController.getUser)
router.put("/:id", authMiddleware, userController.updateUser)
router.delete("/:id", authMiddleware, userController.deleteUser)
router.put("/:id/group", userController.assignGroup);
router.put("/:id/remove-group", userController.removeGroup);
router.get("/:id_grupo/lider", userController.getLiderGrupo)

module.exports = router
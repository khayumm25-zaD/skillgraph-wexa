const express = require("express");
const controller = require("../controllers/apiController");

const router = express.Router();

router.get("/health", controller.health);
router.get("/candidate", controller.candidate);
router.get("/roles", controller.roles);
router.get("/roles/:roleId", controller.role);
router.get("/roles/:roleId/gap", controller.gap);
router.get("/roles/:roleId/evidence", controller.evidence);
router.get("/roles/:roleId/resources", controller.resources);
router.get("/roles/:roleId/career-path", controller.careerPath);
router.get("/recommendations", controller.recommendations);
router.get("/graph/:roleId", controller.graphView);

module.exports = router;

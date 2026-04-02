const express = require("express");
const roomController = require("../controllers/roomController");
const validateRequest = require("../middleware/validateRequest");
const auth = require("../middleware/auth");
const {
  createRoomValidator,
  updateRoomValidator,
  roomFilterValidator,
  roomIdValidator,
  roomAvailabilityValidator,
} = require("../validators/roomValidators");

const router = express.Router();

router.get("/", roomFilterValidator, validateRequest, roomController.listRooms);
router.get("/:id", roomIdValidator, validateRequest, roomController.getRoomById);
router.get(
  "/:id/availability",
  roomAvailabilityValidator,
  validateRequest,
  roomController.checkRoomAvailability,
);

router.post(
  "/",
  auth(["admin"]),
  createRoomValidator,
  validateRequest,
  roomController.createRoom
);
router.patch(
  "/:id",
  auth(["admin"]),
  updateRoomValidator,
  validateRequest,
  roomController.updateRoom
);
router.delete(
  "/:id",
  auth(["admin"]),
  roomIdValidator,
  validateRequest,
  roomController.deleteRoom
);

module.exports = router;

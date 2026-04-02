const asyncHandler = require("../utils/asyncHandler");
const roomRepository = require("../repositories/roomRepository");
const bookingService = require("../services/bookingService");
const ApiError = require("../utils/apiError");

const listRooms = asyncHandler(async (req, res) => {
  const rooms = await roomRepository.list(req.query);
  res.json({ data: rooms });
});

const getRoomById = asyncHandler(async (req, res) => {
  const room = await roomRepository.findById(req.params.id);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }
  res.json({ data: room });
});

const checkRoomAvailability = asyncHandler(async (req, res) => {
  const checkInDate = req.query.checkInDate || req.query.checkIn;
  const checkOutDate = req.query.checkOutDate || req.query.checkOut;
  const room = await roomRepository.findById(req.params.id);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }
  const available = await bookingService.isRoomAvailable(req.params.id, checkInDate, checkOutDate);
  res.json({ data: { roomId: Number(req.params.id), checkInDate, checkOutDate, available } });
});

const createRoom = asyncHandler(async (req, res) => {
  const room = await roomRepository.create(req.body);
  res.status(201).json({ message: "Room created successfully", data: room });
});

const updateRoom = asyncHandler(async (req, res) => {
  const room = await roomRepository.update(req.params.id, req.body);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }
  res.json({ message: "Room updated successfully", data: room });
});

const deleteRoom = asyncHandler(async (req, res) => {
  const deleted = await roomRepository.remove(req.params.id);
  if (!deleted) {
    throw new ApiError(404, "Room not found");
  }
  res.status(204).send();
});

module.exports = {
  listRooms,
  getRoomById,
  checkRoomAvailability,
  createRoom,
  updateRoom,
  deleteRoom,
};

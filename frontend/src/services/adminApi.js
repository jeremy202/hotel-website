import http from "./http";

function authHeaders() {
  const token = localStorage.getItem("gc_token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function login(payload) {
  const { data } = await http.post("/auth/login", payload);
  return data.data;
}

async function register(payload) {
  const { data } = await http.post("/auth/register", payload);
  return data.data;
}

async function getAnalytics() {
  const { data } = await http.get("/admin/analytics", { headers: authHeaders() });
  return data;
}

async function getBookings(params = {}) {
  const { data } = await http.get("/admin/bookings", { params, headers: authHeaders() });
  return data;
}

async function getTransactions(params = {}) {
  const { data } = await http.get("/admin/transactions", { params, headers: authHeaders() });
  return data;
}

async function getRooms(params = {}) {
  const { data } = await http.get("/rooms", { params });
  return data;
}

async function createRoom(payload) {
  const { data } = await http.post("/rooms", payload, { headers: authHeaders() });
  return data;
}

async function updateRoom(roomId, payload) {
  const { data } = await http.patch(`/rooms/${roomId}`, payload, { headers: authHeaders() });
  return data;
}

async function deleteRoom(roomId) {
  const { data } = await http.delete(`/rooms/${roomId}`, { headers: authHeaders() });
  return data;
}

async function createManualBooking(payload) {
  const { data } = await http.post("/admin/bookings/manual", payload, { headers: authHeaders() });
  return data;
}

async function getCalendar(params = {}) {
  const { data } = await http.get("/admin/calendar", { params, headers: authHeaders() });
  return data;
}

export const adminApi = {
  login,
  register,
  getAnalytics,
  getBookings,
  getTransactions,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  createManualBooking,
  getCalendar,
};

export const loginAdmin = login;
export const registerAdmin = register;
export const getAdminAnalytics = async () => (await getAnalytics()).data || {};
export const getAdminBookings = async (params = {}) => (await getBookings(params)).data || [];
export const getAdminTransactions = async (params = {}) => (await getTransactions(params)).data || [];
export const fetchRooms = async (params = {}) => (await getRooms(params)).data || [];
export const getAdminCalendar = async (params = {}) => (await getCalendar(params)).data || [];
export { createRoom, updateRoom, deleteRoom, createManualBooking };

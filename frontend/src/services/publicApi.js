import http from "./http";

export async function fetchRooms(params = {}) {
  const { data } = await http.get("/rooms", { params });
  return data.data || [];
}

export async function fetchRoomById(id) {
  const { data } = await http.get(`/rooms/${id}`);
  return data.data;
}

export async function createBooking(payload) {
  const { data } = await http.post("/bookings", payload);
  return data.data;
}

export async function initializePayment(payload, token) {
  const { data } = await http.post("/payments/initialize", payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return data.data;
}

export async function verifyPayment(reference) {
  const { data } = await http.get(`/payments/verify/${reference}`);
  return data.data;
}

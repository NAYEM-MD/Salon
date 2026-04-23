import api from './axios';

export const createBooking = (data) => api.post('/bookings', data);
export const fetchBookingByCode = (code) => api.get(`/bookings/code/${code}`);
export const fetchBooking = (id) => api.get(`/bookings/${id}`);

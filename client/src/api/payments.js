import api from './axios';

export const createCheckout = (bookingId) => api.post('/payments/checkout', { bookingId });
export const confirmPayment = (paymentId, cardLast4) =>
  api.post('/payments/confirm', { paymentId, cardLast4 });

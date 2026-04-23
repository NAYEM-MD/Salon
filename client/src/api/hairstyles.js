import api from './axios';

export const fetchHairstyles = (params) => api.get('/hairstyles', { params });
export const fetchHairstyle = (id) => api.get(`/hairstyles/${id}`);

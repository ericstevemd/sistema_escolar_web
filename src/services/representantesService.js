import axios from 'axios';

const API_URL = 'http://158.220.124.141:3002/representantes';  // Cambia la URL si es necesario

export const representantesService = {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(representante) {
    return axios.post(API_URL, representante);
  },

  update(id, representante) {
    return axios.put(`${API_URL}/${id}`, representante);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};

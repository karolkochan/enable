import axios from 'axios';

const HOST = 'http://localhost';
const PORT = 3000;
const BASE = `${HOST}:${PORT}`;

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: BASE,
      responseType: 'json'
    });
  }

  upload({name, file}) {
    const data = new FormData();
    data.append('name', name);
    data.append('file', file);

    return axios.post(`${BASE}/uploads`, data);
  }

  updateTrack(id, data) {
    return axios.put(`${BASE}/track/${id}`, data);
  }
}

export default new ApiService();

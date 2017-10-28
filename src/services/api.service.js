import axios from 'axios';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: 'localhost:3000',
      responseType: 'json'
    });
  }

  upload({name, file}) {
    const data = new FormData();
    data.append('name', name);
    data.append('file', file);

    return axios.post('http://localhost:3000/uploads', data);
  }

  updateTrack(id, data) {
    return axios.put(`/track/${id}`, data);
  }
}

export default new ApiService();

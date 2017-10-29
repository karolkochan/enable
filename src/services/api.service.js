import axios from 'axios';
import querystring from 'querystring';

// const HOST = 'http://localhost';
// const PORT = 3000;
// const BASE = `${HOST}:${PORT}`;
const BASE = 'http://d8c7fc15.ngrok.io'; // `${HOST}:${PORT}`;

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

  download(id) {
    window.location.assign(`${BASE}/routes/export/${id}`);
  }

  index() {
    return axios.get(`${BASE}/routes`)
      .then(({data}) => data);
  }

  getTracks(query) {
    const queryTrue = Object.keys(query).reduce((q, key) => {
      if (query[key] === true) {
        q[key] = query[key];
      }
      return q;
    }, {});
    if (Object.keys(queryTrue).length === 0) {
      return this.index();
    }
    const queryStr = querystring.stringify(queryTrue);
    return axios.get(`${BASE}/routes/filter?${queryStr}`)
      .then(({data}) => data);
  }

  getTrack(id) {
    return axios.get(`${BASE}/routes/${id}`)
      .then(({data}) => Object.assign({}, data, {id}));
  }

  updateTrack(id, data) {
    return axios.put(`${BASE}/routes/${id}`, data);
  }
}

export default new ApiService();

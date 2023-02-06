import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9091/api/finpol/main/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'persons/410/2/2');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();

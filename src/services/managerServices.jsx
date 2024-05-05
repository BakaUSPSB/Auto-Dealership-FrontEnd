// managerServices.jsx
import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class ManagerServices {
  static async fetchSalesData() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_ROOT_URL}/user/purchases_with_dates`, {  // Make sure this endpoint is correct
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Non-200 response:', response);
        return null;
      }
    } catch (error) {
      console.error('Error fetching sales data:', error.response || error.message);
      return null;
    }
  }
}

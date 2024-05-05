// managerServices.jsx
import axios from 'axios';
import { API_ROOT_URL } from '../configs';
const token = localStorage.getItem('token');
export default class ManagerServices {
  static async fetchSalesData() {
    try {
      const response = await axios.get(
        `${API_ROOT_URL}/user/purchases_with_dates`, 
        { headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sales data:', error.response || error.message);
      return null;
    }
  }
  
  static async fetchServices() {
    try {
      const response = await axios.get(
        `${API_ROOT_URL}/inventory/services`, 
        {headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sales data:', error.response || error.message);
      return null;
    }
  }

  static async createService(serviceDetails) {
    try {
      const response = await axios.post(`${API_ROOT_URL}/user/inventory/service`, {
        service_type: serviceDetails.service_type,
        price: serviceDetails.price,
        description: serviceDetails.description,
        status: serviceDetails.status
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error.response || error.message);
      return null;
    }
  }
  
  

  static async updateService(serviceDetails) {
    try {
      const response = await axios.put(
        `${API_ROOT_URL}/user/inventory/service/${serviceDetails.service_id}`,  // Adjusted endpoint if necessary
        {
          service_type: serviceDetails.service_type,
          price: serviceDetails.price,
          description: serviceDetails.description,
          status: serviceDetails.status
        }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error.response || error.message);
      return null;
    }
  }
}

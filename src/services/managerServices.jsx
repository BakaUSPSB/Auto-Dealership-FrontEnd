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
  // the next three routes are for seeing and adjusting the inventory
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
  // these routes are for the manager to interact with the contracts
  static async fetchPurchases() {
      try {
          const response = await axios.get(`${API_ROOT_URL}/user/purchases`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching purchases:', error.response || error.message);
          throw error;
      }
  }
  static async generateContract(purchaseId) {
      try {
          const response = await axios.post(`${API_ROOT_URL}/user/purchases/${purchaseId}/contract`, {}, {
              headers: { Authorization: `Bearer ${token}` },
              responseType: 'blob' // assuming the response is a PDF file
          });
          // Handling file download directly here, can modify depending on requirements
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Purchase_Contract_${purchaseId}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
      } catch (error) {
          console.error('Error generating contract:', error.response || error.message);
          throw error;
      }
  }

  static async signContract(purchaseId, signature) {
      try {
          const response = await axios.post(`${API_ROOT_URL}/user/purchases/${purchaseId}/contract/sign`, {
              signature
          }, {
              headers: { Authorization: `Bearer ${token}` },
              responseType: 'blob' // assuming the response is a PDF file
          });
          // Handling file download directly here, can modify depending on requirements
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Signed_Contract_${purchaseId}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
      } catch (error) {
          console.error('Error signing contract:', error.response || error.message);
          throw error;
      }
    }

}

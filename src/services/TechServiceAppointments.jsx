import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class TechServiceAppointments {
  static async getServiceAppointments() {
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      const response = await axios.get(
        `${API_ROOT_URL}/user/appointments/service_tickets`,
        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  static async updateServiceStatus(serviceTicketId) {
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      const response = await axios.post(
        `${API_ROOT_URL}/user/service_ticket/${serviceTicketId}/close`,
        {
          service_ticket_id: serviceTicketId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  static async updateTechnicianNotes(serviceTicketId, notes) {
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      const response = await axios.post(
        `${API_ROOT_URL}/user/service_ticket/${serviceTicketId}/add_technician_note`,
        {
          technician_note: notes
        },
        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


}
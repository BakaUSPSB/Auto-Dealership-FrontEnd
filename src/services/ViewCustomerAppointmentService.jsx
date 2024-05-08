import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class ViewCustomerAppointmentService {

    static async getCustomerAppointments(customer_id) {
        try {
            const customer_id = localStorage.getItem("id"); // get the customer id from local storage
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.get(
                `${API_ROOT_URL}/customer/appointments/${customer_id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateAppointmentStatus(appointmentId) {
        try {
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.post(
                `${API_ROOT_URL}/customer/appointments/${appointmentId}/close`, // Check the API endpoint
                {
                    appointment_id: appointmentId
                },
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async cancelAppointment(appointment_id) {
        try {
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.post(
                `${API_ROOT_URL}/customer/appointment/${appointment_id}/cancel`, //Check the endpoint
                {
                    appointment_id: appointment_id
                },
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateTimeSlotAvailability(time_slot_id) {
        try {
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.post(
                `${API_ROOT_URL}/customer/time-slot/${time_slot_id}/availability`, 
                { is_available: 1 }, // set is_available to 1
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}


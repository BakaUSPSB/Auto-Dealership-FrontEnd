import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class GarageService {

    static async getGarageVehicles(customer_id) {
        try {
            const customer_id = localStorage.getItem("id"); // get the customer id from local storage
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.get(
                `${API_ROOT_URL}/customer/vehicles/${customer_id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async scheduleGarageService(data) {
        try {
            const token = localStorage.getItem("token"); // get the token from local storage
            const customer_id = localStorage.getItem("id"); // get the customer id from local storage
            const response = await axios.post(
                `${API_ROOT_URL}/customer/appointment/service`,  
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getServiceTimeSlots() {
        try {
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.get(
                `${API_ROOT_URL}/customer/time-slots/service/available`, 
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
                { is_available: 0 }, // set is_available to 0
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async addCustomerVehicle(data) {
        try {
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.post(
                `${API_ROOT_URL}/customer/vehicle`, 
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteCustomerVehicle(customer_vehicle_id) {
        try {
            const token = localStorage.getItem("token"); // get the token from local storage
            const response = await axios.delete(
                `${API_ROOT_URL}/customer/vehicle/${customer_vehicle_id}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            ); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


}
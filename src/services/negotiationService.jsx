import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class negotiationService {

    static async negotiation(vehicleId, price,text) {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const response = await axios
            .post(`${API_ROOT_URL}/customer/negotiation/negotiation`, { 
                vehicle_id: vehicleId,
                offer_price: price,
                message: text
            },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async negotiations() {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const response = await axios
            .get(`${API_ROOT_URL}/customer/negotiation/negotiations`, 
            {},
            {headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async negotiation_details() {
        try {
            const token = localStorage.getItem('token');
            const negotiation_id = localStorage.getItem('negotiation_id');
            const response = await axios
            .post(`${API_ROOT_URL}/customer/negotiation/negotiation/${negotiation_id}`, 
            {},
            {headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async negotiation_offer(price,text) {
        try {
            const token = localStorage.getItem('token');
            const negotiation_id = localStorage.getItem('negotiation_id');
            const response = await axios
            .get(`${API_ROOT_URL}/customer/negotiation/negotiation/${negotiation_id}/offer`, 
            {
                offer_price: price,
                message: text
            },
            {headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async negotiation_offer_accept() {
        try {
            const token = localStorage.getItem('token');
            const negotiation_id = localStorage.getItem('negotiation_id');
            const response = await axios
            .post(`${API_ROOT_URL}/customer/negotiation/negotiation/${negotiation_id}/offer/accept`, 
            {},
            {headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async negotiation_offer_reject() {
        try {
            const token = localStorage.getItem('token');
            const negotiation_id = localStorage.getItem('negotiation_id');
            const response = await axios
            .post(`${API_ROOT_URL}/customer/negotiation/negotiation/${negotiation_id}/offer/reject`, 
            {},
            {headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }




}
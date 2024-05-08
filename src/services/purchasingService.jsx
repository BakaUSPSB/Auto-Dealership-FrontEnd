import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class PurchasingService {

    // Makes a purchase for the currently set negotiation ID
    static async purchase() {
        try {
            const token = localStorage.getItem('token');
            const negotiationId = localStorage.getItem('negotiation_id');
            const response = await axios.post(
                `${API_ROOT_URL}/customer/purchase`,
                { negotiation_id: negotiationId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in purchase:", error);
            return null;
        }
    }

    // Retrieves all purchases for the current customer
    static async purchases() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_ROOT_URL}/customer/purchases`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in purchases:", error);
            return null;
        }
    }

    // Retrieves the details of a specific purchase
    static async purchase_details(purchaseId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_ROOT_URL}/customer/purchase/${purchaseId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in purchase_details:", error);
            return null;
        }
    }

    // Adds addons to a purchase
    static async purchase_addons(purchaseId, addons) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_ROOT_URL}/customer/purchase/${purchaseId}/addons`,
                { addons },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in purchase_addons:", error);
            return null;
        }
    }

    // Creates a contract for a specific purchase
    static async purchase_contract(purchaseId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_ROOT_URL}/customer/purchase/${purchaseId}/contract`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in purchase_contract:", error);
            return null;
        }
    }

    // Retrieves the contract for a specific purchase
    static async get_purchase_contract(purchaseId) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_ROOT_URL}/customer/purchase/${purchaseId}/contract`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in get_purchase_contract:", error);
            return null;
        }
    }

    // Signs a contract for a specific purchase
    static async sign_contract(purchaseId, name) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_ROOT_URL}/customer/purchase/${purchaseId}/contract/sign`,
                { signature: name },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in sign_contract:", error);
            return null;
        }
    }

    // Makes a payment for a specific purchase
    static async payment(purchaseId, account_num, routing_num) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_ROOT_URL}/customer/purchase/${purchaseId}/payment`,
                { account_number: account_num, routing_number: routing_num },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error("Error in payment:", error);
            return null;
        }
    }
}

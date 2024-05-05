import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class PurchasingService {

    static async purchase() {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const negotiationId = localStorage.getItem('negotiation_id');
            const response = await axios
            .post(`${API_ROOT_URL}/customer/purchase`, { 
                negotiation_id: negotiationId
            },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async purchases() {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const response = await axios
            .get(`${API_ROOT_URL}/customer/purchases`, 
            {},
            {headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async purchase_details() {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const purchase_id = localStorage.getItem('purchase__id');
            const response = await axios
            .get(`${API_ROOT_URL}/customer/purchase${purchase_id}`, { 
                negotiation_id: negotiationId
            },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    // NEED TO FIGURE OUT HOW TO PASS THE ADDONS EITHER ARRAY OR BIG NUMBER

    // static async purchase_addons() {
    //     try {
    //         const token = localStorage.getItem('token'); // get the token from local storage
    //         const purchase_id = localStorage.getItem('purchase__id');
    //         const response = await axios
    //         .post(`${API_ROOT_URL}/customer/purchase${purchase_id}`, { 
    //             negotiation_id: negotiationId
    //         },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // }


    static async purchase_contract() {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const purchase_id = localStorage.getItem('purchase__id');
            const response = await axios
            .post(`${API_ROOT_URL}/customer/purchase${purchase_id}/contract`, {
            },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async get_purchase_contract() {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const purchase_id = localStorage.getItem('purchase__id');
            const response = await axios
            .get(`${API_ROOT_URL}/customer/purchase${purchase_id}/contract`, {
            },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async sign_contract(name) {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const purchase_id = localStorage.getItem('purchase__id');
            const response = await axios
            .post(`${API_ROOT_URL}/customer/purchase${purchase_id}/contract/sign`, {
                signature: name
            },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async payment(account_num,routing_num) {
        try {
            const token = localStorage.getItem('token'); // get the token from local storage
            const purchase_id = localStorage.getItem('purchase__id');
            const response = await axios
            .post(`${API_ROOT_URL}/customer/purchase${purchase_id}/payment`, {
                account_number: account_num,
                routing_number: routing_num
            },{headers: { Authorization: `Bearer ${token}` }}); // pass the token in the header
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    


}
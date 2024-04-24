import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class adminLoginService {

    static async login(email, password) {
        try {
            const response = await axios
            .post(`${API_ROOT_URL}/auth/user/login`, { 
                email: email, 
                password: password 
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }




}
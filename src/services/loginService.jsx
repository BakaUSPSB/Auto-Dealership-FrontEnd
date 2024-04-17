import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class LoginService {

    static async login(email, password) {
        try {
            const response = await axios
            .post(`${API_ROOT_URL}/auth/customer/login`, { email, password });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async signup(firstName, lastName, email, password, dateOfBirth, driverLicenseNum) {
        try {
            const response = await axios
            .post(`${API_ROOT_URL}/auth/customer/register`, {
                first_name: firstName, 
                last_name: lastName, 
                email: email, 
                password: password, 
                birth_date: dateOfBirth, 
                drivers_license: driverLicenseNum
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


}
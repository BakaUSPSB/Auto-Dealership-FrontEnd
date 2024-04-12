import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class CarService {

    static async getVehicles(page, limit, search) {
        try {
            console.log(`${API_ROOT_URL}/inventory/vehicles?page=${page}&limit=${limit}&search=${search}`);
            const response = await axios
            .get(`${API_ROOT_URL}/inventory/vehicles?page=${page}&limit=${limit}&search=${search}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

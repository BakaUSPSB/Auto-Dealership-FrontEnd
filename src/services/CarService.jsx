import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class CarService {

    static async getVehicles(page, limit, search) {
        try {
            const response = await axios
            .get(`${API_ROOT_URL}/inventory/vehicles?page=${page}&limit=${limit}&query=${encodeURIComponent(search)}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

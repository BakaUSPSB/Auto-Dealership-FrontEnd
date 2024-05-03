import axios from 'axios';
import { API_ROOT_URL } from '../configs';

export default class SearchService {
    static async searchCars(queries) {
        try {
            const response = await axios.get(`${API_ROOT_URL}/inventory/vehicles`, {
                params: {
                    query: queries
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

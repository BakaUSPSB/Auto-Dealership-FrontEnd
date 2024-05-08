import axios from 'axios';
import {API_ROOT_URL} from '../configs';

export default class CarService {

    static async getVehicles(page, limit, searchBar, filters) {
        let finalFilters = ""
        for (let filter in filters) {
            let val = filters[filter];
            if (val != null) {
                console.log(filter + " : " + filters[filter]);
                finalFilters += ('&query=' + encodeURIComponent(filters[filter]));
            }
        }
        console.log(`${API_ROOT_URL}/inventory/vehicles?page=${page}&limit=${limit}&query=${encodeURIComponent(searchBar)}${finalFilters}`);
        try {
            const response = await axios
                .get(`${API_ROOT_URL}/inventory/vehicles?page=${page}&limit=${limit}&query=${encodeURIComponent(searchBar)}${finalFilters}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

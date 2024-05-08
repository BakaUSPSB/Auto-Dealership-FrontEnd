import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class VehicleService {
  static async getVehicleById(vehicle_id) {
    try {
      //console.log(vehicle_id);
      const response = await axios.get(
        `${API_ROOT_URL}/inventory/vehicle/${vehicle_id}`
      );
      //console.log(response.data);
      return response.data;
    } catch (error) {
      //console.error(error);
      throw new Error("Failed to fetch vehicle data");
    }
  }
}

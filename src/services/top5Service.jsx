import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class top5Service {
  static async getTop5() {
    try {
      const response = await axios.get(
        `${API_ROOT_URL}/inventory/top-vehicles`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

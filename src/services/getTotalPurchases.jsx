import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class getTotalPurchases {
  static async getTotalPurchases() {
    try {
      const response = await axios.get(
        `${API_ROOT_URL}/customer/purchases`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

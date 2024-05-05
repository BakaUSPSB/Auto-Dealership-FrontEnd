import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class schedulingService {
  static async scheduleTestDrive(timeID) {
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      const customerID = localStorage.getItem("id");
      const response = await axios.post(
        `${API_ROOT_URL}/customer/appointment/test-drive`,
        {
          customer_id: customerID,
          time_slot_id: timeID,
        },

        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

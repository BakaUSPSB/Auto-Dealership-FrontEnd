import axios from "axios";
import { API_ROOT_URL } from "../configs";
const token = localStorage.getItem("token");

export default class adminUsers {
  static async createUsers(email, password, firstName, lastName, role) {
    try {
      const response = await axios.post(
        `${API_ROOT_URL}/user/management/user`,
        {
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          role_id: role,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async getUsers() {
    try {
      const response = await axios.get(
        `${API_ROOT_URL}/user/management/users`,

        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

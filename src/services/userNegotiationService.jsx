import axios from "axios";
import { API_ROOT_URL } from "../configs";

export default class userNegotiationService {
  static async negotiations() {
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      const response = await axios.get(
        `${API_ROOT_URL}/user/negotiation/negotiations`,

        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async negotiation_details(negotiation_id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_ROOT_URL}/user/negotiation/negotiation/${negotiation_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async negotiation_offer(price, text, negotiation_id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_ROOT_URL}/user/negotiation/negotiation/${negotiation_id}/counter-offer`,
        {
          offer_price: price,
          message: text,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async negotiation_offer_accept(negotiation_id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_ROOT_URL}/user/negotiation/negotiation/${negotiation_id}/accept-offer`,
        {},

        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async negotiation_offer_reject(negotiation_id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_ROOT_URL}/user/negotiation/negotiation/${negotiation_id}/offer/reject`,

        { headers: { Authorization: `Bearer ${token}` } }
      ); // pass the token in the header
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

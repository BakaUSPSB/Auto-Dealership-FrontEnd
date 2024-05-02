import React from "react";
import { Button } from "react-bootstrap";
import userNegotiationService from "../services/userNegotiationService";
import negotiationService from "../services/negotiationService";

const RejectOffer = ({ negotiation_id }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("token") === null) {
        alert("You must be logged in to make an offer");
        return;
      }
      const role = localStorage.getItem("role");
      const service =
        role === "customer" ? negotiationService : userNegotiationService;
      const response = await service.negotiation_offer_reject(negotiation_id);
      if (response.code === 200) {
        alert("Offer was rejected");
      }
      if (response.code === 400) {
        alert("Offer is still active");
      }
    } catch (error) {}
  };

  return (
    <>
      <Button variant="danger" onClick={handleSubmit}>
        Reject
      </Button>
    </>
  );
};
export default RejectOffer;

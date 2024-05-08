import React, { useState } from "react";
import { Button } from "react-bootstrap";
import userNegotiationService from "../services/userNegotiationService";
import negotiationService from "../services/negotiationService";

const CounterOffer = ({ negotiation_id }) => {
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
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
      const response = await service.negotiation_offer(
        numberInput,
        textInput,
        negotiation_id
      );
      if (response.code === 200) {
        alert("Counter offer has been made");
      }
      if (response.code === 400) {
        alert("Offer has not been made");
      }
    } catch (error) {}
  };

  return (
    <>
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Message"
      />
      <input
        type="number"
        value={numberInput}
        onChange={(e) => setNumberInput(e.target.value)}
        placeholder="Offer"
      />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default CounterOffer;

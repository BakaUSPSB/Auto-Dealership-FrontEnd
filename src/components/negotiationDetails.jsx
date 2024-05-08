import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import userNegotiationService from "../services/userNegotiationService";
import negotiationService from "../services/negotiationService";
import RejectOffer from "./rejectOffer";
import AcceptOffer from "./agreeOffer";

const NegotiationDetails = ({ negotiationId }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const service =
      role === "customer" ? negotiationService : userNegotiationService;

    service
      .negotiation_details(negotiationId) // Assuming the service has a getDetails method that takes a vehicle_id
      .then((response) => {
        if (response.code === 200) {
          setDetails(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching negotiation details:", error);
      });
  }, [negotiationId]);

  let counter = 0;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Offer Date</th>
          <th>Offer Price</th>
          <th>Message</th>
          <th>Offer Status</th>
          <th>Offer Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {details?.offers.map((offer, index, offers) => {
          const isManager = counter % 2 !== 0;
          const isLastOffer = index === offers.length - 1;

          counter++;
          return (
            <tr key={offer.offer_id}>
              <td>{isManager ? "Manager" : "Me"}</td>
              <td>{offer.offer_date}</td>
              <td>${offer.offer_price}</td>
              <td>{offer.message}</td>
              <td>{offer.offer_status}</td>
              <td>
                {" "}
                {isManager && isLastOffer && (
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <AcceptOffer negotiation_id={negotiationId} />
                    <RejectOffer negotiation_id={negotiationId} />
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default NegotiationDetails;

import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap'; // Import React Bootstrap components

const NegotiationTable = () => {
  const initialNegotiations = [
    { id: 1, firstName: 'Jon', lastName: 'Snow', counterOffer: 45000, offer: '' },
    { id: 2, firstName: 'Cersei', lastName: 'Lannister', counterOffer: 60000, offer: '' },
    // Add more rows as needed
  ];

  const [negotiations, setNegotiations] = useState(initialNegotiations);

  const handleOfferChange = (id, value) => {
    setNegotiations((prevNegotiations) =>
      prevNegotiations.map((negotiation) =>
        negotiation.id === id ? { ...negotiation, offer: value } : negotiation
      )
    );
  };

  const handleRowSubmit = (id) => {
    console.log(`Negotiation ID ${id} offer submitted: ${negotiations.find((n) => n.id === id).offer}`);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Negotiation ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Counter Offer</th>
          <th>Your Offer</th>
          <th>Submit</th>
        </tr>
      </thead>
      <tbody>
        {negotiations.map((negotiation) => (
          <tr key={negotiation.id}>
            <td>{negotiation.id}</td>
            <td>{negotiation.firstName}</td>
            <td>{negotiation.lastName}</td>
            <td>${negotiation.counterOffer}</td>
            <td>
              <input
                type="text"
                className="form-control"
                value={negotiation.offer}
                onChange={(e) => handleOfferChange(negotiation.id, e.target.value)}
              />
            </td>
            <td>
              <Button variant="primary" onClick={() => handleRowSubmit(negotiation.id)}>
                Submit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default NegotiationTable;

import React from 'react';
import { Card, Table } from 'react-bootstrap';

const PurchaseHistoryCard = ({ purchases }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Purchase History</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle</th>
              <th>Price</th>
              <th>Date of Purchase</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{purchase.vehicle}</td>
                <td>${purchase.price}</td>
                <td>{purchase.date}</td>
                <td>{purchase.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default PurchaseHistoryCard;

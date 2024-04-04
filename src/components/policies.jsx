import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PoliciesTable = () => {
  const policies = [
    { name: 'Wiper Change', description: 'Replace old wipers with new ones' },
    { name: 'Brake Change', description: 'Replace worn-out brake pads and rotors' },
    { name: 'Oil Change', description: 'Replace engine oil and oil filter' },
    { name: 'Tire Change/Rotation', description: 'Replace tires or rotate existing tires for even wear' }
  ];

  const handleEdit = (policy) => {
    // Handle edit logic here
    console.log('Editing policy:', policy);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Policy</th>
          <th>Description</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy, index) => (
          <tr key={index}>
            <td>{policy.name}</td>
            <td>{policy.description}</td>
            <td>
              <Button onClick={() => handleEdit(policy)}>Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PoliciesTable;

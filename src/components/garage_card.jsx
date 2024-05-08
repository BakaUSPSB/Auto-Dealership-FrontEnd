import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const Garage = ({ vehicles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemove = (index) => {
    // You can implement the removal logic here
    console.log('Remove vehicle at index:', index);
  };

  return (
    <div>
      <h2>Garage</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Action</th> {/* Added new header for action */}
          </tr>
        </thead>
        <tbody>
          {currentVehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>{indexOfFirstVehicle + index + 1}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(index)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleChangePage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Garage;

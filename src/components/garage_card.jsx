import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table, Modal } from "react-bootstrap";
import GarageService from '../services/garageService';
import GarageServiceForm from '../components/GarageServiceForm';
import AddCustomerVehicle from '../components/addCustomerVehicle';
import RemoveCustomerVehicle from '../components/removeCustomerVehicle';

const Garage = ({ customer_id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [customerVehicleId, setCustomerVehicleId] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeSlotId, setTimeSlotId] = useState(null);
  const [services, setServices] = useState([]);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showRemoveVehicleModal, setShowRemoveVehicleModal] = useState(false);

  useEffect(() => {
    GarageService.getGarageVehicles(customer_id)
      .then((response) => {
        setResponse(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching garage vehicles: ", error);
        setIsLoading(false);
      });
  }, [customer_id]);

  const handleService = (data)=> {
    setShowServiceForm(true);
    setCustomerVehicleId(data.customer_vehicle_id);
    setTimeSlotId(data.time_slot_id);
    setServices(data.services);
  };

  const handleServiceFormSubmit = async (event, Checkdata) => {
    console.log('Form submitted with event:', event);
    console.log('Form submitted with data:', Checkdata);

    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.customer_id = localStorage.getItem("id");
    data.time_slot_id = parseInt(formData.get('time_slot_id'));
    data.customer_vehicle_id = parseInt(customerVehicleId);
    data.customer_note = formData.get('customer_note') || 'No notes added...';
    data.technician_note = formData.get('technician_note') || 'No notes added...';

    const services = formData.getAll('services');
    data.services = services.length ? services.map(service_id => ({ service_id: parseInt(service_id) })) : [];

    console.log('Service form submitted with data:', data);

    try{
      const response = await GarageService.scheduleGarageService(Checkdata);
      if (response) {
        console.log('Service scheduled successfully',response);
      } else {
        console.error('Error scheduling service');
      }
    } catch (error) {
        console.log('Service vehicle at index:', error);
    };

    //update time slot availability
    try{
      const response = await GarageService.updateTimeSlotAvailability(Checkdata.time_slot_id);
      if (response) {
        console.log('Time slot availability updated successfully',response);
      } else {
        console.error('Error updating time slot availability');
      }
    } catch (error) {
        console.log('Error updating time slot availability:', error);
    };

    handleService(data);
    setShowServiceForm(false);
  };

  const handleServiceFormCancel = () => {
    setShowServiceForm(false);
  };

  const handleShowModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
    console.log('Show modal for vehicle:', vehicle);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setShowModal(false);
    console.log('Close modal');
  };

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = response.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const totalPages = Math.ceil(response.length / vehiclesPerPage);

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemove = (index) => {
    // You can implement the removal logic here
    console.log('Remove vehicle at index:', index);
  };

  const handleAddVehicleModal = () => setShowAddVehicleModal(true);
  const handleCloseAddVehicleModal = () => setShowAddVehicleModal(false);

  const handleRemoveVehicleModal = () => setShowRemoveVehicleModal(true);
  const handleCloseRemoveVehicleModal = () => setShowRemoveVehicleModal(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error fetching garage vehicles</h1>;
  }


  return (
    <div>
      <h2>Garage</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vin Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentVehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{vehicle.vin}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>
                <Button variant="primary" onClick={(event) => handleService(vehicle.customer_vehicle_id)}>Request Service</Button> {' '}
                {showServiceForm && (
                    <GarageServiceForm onSubmit={handleServiceFormSubmit} onCancel={handleServiceFormCancel} customerVehicleId={vehicle.customer_vehicle_id}/>
                )} {' '}
                <RemoveCustomerVehicle customerVehicleId={vehicle.customer_vehicle_id}/> {' '}
                <Button variant="secondary" onClick={(event) => handleShowModal(vehicle)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Vin Number: </b> {selectedVehicle && selectedVehicle.vin}</p>
          <p><b>Make: </b> {selectedVehicle && selectedVehicle.make}</p>
          <p><b>Model: </b> {selectedVehicle && selectedVehicle.model}</p>
          <p><b>Year: </b> {selectedVehicle && selectedVehicle.year}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Exit</Button>
        </Modal.Footer>
      </Modal>      
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handleChangePage(index + 1)}>
                {index + 1}
              </button>
              <p>Showing page {currentPage} of {totalPages}</p>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Container>
          <AddCustomerVehicle show={showAddVehicleModal} handleClose={handleCloseAddVehicleModal}/>
        </Container>  
      </div>
    </div>
  );
};

export default Garage;

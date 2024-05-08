import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import GarageService from '../services/garageService';

const GarageServiceForm = ({ onSubmit, onCancel, customerVehicleId }) => {
  const [timeSlotId, setTimeSlotId] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [technicianNote, setTechnicianNote] = useState('No notes added yet...');
  const [services, setServices] = useState({
    "oil change": false,
    "tire rotation": false,
    "brake replacement": false,
    "battery replacement": false,
    "windshield wiper replacement": false
  });

  const serviceIdMapping = {
    'oil change': 1,
    'tire rotation': 2,
    'brake replacement': 3,
    'battery replacement': 4,
    'windshield wiper replacement': 5,
  };

  const handleServiceChange = (event) => {
    setServices({ ...services, [event.target.name]: event.target.checked });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!timeSlotId) {
      alert('Time slot is required. Please select a time slot to proceed.');
      return;
    }

    const servicesArray = Object.entries(services)
        .filter(([serviceName, isChecked]) => isChecked)
        .map(([serviceName, isChecked]) => {
            return { service_id: serviceIdMapping[serviceName] };
        });


    const data = {
        customer_id: localStorage.getItem("id"),
        time_slot_id: parseInt(timeSlotId), // parse timeSlotId to an integer
        customer_vehicle_id: parseInt(customerVehicleId),
        customer_note: customerNote || 'No notes added...',
        technician_note: technicianNote || 'No notes added...',
        services: servicesArray
      };

    console.log('Service form submitted with data:', data);

    onSubmit(event, data);
  };

  useEffect(() => {
    GarageService.getServiceTimeSlots()
      .then((response) => {
        if (response && response.data && Array.isArray(response.data.time_slots)) {
          setTimeSlots(response.data.time_slots);
        } else {
          console.error('Invalid data format for service time slots:', response);
          setTimeSlots([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching service time slots:', error);
        setTimeSlots([]);
      });
  }, []);

  return (
    <Modal show={true} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Request Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Time Slot</Form.Label>
            <Form.Control as="select" value={timeSlotId} onChange={e => setTimeSlotId(e.target.value)}>
                {timeSlots.map((timeSlot) => (
                    <option key={timeSlot.time_slot_id} value={timeSlot.time_slot_id}>
                        {timeSlot.start_time} - {timeSlot.end_time}
                    </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Customer Note</Form.Label>
            <Form.Control type="text" value={customerNote} onChange={e => setCustomerNote(e.target.value)} />
            <option value="">Select...</option>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Technician Note</Form.Label>
            <Form.Control type="text" value={technicianNote} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" style={{backgroundColor: 'lightgray'}}>
            <Form.Label>Services</Form.Label>
            <Form.Check type="checkbox" label="Oil Change" name="oil change" checked={services["oil change"]} onChange={handleServiceChange} />
            <Form.Check type="checkbox" label="Tire Rotation" name="tire rotation" checked={services["tire rotation"]} onChange={handleServiceChange} />
            <Form.Check type="checkbox" label="Brake Replacement" name="brake replacement" checked={services["brake replacement"]} onChange={handleServiceChange} />
            <Form.Check type="checkbox" label="Battery Replacement" name="battery replacement" checked={services["battery replacement"]} onChange={handleServiceChange} />
            <Form.Check type="checkbox" label="Windshield Wiper Replacement" name="windshield wiper replacement" checked={services["windshield wiper replacement"]} onChange={handleServiceChange} />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button> {' '}
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GarageServiceForm;
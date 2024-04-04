import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'react-bootstrap';
import { addDays, startOfWeek, endOfWeek, isWeekend } from 'date-fns';

const ClientScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const vehicles = ['Car', 'Truck', 'SUV']; // Example list of vehicles

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const filterPastDates = (date) => {
    return date >= new Date();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submission logic here
    console.log('Date:', selectedDate);
    console.log('Selected Vehicle:', selectedVehicle);
  };

  return (
    <div>
      <h2>Schedule Appointment</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="datePicker">
          <Form.Label>Select Date:</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            filterDate={isWeekday}
            minDate={new Date()}
            maxDate={endOfWeek(addDays(new Date(), 7))}
          />
        </Form.Group>

        <Form.Group controlId="vehicleSelect">
          <Form.Label>Select Vehicle:</Form.Label>
          <Form.Control as="select" value={selectedVehicle} onChange={handleVehicleChange}>
            <option value="">Select...</option>
            {vehicles.map((vehicle, index) => (
              <option key={index} value={vehicle}>{vehicle}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ClientScheduling;

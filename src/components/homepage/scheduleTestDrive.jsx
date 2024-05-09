import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import moment from "moment";
import schedulingService from "../../services/schedulingService";

const ScheduleTestDrive = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);


  const formatTime = (time) => {
    const hour = moment.utc(time, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').hour();
    if (hour >= 9 && hour <= 12) {
      return moment.utc(time, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').format('MMMM D, YYYY, hh:mm A');
    } else if (hour >= 1 && hour <= 5) {
      return moment.utc(time, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').format('MMMM D, YYYY, hh:mm') + ' PM';
    } else {
      return moment.utc(time, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').format('MMMM D, YYYY, HH:mm');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await schedulingService.getAvailableTestDrive();
        if (response.code === 200) {
          setTimeSlots(response.data.time_slots);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    try {
      const response = await schedulingService.scheduleTestDrive(
        selectedTimeSlotId
      );
      if (response.code === 201) {
        alert("Test drive scheduled successfully");
      }
    } catch (error) {
      console.error("Error scheduling test drive:", error);
    }
  };

  return (
    <div id="scheduleTestDriveContainer">
      <div id="datePickerContainer" style={{ display: "flex" }}>
        <Form.Control as="select" value={selectedTimeSlotId} onChange={e => setSelectedTimeSlotId(e.target.value)}>
          <option value="">Select a time for a test drive...</option>
          {timeSlots.sort((a, b) => a.time_slot_id - b.time_slot_id).map((timeSlot) => (
            <option key={timeSlot.time_slot_id} value={timeSlot.time_slot_id}>
              {formatTime(timeSlot.start_time)} - {formatTime(timeSlot.end_time)}
            </option>
          ))}
        </Form.Control>
        {selectedTimeSlotId && (
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={handleClick}
          >
            Confirm Test-Drive Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleTestDrive;
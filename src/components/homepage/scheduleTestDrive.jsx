import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import schedulingService from "../../services/schedulingService";

const ScheduleTestDrive = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);

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

  const disabledTimeIntervals = () => {
    return timeSlots.map((slot) => ({
      startTime: moment(slot.start_time),
      endTime: moment(slot.end_time),
      isAvailable: slot.is_available === 1,
      timeSlotId: slot.time_slot_id,
    }));
  };

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
    setSelectedTimeSlotId(null); // Reset selectedTimeSlotId when date changes

    // Find the corresponding time slot when date changes
    const selectedTime = moment(date);
    const slot = disabledTimeIntervals().find((interval) => {
      return (
        selectedTime.isSameOrAfter(interval.startTime) &&
        selectedTime.isBefore(interval.endTime) &&
        interval.isAvailable
      );
    });
    if (slot) {
      setSelectedTimeSlotId(slot.timeSlotId);
    }
  };

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
        <DatePicker
          id="testDriveDatePicker"
          selected={selectedDateTime}
          onChange={handleDateTimeChange} // Handle both date and time changes
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          filterTime={(time) => {
            return disabledTimeIntervals().some((interval) => {
              return (
                new Date(time) >= interval.startTime.toDate() &&
                new Date(time) <= interval.endTime.toDate() &&
                interval.isAvailable
              );
            });
          }}
        />
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

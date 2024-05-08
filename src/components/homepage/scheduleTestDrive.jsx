import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import schedulingService from "../../services/schedulingService";

const ScheduleTestDrive = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

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
    }));
  };

  return (
    <div id="scheduleTestDriveContainer">
      <div id="datePickerContainer">
        <DatePicker
          id="testDriveDatePicker"
          selected={selectedDate}
          onChange={setSelectedDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          filterTime={(time) => {
            return disabledTimeIntervals().some((interval) => {
              return (
                new Date(time) >= new Date(interval.startTime) &&
                new Date(time) <= new Date(interval.endTime) &&
                interval.isAvailable
              );
            });
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleTestDrive;

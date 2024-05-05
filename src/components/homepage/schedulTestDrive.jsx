import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DatepickerWithTimeSlots = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const disabledTimeIntervals = () => {
    const intervals = [];
    const startOfMonth = moment(selectedDate).startOf("month");
    const endOfMonth = moment(selectedDate).endOf("month");

    let currentSlot = startOfMonth.clone();

    while (currentSlot.isSameOrBefore(endOfMonth)) {
      intervals.push({
        startTime: currentSlot.clone(),
        endTime: currentSlot.add(30, "minutes").clone(),
      });
    }

    return intervals;
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date()}
        filterTime={disabledTimeIntervals}
      />
    </div>
  );
};

export default DatepickerWithTimeSlots;

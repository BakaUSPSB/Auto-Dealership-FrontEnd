import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/styles.css'

const DateOfBirthPicker = ({ selectedDate, handleChange }) => {
    return (
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText="Select date of birth"
        calendarContainer={document.querySelector('.date-picker-container')} // Specify the container element
      />
    );
  };

export default DateOfBirthPicker;

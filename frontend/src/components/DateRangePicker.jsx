import React, { useState } from "react";
import styles from "./cssModules/DateRangePicker.module.css"; // Import CSS Module

const DateRangePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("Mar 2th");
  const [endDate, setEndDate] = useState("Mar 20th");
  const [selectedStartDate, setSelectedStartDate] = useState({ date: "", fullDate: "" });
  const [selectedEndDate, setSelectedEndDate] = useState({ date: "", fullDate: "" });

  const handleDateChange = (e, type) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleString("en-US", { month: "short", day: "numeric" }); // "Feb 9th"
    const fullFormattedDate = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" }); // "Feb 9th, 2025"

    if (type === "start") {
      setSelectedStartDate({ date: formattedDate, fullDate: fullFormattedDate });
    } else {
      setSelectedEndDate({ date: formattedDate, fullDate: fullFormattedDate });
    }
  };

  const handleDone = () => {
    if (selectedStartDate.date) setStartDate(selectedStartDate.date);
    if (selectedEndDate.date) setEndDate(selectedEndDate.date);

    console.log("Selected Start Date:", selectedStartDate.fullDate || startDate);
    console.log("Selected End Date:", selectedEndDate.fullDate || endDate);

    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className={styles.datePickerContainer}>
      {/* Button to open the picker */}
      <button className={styles.datePickerButton} onClick={() => setIsOpen(!isOpen)}>
        <img src="/calender.svg" alt="Calendar" className={styles.icon} />
        <span>{startDate} to {endDate}</span>
        <span className={styles.arrow}><img src="/down.svg" alt="Arrow" /></span>
      </button>

      {/* Date Picker Dropdown */}
      {isOpen && (
        <div className={styles.datePickerDropdown}>
          <label>Start Date:</label>
          <input type="date" onChange={(e) => handleDateChange(e, "start")} />

          <label>End Date:</label>
          <input type="date" onChange={(e) => handleDateChange(e, "end")} />

          <button onClick={handleDone} className={styles.doneButton}>Done</button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

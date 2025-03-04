import React, { useState } from "react";
import styles from "./cssModules/DateRangePicker.module.css"; // Import CSS Module

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState({ date: null, fullDate: null });
  const [selectedEndDate, setSelectedEndDate] = useState({ date: null, fullDate: null });

  const handleDateChange = (e, type) => {
    const date = e.target.value ? new Date(e.target.value) : null;

    if (date) {
      const formattedDate = date.toLocaleString("en-US", { month: "short", day: "numeric" }); // Example: "Mar 2"
      const fullFormattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format for comparison

      if (type === "start") {
        setSelectedStartDate({ date: formattedDate, fullDate: fullFormattedDate });
        setSelectedEndDate((prev) =>
          prev.fullDate && new Date(prev.fullDate) <= date ? { date: null, fullDate: null } : prev
        );
      } else if (type === "end" && (!selectedStartDate.fullDate || date > new Date(selectedStartDate.fullDate))) {
        setSelectedEndDate({ date: formattedDate, fullDate: fullFormattedDate });
      }
    } else {
      // If user clears the input, reset the state
      if (type === "start") {
        setSelectedStartDate({ date: "", fullDate: "" });
        setSelectedEndDate({ date: "", fullDate: "" });
      } else {
        setSelectedEndDate({ date: "", fullDate: "" });
      }
    }
  };

  const handleDone = () => {
    // If both dates are selected, send them to parent, otherwise send null
    const finalStartDate = selectedStartDate.date ? selectedStartDate.fullDate : null;
    const finalEndDate = selectedEndDate.date ? selectedEndDate.fullDate : null;

    onDateChange(finalStartDate, finalEndDate);
    setIsOpen(false); // Close the dropdown
  };

  // Determine the text to display in the button
  const displayText = startDate && endDate ? `${selectedStartDate.date} to ${selectedEndDate.date}` : "Select Dates";

  return (
    <div className={styles.datePickerContainer}>
      {/* Button to open the picker */}
      <button className={styles.datePickerButton} onClick={() => setIsOpen(!isOpen)}>
        <img src="/calender.svg" alt="Calendar" className={styles.icon} />
        <span>{displayText}</span>
        <span className={styles.arrow}><img src="/down.svg" alt="Arrow" /></span>
      </button>

      {/* Date Picker Dropdown */}
      {isOpen && (
        <div className={styles.datePickerDropdown}>
          <label>Start Date:</label>
          <input
            type="date"
            onChange={(e) => handleDateChange(e, "start")}
          />

          <label>End Date:</label>
          <input
            type="date"
            min={selectedStartDate.fullDate ? new Date(new Date(selectedStartDate.fullDate).setDate(new Date(selectedStartDate.fullDate).getDate() + 1)).toISOString().split("T")[0] : ""}
            onChange={(e) => handleDateChange(e, "end")}
          />

          <button onClick={handleDone} className={styles.doneButton}>Done</button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

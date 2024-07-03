import React, { useRef } from "react";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import "./InputFields.css";

const InputFields = ({
  task,
  setTask,
  dueDate,
  setDueDate,
  dueTime,
  setDueTime,
  description,
  setDescription,
  handleSubmit,
  editIndex,
}) => {
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const handleIconClick = (inputRef) => {
    inputRef.current.showPicker();
  };

  return (
    <div className="form-container">
      <input
        type="text"
        value={task}
        placeholder="Enter task..."
        onChange={(e) => setTask(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        value={description}
        placeholder="Enter description (optional)"
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <div className="icon-input-container">
        <IoCalendarOutline
          className="icon"
          onClick={() => handleIconClick(dateInputRef)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          ref={dateInputRef}
          className="hidden-date-time-input"
        />
        <IoTimeOutline
          className="icon"
          onClick={() => handleIconClick(timeInputRef)}
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          ref={timeInputRef}
          className="hidden-date-time-input"
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">
        {editIndex !== null ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default InputFields;

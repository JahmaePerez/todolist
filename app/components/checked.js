import React from "react";

const CompletedTasks = ({
  sortedData,
  formatDateTime,
  formatDueTime,
  handleCheck,
  handleDelete,
  isEditing,
}) => {
  const handleMouseEnter = (event) => {
    const iconName = event.target.getAttribute("name");
    if (iconName === "trash-outline") {
      event.target.setAttribute("name", "trash");
    }
  };

  const handleMouseLeave = (event) => {
    const iconName = event.target.getAttribute("name");
    if (iconName === "trash") {
      event.target.setAttribute("name", "trash-outline");
    }
  };

  return (
    <div className="completed-tasks-container">
      <h2>Completed Tasks</h2>
      <ul className="completed-task-list">
        {sortedData
          .filter((item) => item.checked)
          .map((item) => (
            <li key={item.id} className="task-item">
              <div className="task-details">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                  />
                </div>
                <p className="modified-date">
                  {formatDateTime(item.modifiedDate)}
                </p>
                <p
                  style={{
                    textDecoration: item.checked ? "line-through" : "none",
                  }}
                >
                  <strong>Task:</strong> {item.task}
                </p>
                <p
                  style={{
                    textDecoration: item.checked ? "line-through" : "none",
                  }}
                >
                  <strong>Due Date:</strong> {item.dueDate}{" "}
                  {formatDueTime(item.dueTime)}
                </p>
                {item.description && (
                  <p
                    style={{
                      textDecoration: item.checked ? "line-through" : "none",
                    }}
                  >
                    <strong>Description:</strong> {item.description}
                  </p>
                )}
              </div>
              <div className="task-actions">
                <ion-icon
                  name="trash-outline"
                  onClick={() => handleDelete(item.id)}
                  disabled={isEditing}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                ></ion-icon>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;

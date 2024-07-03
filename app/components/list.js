import React from "react";

const TaskList = ({
  sortedData,
  formatDateTime,
  formatDueTime,
  handleCheck,
  handleEdit,
  handleDelete,
  isEditing,
}) => {
  const handleMouseEnter = (event) => {
    if (!isEditing) {
      const iconName = event.target.getAttribute("name");
      if (iconName === "create-outline") {
        event.target.setAttribute("name", "create");
      } else if (iconName === "trash-outline") {
        event.target.setAttribute("name", "trash");
      }
    }
  };

  const handleMouseLeave = (event) => {
    if (!isEditing) {
      const iconName = event.target.getAttribute("name");
      if (iconName === "create") {
        event.target.setAttribute("name", "create-outline");
      } else if (iconName === "trash") {
        event.target.setAttribute("name", "trash-outline");
      }
    }
  };

  const handleEditClick = (itemId) => {
    if (!isEditing) {
      handleEdit(itemId);
    }
  };

  const handleDeleteClick = (itemId) => {
    if (!isEditing) {
      handleDelete(itemId);
    }
  };

  return (
    <div className="list-container">
      <h2>Task List</h2>
      <ul className="task-list">
        {sortedData
          .filter((item) => !item.checked)
          .map((item) => (
            <li key={item.id} className="task-item">
              <div className="task-details">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                    disabled={isEditing}
                    className={isEditing ? "checkbox-disabled" : ""}
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
                  name="create-outline"
                  onClick={() => handleEditClick(item.id)}
                  disabled={isEditing || item.checked}
                  className={`icon-edit ${
                    isEditing || item.checked ? "icon-disabled" : ""
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                ></ion-icon>
                <ion-icon
                  name="trash-outline"
                  onClick={() => handleDeleteClick(item.id)}
                  disabled={isEditing}
                  className={`icon-trash ${isEditing ? "icon-disabled" : ""}`}
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

export default TaskList;

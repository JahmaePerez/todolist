import React from "react";

const SortSelection = ({ sortType, handleSort }) => {
  return (
    <div className="sort-container">
      <select value={sortType} onChange={(e) => handleSort(e.target.value)}>
        <option value="">Sort by...</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="dateModified">Date Modified</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
};

export default SortSelection;

"use client";

import React, { useEffect, useState, useRef } from "react";
import InputFields from "./components/input_fields";
import SortSelection from "./components/sort";
import TaskList from "./components/list";
import CompletedTasks from "./components/checked";

const Todo = () => {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortType, setSortType] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setData(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      localStorage.removeItem("tasks");
    } else {
      localStorage.setItem("tasks", JSON.stringify(data));
    }
  }, [data]);

  const generateId = () => {
    return Math.floor(Math.random() * 900) + 100;
  };

  const handleSubmit = () => {
    if (task && dueDate && dueTime) {
      const payload = {
        id: generateId(),
        task,
        dueDate,
        dueTime,
        description,
        checked: false,
        modifiedDate: new Date().toISOString(), 
      };

      if (editIndex !== null) {
        setData((prev) =>
          prev.map((item, index) => (index === editIndex ? payload : item))
        );
        setEditIndex(null);
        setIsEditing(false);
      } else {
        setData((prev) => [...prev, payload]);
      }
      setTask("");
      setDueDate("");
      setDueTime("");
      setDescription("");
    } else {
      alert("Task, Due Date, and Due Time are required");
    }
  };

  const handleEdit = (id) => {
    const index = data.findIndex((item) => item.id === id);
    const item = data[index];
    setTask(item.task);
    setDueDate(item.dueDate);
    setDueTime(item.dueTime);
    setDescription(item.description);
    setEditIndex(index);
    setIsEditing(true);


    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); 
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    if (editIndex !== null && data[editIndex].id === id) {
      setTask("");
      setDueDate("");
      setDueTime("");
      setDescription("");
      setEditIndex(null);
      setIsEditing(false);
    }
  };

  const handleCheck = (id) => {
    if (!isEditing) {
      setData((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, checked: !item.checked };
          }
          return item;
        })
      );
    }
  };

  const handleSort = (value) => {
    setSortType(value);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDueTime = (timeString) => {
    return new Date(`01/01/2023 ${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedData = [...data].sort((a, b) => {
    switch (sortType) {
      case "alphabetical":
        return a.task.localeCompare(b.task);
      case "dateModified":
        return new Date(b.modifiedDate) - new Date(a.modifiedDate);
      case "dueDate":
        return (
          new Date(a.dueDate + " " + a.dueTime) -
          new Date(b.dueDate + " " + b.dueTime)
        );
      default:
        return 0;
    }
  });

  return (
    <div className="todo-container" ref={formRef}>
      <h1>Todo List</h1>
      <InputFields
        task={task}
        setTask={setTask}
        dueDate={dueDate}
        setDueDate={setDueDate}
        dueTime={dueTime}
        setDueTime={setDueTime}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        editIndex={editIndex}
        formRef={formRef}
      />
      <SortSelection sortType={sortType} handleSort={handleSort} />
      <div className="todo-content">
        <div className="task-list">
          <TaskList
            sortedData={sortedData}
            formatDateTime={formatDateTime}
            formatDueTime={formatDueTime}
            handleCheck={handleCheck}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isEditing={isEditing}
          />
        </div>
        <div className="completed-tasks">
          <CompletedTasks
            sortedData={sortedData}
            formatDateTime={formatDateTime}
            formatDueTime={formatDueTime}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;

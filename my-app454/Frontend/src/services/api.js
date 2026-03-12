import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with live backend URL
  headers: { "Content-Type": "application/json" },
});

// Employee APIs
export const addEmployee = async (data) => {
  const res = await API.post("/api/employees/", data);
  return res.data; // Return only the created employee
};

export const getEmployees = async () => {
  const res = await API.get("/api/employees/");
  return res.data; // Return the array of employees
};

export const deleteEmployee = async (id) => {
  const res = await API.delete(`/api/employees/${id}/`);
  return res.data; // Optional: return deleted object or status
};

// Attendance APIs
export const markAttendance = async (data) => {
  const res = await API.post("/api/attendance/", data);
  return res.data;
};

export const getAttendance = async (employeeId) => {
  const res = await API.get(`/api/attendance/${employeeId}/`);
  return res.data;
};

export default API;

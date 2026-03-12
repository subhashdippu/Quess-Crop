import { useState } from "react";
import { addEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!/\S+@\S+\.\S+/.test(employee.email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await addEmployee(employee);
      navigate("/employees");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error adding employee",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={employee.employeeId}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={employee.fullName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;

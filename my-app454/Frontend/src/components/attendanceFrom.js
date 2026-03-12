import { useEffect, useState } from "react";
import { getEmployees, markAttendance } from "../services/api";
import { useNavigate } from "react-router-dom";

function AttendanceForm() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({
    employee: "",
    date: "",
    status: "Present",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await markAttendance(attendance);
      navigate("/attendance");
    } catch (err) {
      setError(err.response?.data?.message || "Error marking attendance");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          name="employee"
          value={attendance.employee}
          onChange={(e) =>
            setAttendance({ ...attendance, employee: e.target.value })
          }
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.fullName} ({emp.employeeId})
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={attendance.date}
          onChange={(e) =>
            setAttendance({ ...attendance, date: e.target.value })
          }
          className="input input-bordered w-full"
          required
        />
        <select
          name="status"
          value={attendance.status}
          onChange={(e) =>
            setAttendance({ ...attendance, status: e.target.value })
          }
          className="select select-bordered w-full"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn btn-primary mt-2">
          Mark Attendance
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;

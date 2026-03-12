import { useEffect, useState } from "react";
import { getEmployees, getAttendance } from "../services/api";

function AttendanceList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchAttendance = async (id) => {
    setLoading(true);
    try {
      const { data } = await getAttendance(id);
      setRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
    if (e.target.value) fetchAttendance(e.target.value);
    else setRecords([]);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
      <select
        value={selectedEmployee}
        onChange={handleChange}
        className="select select-bordered mb-4 w-full max-w-xs"
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.fullName} ({emp.employeeId})
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}
      {!loading && !records.length && <p>No attendance records.</p>}

      {records.length > 0 && (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec._id}>
                <td>{new Date(rec.date).toLocaleDateString()}</td>
                <td>{rec.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceList;

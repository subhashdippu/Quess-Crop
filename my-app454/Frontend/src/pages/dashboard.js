import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">HRMS Lite Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/employees" className="btn btn-primary">
          View Employees
        </Link>
        <Link to="/employees/add" className="btn btn-secondary">
          Add Employee
        </Link>
        <Link to="/attendance" className="btn btn-primary">
          View Attendance
        </Link>
        <Link to="/attendance/mark" className="btn btn-secondary">
          Mark Attendance
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

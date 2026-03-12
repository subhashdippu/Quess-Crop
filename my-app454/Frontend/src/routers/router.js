import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Dashboard from "../pages/dashboard";
import EmployeeForm from "../components/employeeFrom";
import EmployeeList from "../components/employeeList";
import AttendanceForm from "../components/attendanceFrom";
import AttendanceList from "../components/attendanceList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/employees/add",
        element: <EmployeeForm />,
      },
      {
        path: "/employees",
        element: <EmployeeList />,
      },
      {
        path: "/attendance",
        element: <AttendanceList />,
      },
      {
        path: "/attendance/form",
        element: <AttendanceForm />,
      },
    ],
  },
]);
export default router;

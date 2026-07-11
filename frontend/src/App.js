import Dashboard from "./components/Dashboard";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceHistory from "./components/AttendanceHistory";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleStudentAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <Navbar />

      <Dashboard />

<div
  style={{
    width: "700px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  }}
>
        <h2>Welcome Teacher 👨‍🏫</h2>

        <Dashboard />
        <AddStudent onStudentAdded={handleStudentAdded} />

        <StudentList refresh={refresh} />
        <AttendanceForm />
        <AttendanceHistory />
      </div>
    </div>
  );
}

export default App;
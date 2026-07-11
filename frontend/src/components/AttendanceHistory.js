import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceHistory() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await API.get("attendance/");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  return (
    <div className="mt-5">
      <h2>Attendance History</h2>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.student}</td>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceHistory;
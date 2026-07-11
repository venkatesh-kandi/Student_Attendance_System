import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [absentToday, setAbsentToday] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const studentsResponse = await API.get("students/");
      setTotalStudents(studentsResponse.data.length);

      const attendanceResponse = await API.get("attendance/");

      const today = new Date().toISOString().split("T")[0];

      const todayAttendance = attendanceResponse.data.filter(
        (record) => record.date === today
      );

      const present = todayAttendance.filter(
        (record) => record.status === "Present"
      ).length;

      const absent = todayAttendance.filter(
        (record) => record.status === "Absent"
      ).length;

      setPresentToday(present);
      setAbsentToday(absent);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Students</h5>
              <h2>{totalStudents}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>Present Today</h5>
              <h2>{presentToday}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h5>Absent Today</h5>
              <h2>{absentToday}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
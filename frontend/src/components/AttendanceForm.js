import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceForm() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await API.get("students/");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const handleSubmit = async () => {
    try {
      for (const student of students) {
        const status = attendance[student.id];

        if (status) {
          await API.post("attendance/", {
            student: student.id,
            status: status,
          });
        }
      }

      alert("Attendance Saved Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving attendance.");
    }
  };

  return (
    <div className="mt-5">
      <h2>Mark Attendance</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.roll_number}</td>

              <td>
                <input
                  type="radio"
                  name={`attendance-${student.id}`}
                  value="Present"
                  onChange={() =>
                    handleStatusChange(student.id, "Present")
                  }
                />
              </td>

              <td>
                <input
                  type="radio"
                  name={`attendance-${student.id}`}
                  value="Absent"
                  onChange={() =>
                    handleStatusChange(student.id, "Absent")
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-success"
        onClick={handleSubmit}
      >
        Save Attendance
      </button>
    </div>
  );
}

export default AttendanceForm;
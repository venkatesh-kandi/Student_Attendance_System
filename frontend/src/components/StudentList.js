import { useEffect, useState } from "react";
import API from "../services/api";
import EditStudent from "./EditStudent";

function StudentList({ refresh }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const fetchStudents = async () => {
    try {
      const response = await API.get("students/");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await API.delete(`students/${id}/`);
        fetchStudents();
        alert("Student deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Error deleting student.");
      }
    }
  };

  return (
    <div className="mt-5">

      <h2>Student List</h2>
       
      <div className="mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="🔍 Search by Name or Roll Number"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students
  .filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.roll_number.toLowerCase().includes(search.toLowerCase())
  )
  .map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.roll_number}</td>
              <td>{student.department}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setSelectedStudent(student)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditStudent
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onUpdated={fetchStudents}
      />

    </div>
  );
}

export default StudentList;
import { useState } from "react";
import API from "../services/api";

function AddStudent({ onStudentAdded }) {
  const [student, setStudent] = useState({
    name: "",
    roll_number: "",
    department: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("students/", student);

      alert("Student Added Successfully!");

      setStudent({
        name: "",
        roll_number: "",
        department: "",
      });

      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error) {
      console.error(error);
      alert("Error adding student.");
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="roll_number"
          placeholder="Roll Number"
          value={student.roll_number}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
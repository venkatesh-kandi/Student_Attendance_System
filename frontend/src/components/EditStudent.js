import { useState, useEffect } from "react";
import API from "../services/api";

function EditStudent({ student, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    roll_number: "",
    department: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`students/${student.id}/`, formData);

      alert("Student Updated Successfully!");

      onUpdated();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  if (!student) return null;

  return (
    <div className="card p-3 mt-4">

      <h3>Edit Student</h3>

      <input
        className="form-control mb-2"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="roll_number"
        value={formData.roll_number}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="department"
        value={formData.department}
        onChange={handleChange}
      />

      <button
        className="btn btn-success"
        onClick={handleUpdate}
      >
        Update Student
      </button>

    </div>
  );
}

export default EditStudent;
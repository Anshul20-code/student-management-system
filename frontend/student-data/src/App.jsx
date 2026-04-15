import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/students", formData);
      setFormData({
        name: "",
        age: "",
        course: "",
      });
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
          Student Management Website
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-slate-700 mb-6">
              Add Student
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="text"
                name="course"
                placeholder="Enter course"
                value={formData.course}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
              >
                Add Student
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-slate-700 mb-6">
              Student List
            </h2>

            {students.length === 0 ? (
              <p className="text-slate-500 text-center">No students found</p>
            ) : (
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className="border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-300"
                  >
                    <h3 className="text-lg font-bold text-slate-800">
                      {student.name}
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Age: <span className="font-medium">{student.age}</span>
                    </p>
                    <p className="text-slate-600">
                      Course:{" "}
                      <span className="font-medium">{student.course}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
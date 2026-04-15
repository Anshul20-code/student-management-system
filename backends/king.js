import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  }
});

const Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, age, course } = req.body;

    const newStudent = new Student({
      name,
      age,
      course,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent, updateStudent } from "./studentSlice";
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from "@mui/material";

export default function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const [editDialog, setEditDialog] = useState({ open: false, student: null });
  const [formData, setFormData] = useState({ name: "", age: "", course: "" });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleEditClick = (student) => {
    setFormData({ name: student.name, age: student.age, course: student.course });
    setEditDialog({ open: true, student });
  };

  const handleEditClose = () => {
    setEditDialog({ open: false, student: null });
    setFormData({ name: "", age: "", course: "" });
  };

  const handleEditSubmit = () => {
    dispatch(updateStudent({ 
      id: editDialog.student.id, 
      student: formData 
    }));
    handleEditClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.age}</TableCell>
              <TableCell>{s.course}</TableCell>
              <TableCell>
                <Button 
                  color="primary" 
                  onClick={() => handleEditClick(s)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button 
                  color="error" 
                  onClick={() => dispatch(deleteStudent(s.id))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editDialog.open} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

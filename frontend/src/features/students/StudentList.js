import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "./studentSlice";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function StudentList() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
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
              <Button color="error" onClick={() => dispatch(deleteStudent(s.id))}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addStudent } from "./studentSlice";
import { TextField, Button, Box } from "@mui/material";

export default function StudentForm() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addStudent(data));
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 2 }}>
      <TextField label="Name" {...register("name")} required fullWidth sx={{ mb: 1 }} />
      <TextField label="Age" type="number" {...register("age")} required fullWidth sx={{ mb: 1 }} />
      <TextField label="Course" {...register("course")} required fullWidth sx={{ mb: 1 }} />
      <Button variant="contained" type="submit">Add Student</Button>
    </Box>
  );
}

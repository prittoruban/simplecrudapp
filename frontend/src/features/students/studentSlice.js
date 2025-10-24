import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/students";

export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addStudent = createAsyncThunk("students/add", async (student) => {
  const response = await axios.post(API_URL, student);
  return response.data;
});

export const updateStudent = createAsyncThunk("students/update", async ({ id, student }) => {
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
});

export const deleteStudent = createAsyncThunk("students/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: "students",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(addStudent.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        state.list[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;

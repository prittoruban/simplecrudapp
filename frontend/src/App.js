import { Provider } from "react-redux";
import { store } from "./app/store";
import StudentForm from "./features/students/StudentForm";
import StudentList from "./features/students/StudentList";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>Student Management</Typography>
        <StudentForm />
        <StudentList />
      </Container>
    </Provider>
  );
}

export default App;

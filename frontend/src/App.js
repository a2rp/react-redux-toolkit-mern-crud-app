import { Box, Typography } from "@mui/material";
import Home from "./pages/Home";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    axios.defaults.baseURL = "http://localhost:1198/api";

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8, padding: "15px" }}>
                <Typography variant="h5">
                    CRUD operation using React JS & Redux Toolkit
                </Typography>
            </Box>
            <Home />

            <ToastContainer />
        </Box>
    );
};

export default App;


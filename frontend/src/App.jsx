import { Box, Typography } from "@mui/material";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8, padding: "15px" }}>
                <Typography variant="h5" component="h1">
                    Employee management with React and Redux Toolkit
                </Typography>
            </Box>
            <Home />

            <ToastContainer />
        </Box>
    );
};

export default App;


import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  addEmployee,
  changeStateFalse,
  changeStateTrue,
  fetchEmployee,
  modifiedEmployee,
  removeEmployee,
} from "../feature/employeeSlice";

const errorMessage = (error) => (typeof error === "string" ? error : error?.message || "The request failed.");

export default function Home() {
  const dispatch = useDispatch();
  const { loading, employeeList, error, updateState, response } = useSelector(
    (state) => state.employeeKey,
  );
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Enter an employee name.");
      return false;
    }
    if (!position.trim()) {
      toast.error("Enter a position.");
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setId("");
    setName("");
    setPosition("");
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(addEmployee({ name: name.trim(), position: position.trim() })).unwrap();
      clearForm();
      setSnackbarOpen(true);
    } catch (requestError) {
      toast.error(errorMessage(requestError));
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    try {
      await dispatch(modifiedEmployee({ id, name: name.trim(), position: position.trim() })).unwrap();
      dispatch(changeStateFalse());
      clearForm();
      setSnackbarOpen(true);
    } catch (requestError) {
      toast.error(errorMessage(requestError));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (updateState) {
      void handleUpdate();
      return;
    }
    void handleAdd(event);
  };

  const startUpdate = (item) => {
    setId(item._id);
    setName(item.name);
    setPosition(item.position);
    dispatch(changeStateTrue());
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: `Delete ${item.name}?`,
      text: "This employee record will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;

    try {
      await dispatch(removeEmployee(item._id)).unwrap();
      setSnackbarOpen(true);
    } catch (requestError) {
      toast.error(errorMessage(requestError));
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason !== "clickaway") setSnackbarOpen(false);
  };

  const successMessage = {
    add: "Employee added successfully.",
    update: "Employee updated successfully.",
    delete: "Employee deleted successfully.",
  }[response];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", px: 2, pb: 6 }}>
      <Box sx={{ width: "min(100%, 920px)" }}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2 }}
        >
          <TextField
            label="Name"
            size="small"
            required
            inputProps={{ maxLength: 120 }}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            label="Position"
            size="small"
            required
            inputProps={{ maxLength: 120 }}
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
          {updateState ? (
            <>
              <Button type="submit" variant="contained" size="small" disabled={loading}>
                Update
              </Button>
              <Button
                type="button"
                variant="text"
                size="small"
                onClick={() => {
                  dispatch(changeStateFalse());
                  clearForm();
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" size="small" type="submit" disabled={loading}>
              Add employee
            </Button>
          )}
        </Box>

        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table aria-label="Employee records">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#101820" }}>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>No.</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: 700 }}>Position</TableCell>
                <TableCell align="right" sx={{ color: "white", fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={4} align="center">Loading employee records…</TableCell>
                </TableRow>
              )}
              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={4} role="alert">{error}</TableCell>
                </TableRow>
              )}
              {!loading && !error && employeeList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">No employee records yet.</TableCell>
                </TableRow>
              )}
              {!loading && employeeList.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Edit ${item.name}`} onClick={() => startUpdate(item)} disabled={loading}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label={`Delete ${item.name}`} onClick={() => handleDelete(item)} disabled={loading}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

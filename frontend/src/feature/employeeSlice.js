import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
  updateState: false,
  loading: false,
  employeeList: [],
  error: "",
  response: "",
};

export const fetchEmployee = createAsyncThunk("employee/fetchEmployee", async () => {
  const response = await api.get("/items");
  return response.data.response;
});

export const addEmployee = createAsyncThunk("employee/addEmployee", async (data) => {
  const response = await api.post("/items", data);
  return response.data.response;
});

export const removeEmployee = createAsyncThunk("employee/removeEmployee", async (id) => {
  const response = await api.delete(`/items/${id}`);
  return response.data.response;
});

export const modifiedEmployee = createAsyncThunk("employee/modifiedEmployee", async (data) => {
  const response = await api.put(`/items/${data.id}`, {
    name: data.name,
    position: data.position,
  });
  return response.data.response;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to load employees.";
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.response = "";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList.push(action.payload);
        state.response = "add";
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to add employee.";
      })
      .addCase(modifiedEmployee.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.response = "";
      })
      .addCase(modifiedEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employeeList.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) state.employeeList[index] = action.payload;
        state.response = "update";
      })
      .addCase(modifiedEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to update employee.";
      })
      .addCase(removeEmployee.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.response = "";
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = state.employeeList.filter((item) => item._id !== action.payload);
        state.response = "delete";
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to delete employee.";
      });
  },
});

export default employeeSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } = employeeSlice.actions;
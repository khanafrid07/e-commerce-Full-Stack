import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Registration failed");
    }
  }
);

// ✅ LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

export const addAddress = createAsyncThunk(
  "auth/addAddress",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token"); // ✅ add this
      const res = await axios.post(
        "http://localhost:8080/api/auth/address",
        data,
        { 
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      dispatch(setCurrentAddress(res.data.address))
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to add address");
    }
  }
);


// ✅ FETCH USER
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/auth/fetchUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
      }
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// ✅ AUTH SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    token: localStorage.getItem("token") || null,
    error: null,
    currentAddress: JSON.parse(localStorage.getItem("currentAddress")) || null
  },

    


  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setCurrentAddress :(state, action)=>{
      state.currentAddress = action.payload
      localStorage.setItem("currentAddress", JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD ADDRESS
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ assuming backend returns updated user
        state.user = action.payload;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCurrentAddress } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { act } from "react-dom/test-utils";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        // const request = await axios.post("api", userCredentials)
        const request = await axios.post("api", userCredentials)
        const response = await request.data;
        const response2 = await response[0];
        const response3 = await response2.Employee_ID;
        localStorage.setItem('user', JSON.stringify(response2));
        // console.log(request);
        // console.log(response3);
        return response2;

    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        console: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if (action.error.message === 'Request  failed with status code 401 ') {
                    state.error = 'Access Denied! Invalid Credentials';
                }
                else if (action.error.message === "Cannot read properties of undefined (reading 'Employee_ID')") {
                    state.error = 'User ID or Password incorrect. Please Check User ID or Password';
                }
                else {
                    state.error = action.error.message;
                }

            })
    }
});

export default userSlice.reducer;
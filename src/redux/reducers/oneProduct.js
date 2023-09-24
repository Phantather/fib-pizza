import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getOneProduct = createAsyncThunk(
    "oneProduct/getOneProduct",
    async (id, thunkAPI) => {
        try {

            const res = await axios(`http://localhost:4444/products/${id}`);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const oneProductSlice = createSlice({
    name: "oneProduct",
    initialState: {
        list: [],
        filter: {
            category: ""
        },
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getOneProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOneProduct.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getOneProduct.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const {} = oneProductSlice.actions;

export default oneProductSlice.reducer;
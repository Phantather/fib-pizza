import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {deleteCategory} from "./categories";


export const getPromos = createAsyncThunk(
    "promos/getPromos",
    async (filter, thunkAPI) => {
        try {

            const res = await axios(`http://localhost:4444/promocodes`);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const addPromo = createAsyncThunk(
    "promos/addPromo",
    async (newPromo) => {
        const res = await axios.post(`http://localhost:4444/promocodes`, newPromo)
        console.log(res.data)
        return res.data
    }
)

export const deletePromo = createAsyncThunk(
    "promos/deletePromos",
    async (promoID) => {
        await axios.delete(`http://localhost:4444/promocodes/${promoID}`)
        return promoID
    }
)


const promosSlice = createSlice({
    name: "promos",
    initialState: {
        promocodes: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getPromos.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPromos.fulfilled, (state, {payload}) => {
            state.promocodes = payload;
            state.isLoading = false;
        });
        builder.addCase(getPromos.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(addPromo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addPromo.fulfilled, (state, action) => {
            state.promocodes.push(action.payload);
            state.isLoading = false;

        });
        builder.addCase(addPromo.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deletePromo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deletePromo.fulfilled, (state, {payload}) => {

            state.promocodes = state.promocodes.filter((item) => item.id !== payload);
            state.isLoading = false;
        });
        builder.addCase(deletePromo.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const {} = promosSlice.actions;

export default promosSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async (_, thunkAPI) => {
        try {

            const res = await axios(`http://localhost:4444/categories`);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async (newCategory) => {
        const res = await axios.post(`http://localhost:4444/categories`, newCategory)
        return res.data
    }
)

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (categsID) => {
        const res = await axios.delete(`http://localhost:4444/categories/${categsID}`)
        return categsID
    }
)

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categs: [],
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categs = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(addCategory.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.categs = [...state.categs, action.payload];
            state.isLoading = false;
        });
        builder.addCase(addCategory.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCategory.fulfilled, (state, {payload}) => {
            state.categs = state.categs.filter((item) => item.id !== payload);
            state.isLoading = false;
        });
        builder.addCase(deleteCategory.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
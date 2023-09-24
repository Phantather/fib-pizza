import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (filter, thunkAPI) => {
        try {

            const res = await axios(`http://localhost:4444/products?${filter.category ? `category=${filter.category}` : ''}`);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProducts",
    async (productID, thunkAPI) => {
        await axios.delete(`http://localhost:4444/products/${productID}`);
        return productID
    }
)

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (newProduct) => {
        const res = await axios.post(`http://localhost:4444/products`, newProduct)
        return res.data
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        limit: 8,
        filter: {
            category: ""
        },
        isLoading: false,
    },
    reducers: {
        changeCat: (state, {payload}) => {
            state.filter.category = payload
        },
        changeLimit: (state, {payload}) => {
            state.limit = payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(deleteProduct.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.list = state.list.filter((item) => item.id !== payload);
        });
        builder.addCase(deleteProduct.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload.error.message
        });
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(addProduct.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.list = [...state.list, payload]
        });
        builder.addCase(addProduct.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload.error.message
        });
    },
});

export const {changeCat, changeLimit} = productsSlice.actions;

export default productsSlice.reducer;
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {addProduct, deleteProduct, getProducts} from "./food";

const locorder = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : []

export const postOrders = createAsyncThunk(
    "order/postOrder",
    async (order, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:4444/orders`, order);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const postCall = createAsyncThunk(
    "call/postCall",
    async (call, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:4444/calls`, call);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getCalls = createAsyncThunk(
    "call/getCalls",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`http://localhost:4444/calls`);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const getOrders = createAsyncThunk(
    "order/getOrders",
    async (filter, thunkAPI) => {
        try {
            const res = await axios(`http://localhost:4444/orders`);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (orderID, thunkAPI) => {
        await axios.delete(`http://localhost:4444/orders/${orderID}`);
        return orderID
    }
)

export const deleteCall = createAsyncThunk(
    "call/deleteCall",
    async (callID, thunkAPI) => {
        await axios.delete(`http://localhost:4444/calls/${callID}`);
        return callID
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        order: [

        ],
        user: {
            cart: locorder,
            orders: []
        },
        calls: [

        ]
    },
    reducers: {
        addOrder: (state, {payload}) => {
          state.user.orders = [...state.user.orders, payload]
        },
         addCart: (state, {payload}) => {
            if(state.user.cart.some(el => el.id == payload.id && el.width == payload.width && el.size == payload.size && el.adds.length == payload.adds.length)){
                state.user.cart = state.user.cart.map(item => item.id === payload.id  && item.width == payload.width && item.size == payload.size && item.adds.length == payload.adds.length ? {...payload,count: item.count + 1}: item)
            }
            else {
                state.user.cart = [...state.user.cart, {...payload,count:1}]

            }
             localStorage.getItem("order") ?
                 localStorage.setItem("order", JSON.stringify([...state.user.cart])) : localStorage.setItem("order", JSON.stringify([payload]))

        },

        deleteCart: (state, { payload }) => {
            state.user.cart = state.user.cart.reduce((newCart, item) => {
                if (item.id !== payload.id || item.width !== payload.width || item.size !== payload.size) {
                    newCart.push(item);
                }
                return newCart;
            }, []);
            localStorage.setItem("order", JSON.stringify([...state.user.cart]));
        },
        LoginUser: (state, {payload}) => {
            state.user = payload
        },
        LogoutUser: (state) => {
            state.user = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postOrders.fulfilled, (state, {payload}) => {
            state.orders = payload
        })
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.order = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getOrders.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(deleteOrder.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.order = state.order.filter((item) => item.id !== payload);
        });
        builder.addCase(deleteOrder.rejected, (state, {payload}) => {
            state.isLoading = false;
        });
        builder.addCase(postCall.pending, (state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(postCall.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.calls = [...state.calls, payload]
        });
        builder.addCase(postCall.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload.error.message
        });
        builder.addCase(deleteCall.pending, (state) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(deleteCall.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.calls = state.calls.filter((item) => item.id !== payload);
        });
        builder.addCase(deleteCall.rejected, (state, {payload}) => {
            state.isLoading = false;
        });
    }
})
export const {LoginUser, LogoutUser, addCart, deleteCart} = userSlice.actions
export default userSlice.reducer
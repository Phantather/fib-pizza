import {configureStore} from "@reduxjs/toolkit";
import userSlice from './reducers/user'
import productSlice from './reducers/food'
import categoriesSlice from './reducers/categories'
import oneProductSlice from './reducers/oneProduct'
import promosSlice from './reducers/promos'


export const store = configureStore({
    reducer: {
        categoriesSlice: categoriesSlice,
        userSlice: userSlice,
        productSlice: productSlice,
        oneProductSlice: oneProductSlice,
        promosSlice: promosSlice
    }
})
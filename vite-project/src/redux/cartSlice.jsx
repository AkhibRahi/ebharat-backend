import { createSlice } from "@reduxjs/toolkit";

const getCartStorage = JSON.parse(localStorage.getItem("cart"));

const initialState = getCartStorage ?? [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers : {
        addToCart(state, action){
            state.push(action.payload)
        },
        deleteCart(state, action){
            return state.filter(item => item.productId !== action.payload.productId)
        }
    }
})
export const {addToCart, deleteCart} = cartSlice.actions;
export default cartSlice.reducer;
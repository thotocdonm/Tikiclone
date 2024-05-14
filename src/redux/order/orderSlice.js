import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../counter/counterAPI';
import { message } from 'antd';

const initialState = {
    cart: []
};


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doAddBookAction: (state, action) => {
            let carts = state.cart;
            const item = action.payload;

            let isIndexExist = carts.findIndex(c => c._id === item._id)
            if (isIndexExist > -1) {
                carts[isIndexExist].quantity = carts[isIndexExist].quantity + item.quantity
                if (carts[isIndexExist].quantity > carts[isIndexExist].detail.quantity) {
                    carts[isIndexExist].quantity = carts[isIndexExist].detail.quantity;
                }
            } else {
                carts.push({
                    quantity: item.quantity,
                    _id: item._id,
                    detail: item.detail
                })
            }

            state.cart = carts;

            message.success('Thêm vào giỏ hàng thành công')

        },

        onChangeQuantityAction: (state, action) => {
            let carts = state.cart;
            const item = action.payload;

            let isIndexExist = carts.findIndex(c => c._id === item._id);
            if (isIndexExist > -1) {
                carts[isIndexExist].quantity = item.quantity;
            }
            else {
                return;
            }
            state.cart = carts;
        },

        doDeleteBookAction: (state, action) => {
            let carts = state.cart;
            const item = action.payload;
            let newCarts = carts.filter(c => c._id !== item._id);
            state.cart = newCarts;
            message.success('Xóa sản phẩm khỏi giỏ hàng thành công')
        },

        doPlaceOrderAction: (state, action) => {
            state.cart = [];
        }

    },

    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {

    },
});

export const { doAddBookAction, onChangeQuantityAction, doDeleteBookAction, doPlaceOrderAction } = orderSlice.actions;

export default orderSlice.reducer;

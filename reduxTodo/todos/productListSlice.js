import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
    name: 'productList',
    initialState: [],
    reducers:{
        addProductList(state,action){
            const productlist = action.payload;
            if(productlist){
                state.push(productlist);
            }
        }
    }
})

export const {addProductList} = productListSlice.actions;
export default productListSlice.reducer
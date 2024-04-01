import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlice";
import productListReducer from "./todos/productListSlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        productList: productListReducer,
    },
});
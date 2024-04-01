import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo(state, action){     
            console.log("payload",action.payload);
            const {id,text} = action.payload;
            console.log("text", {id,text});
            state.push({ id,text, completed: false})
        },
        toggleTodo(state, action){
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                // Return a new state array with the updated todo
                return state.map(todoItem =>
                    todoItem.id === action.payload ? { ...todoItem, completed: !todoItem.completed } : todoItem
                );
            }
            return state;
        },
        clearTodo(state){
           for(let index=0; index<=state.length; index++){
            state.pop();
           }
        }
    }
});

export const {addTodo, toggleTodo, clearTodo} = todosSlice.actions
export default todosSlice.reducer
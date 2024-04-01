import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const TodoApp=()=>{
    return(<>
      <AddTodo/>
        <TodoList/>
    </>);
}

export default TodoApp;
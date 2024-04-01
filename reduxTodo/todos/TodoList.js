import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearTodo, toggleTodo } from "./todosSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const TodoList = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleCheck = ({ id }) => {
        dispatch(toggleTodo(id));
    };

    const handleclear = () => {
        dispatch(clearTodo());
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.todoContainer}>
            <BouncyCheckbox
                style={styles.checkbox}
                isChecked={item.completed}
                disableBuiltInState
                onPress={() => handleCheck({ id: item.id })}
            />
            <Text
                key={item.id}
                style={[
                    styles.todoText,
                    { textDecorationLine: item.completed ? "line-through" : "none" }
                ]}
            >
                {`${index + 1}. ${item.text}`}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Todo List : </Text>
                {todos.length > 0 && (
            <Button mode="outlined" onPress={handleclear} style={styles.clearButton}>
                Clear
            </Button>
        )}
            </View>

            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} // Use item.id.toString() to extract key
            />
        </View>
    );
};

export default TodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    titleView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    clearButton:{
        height: 40,
        
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight:3,
    },
    todoText: {
        fontSize: 18,
        color: '#333',
    },
});

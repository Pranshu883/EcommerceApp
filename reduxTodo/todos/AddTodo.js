import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todosSlice";
import { Button, StyleSheet, TextInput, View } from "react-native";

let nextTodoId = 0;

const AddTodo = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        nextTodoId++;
        if (text.trim()) {
            dispatch(addTodo({ id: nextTodoId, text: text.trim() }));
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Add a new todo..."
                value={text}
                placeholderTextColor="black"
                onChangeText={setText}
                style={styles.input}
                onSubmitEditing={handleSubmit} // Use handleSubmit directly
            />
            <Button
                title="Add"
                onPress={handleSubmit}
                disabled={!text.trim()}
            />
        </View>
    );
};

export default AddTodo;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        color: 'black',
        backgroundColor: 'white',
    },
});

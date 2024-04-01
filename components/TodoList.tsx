import React, { useCallback, useEffect, useState } from "react";
import { ToDoItem } from "../models";
import { View, ScrollView, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";
import { getDBConnection, getTodoItems, saveTodoItems, deleteTodoItem, deleteTable, createTable } from "./db-service";
import {NavigationProp, ParamListBase} from '@react-navigation/native';





const TodoList: React.FC<{ navigation: NavigationProp<ParamListBase> }> = ({ navigation }) => {


    const [todos, setTodos] = useState<ToDoItem[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const loadDataCallback = useCallback(async () => {
        try {
          const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
          const db = await getDBConnection();
          await createTable(db);
          const storedTodoItems = await getTodoItems(db);
          if (storedTodoItems.length) { 
            setTodos(storedTodoItems);
          } else {
            await saveTodoItems(db, initTodos);
            setTodos(initTodos);
          }
        } catch (error) {
          console.error(error);
        }
      }, []);

    useEffect(()=>{
        loadDataCallback();
       
    },[loadDataCallback]);

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        try {
          const newTodos = [...todos, {
            id: todos.length ? todos.reduce((acc, cur) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1 : 0, value: newTodo
          }];
          setTodos(newTodos);
          const db = await getDBConnection();
          await saveTodoItems(db, newTodos);
          setNewTodo('');
        } catch (error) {
          console.error(error);
        }
      };
      const deleteItem = async (id: number) => {
        try {
            console.log(id);
          const db = await getDBConnection();
          await deleteTodoItem(db, id);
          const updatedTodo = todos.splice(id, 1);
          setTodos(updatedTodo.slice(0));
        } catch (error) {
          console.error(error);
        }
      };

      
      const  renderItem = ({ item }: { item: ToDoItem }) => (
            <View style={styles.todoContainer}>
             <View style={styles.todoTextContainer}>
               <Text
                 style={styles.sectionTitle}>
                 {item.value}
               </Text>
             </View>
             <Button
               onPress={() => deleteItem(item.id)}
               title="delete"
               color="purple"
             />
           </View>
        );
       
           
        
      

      return(
        <ScrollView>
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> ToDo Application </Text>
        </View>
        <View>
        <FlatList 
                data={todos}
                keyExtractor={(item)=>(item.id.toString())}
                renderItem={renderItem}
            />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} value={newTodo} onChangeText={text => setNewTodo(text)} />
          <Button
            onPress={addTodo}
            title="Add ToDo"
            color="teal"
          />
        </View>
        <Button
                onPress={() => navigation.goBack()}
                title="Go Back"
                color="orange"
            />
      </ScrollView>
      );
}
const styles = StyleSheet.create({
    appTitleView: {
      marginTop: 20,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    appTitleText: {
        color: 'black',
      fontSize: 24,
      fontWeight: '800'
    },
    textInputContainer: {
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 1,
      justifyContent: 'flex-end'
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      margin: 10,
      color:'black',
      backgroundColor: 'white'
    },
    todoContainer: {
        marginTop: 10,
        paddingHorizontal: 24,
        backgroundColor: 'lightblue',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
      },
      todoTextContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '400',
      }
  });
export default TodoList;
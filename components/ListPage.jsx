import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable, FlatList } from "react-native";
import { TextInput, Button } from "react-native-paper";
import ExpandableList from "./ExpandableList";

const ListPage = ({navigation}) => {
    const [text, onChangeText] = useState('');
    const [list, setList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const listUpdate = () => {
        if (text.trim() !== "") {
            const updatedList = [...list];
            if (editingIndex !== null) {
                updatedList[editingIndex] = text;
            } else {
                updatedList.push(text);
            }
            setList(updatedList);
            setModalVisible(false);
            onChangeText('');
            setEditingIndex(null);
        }
    };

    const listDelete = (index) => {
        var updatedList = [...list];
        updatedList.splice(index, 1);
        setList(updatedList);
        setEditingIndex(null);
    };

    const itemUpdate = (index) => {
        setEditingIndex(index);
        onChangeText(list[index]);
        setModalVisible(true);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <Button
                mode="outlined"
                icon="pencil"
                onPress={() => itemUpdate(index)}
                style={styles.iconButton}
            />
            <Button
                mode="outlined"
                icon="delete"
                onPress={() => listDelete(index)}
                style={styles.iconButton}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter Text"
                value={text}
                onChangeText={onChangeText}
                style={styles.textInput}
            />

            <Button
                mode="contained"
                onPress={listUpdate}
                style={styles.submitButton}
            >
                Submit
            </Button>

            {list.length > 0 && (
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                        setEditingIndex(null);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                placeholder="Edit"
                                value={text}
                                onChangeText={onChangeText}
                                style={styles.textInput}
                            />
                            <Pressable
                                style={[styles.button, styles.updateButton]}
                                onPress={listUpdate}
                            >
                                <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            <Button 
                onPress={()=>navigation.navigate('TodoList' )}
            > Todo List </Button>
            <Button 
                onPress={()=>navigation.navigate('ExpandableList',{name: 'ExpandableList'} )}
            > New Page </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    textInput: {
        marginBottom: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
    },
    text: {
        color: 'black',
    },
    submitButton: {
        width: "50%",
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 5,
    },
    itemText: {
        flex: 1,
        color: 'black',
        marginRight: 10,
    },
    iconButton: {
        width: '15%',
        borderRadius: 5,
        borderWidth: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    updateButton: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ListPage;

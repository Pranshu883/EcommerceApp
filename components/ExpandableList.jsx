import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { View } from "react-native";

function displayItem(subItem) {
    return (<Text style={styles.contentText}> {subItem.id} </Text>)
}

const SubItem = ({ subItem, onSubItemClick }) => {


    return (
        <TouchableOpacity style={styles.subItemTouchableContainer} onPress={() => onSubItemClick(subItem)}>
            <Text style={styles.subItemText}>{subItem.sTitle}</Text>
        </TouchableOpacity>
    );
};

const ExpandableListItem = ({ item, onSubItemClick }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.listItemContainer}>
            <TouchableOpacity onPress={toggleExpand} style={styles.touchableContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
            {expanded && (
                <View>
                    <Text style={styles.contentText}>{item.content}</Text>
                    {item.subItem && (
                        <FlatList
                            data={item.subItem}
                            renderItem={({ item }) => <SubItem subItem={item} onSubItemClick={onSubItemClick} />}
                            keyExtractor={(subItem) => subItem.id.toString()}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const ExpandableListView = ({ data, onSubItemClick }) => {
    const renderItem = ({ item }) => {
        return <ExpandableListItem item={item} onSubItemClick={onSubItemClick} />;
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flatList}
        />
    );
};

const ExpandableList = ({ navigation }) => {

    const [clickedItem, setClickedItem] = useState(null);

    const handleItemClick = (subItem) => {
        setClickedItem(subItem);
    }

    const data = [
        {
            id: 1,
            title: "Option1",
            content: "Menu1",
            subItem: [
                {
                    id: 1,
                    sTitle: "subMenu1",
                },
                {
                    id: 2,
                    sTitle: "subMenu2"
                },
                {
                    id: 3,
                    sTitle: "subMenu2"
                }
            ],
        },
        {
            id: 2,
            title: "Option 2",
            content: "Menu2",
            subItem: [
                {
                    id: 4,
                    sTitle: "subMenu4",
                },
                {
                    id: 5,
                    sTitle: "subMenu5",
                }
            ],
        },
        {
            id: 3,
            title: "Option 3",
            content: "Menu2",
            subItem: [
                {
                    id: 6,
                    sTitle: "subMenu6",
                },
                {
                    id: 7,
                    sTitle: "subMenu7",
                }
            ],
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Expandable List </Text>
            <ExpandableListView data={data} onSubItemClick={handleItemClick} />

            <View>
                {clickedItem && <Text style={styles.contentText}>item {clickedItem.id} clicked name:{clickedItem.sTitle} </Text>}
            </View>
            <Button
                onPress={() => navigation.goBack()}
                title="Go Back"
                color="orange"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f0f0f0",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    listItemContainer: {
        marginBottom: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
    },
    touchableContainer: {
        padding: 16,
    },
    titleText: {
        fontSize: 16,
        color: "#333",
    },
    contentText: {
        fontSize: 14,
        color: "#555",
        padding: 16,
    },
    flatList: {
        flex: 1,
    },
    subItemTouchableContainer: {
        padding: 12,
        backgroundColor: "#eee",
        borderRadius: 8,
        marginTop: 8,
    },
    subItemText: {
        fontSize: 14,
        color: "#555",
    },
});

export default ExpandableList;

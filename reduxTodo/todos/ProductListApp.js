import React from "react";
import { View, Text, FlatList, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { AddProductList } from "./AddProductList";

const ProductListApp = () => {
    const productList = useSelector((state) => state.productList);

    const renderProductList = ({ item }) => {
        const productID = item.product_id;

        return (
            <Pressable style={styles.card} onPress={() => navigation.navigate('ProductDetail', { productId: productID })}>
                <View style={styles.cardImageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <AddProductList />
            <FlatList
                data={productList[0]}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={renderProductList}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 5,
        elevation: 3,
        overflow: 'hidden',
    },
    cardImageWrapper: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
        textTransform: 'capitalize',
        letterSpacing: 0.5,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
});

export default ProductListApp;

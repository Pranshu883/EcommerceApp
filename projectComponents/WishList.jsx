import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ScrollView,
    Pressable,
    RefreshControl,
} from 'react-native';

import { Card, IconButton, TextInput, FAB, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMERID, PROMOCODE, getSession, saveSession } from '../common/LocalStorage';
import { addProducts, addWishListProducts, creatWishListTable, deleteProduct, deleteWishListProduct, getDBConnection, getProducts, getWishListProducts, updateQuantity } from '../db/db';
import { useIsFocused } from '@react-navigation/native';
import { getRegularFont1 } from '../common/utils';



const WishList = ({ navigation, route }) => {

    const isFocused = useIsFocused();

    const [productWishList, setProductWishList] = useState();
    const [likedProducts, setLikedProducts] = useState({});
    const [customerId, setCustomerId] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const db = await getDBConnection();
            const fetchedCustomerId = await getSession(CUSTOMERID);
            await getWishList(db, fetchedCustomerId); // Fetch the updated product list
        } catch (error) {
            console.error('Error refreshing product list:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    const getWishList = useCallback(async () => {
        try {
            const db = await getDBConnection();
            const fetchedCustomerId = await getSession(CUSTOMERID);
            const productsObject = await getWishListProducts(db, fetchedCustomerId);

            console.log(" Product Object",productsObject);
            // Convert the object of products to an array
            const productsArray = Object.values(productsObject);
            console.log('productArray', productsArray);
            setProductWishList(productsArray);
            const likedProducts = {};
            productsArray.forEach((product) => {
                likedProducts[product.product_id] = true;
            });
            setLikedProducts(!likedProducts);
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }, []);


    // Fetch the product list when the component mounts
    useEffect(() => {

        if (isFocused) {
            fetchData();
            getWishList();
            
        }
    }, [isFocused]);

    // Render individual product in the list
    const fetchData = async() => {
        const fetchedCustomerId = await getSession(CUSTOMERID);
        setCustomerId(fetchedCustomerId);
    }

    const removeItem = async (productId) => {
        try {
            const db = await getDBConnection();
            await deleteWishListProduct(db, productId);
        } catch (error) {
            console.log(error);
        }

    }
    const addToList = async (product) => {
        console.log("Add to tabe Called ");
        const db = await getDBConnection();

        const productInfo = [{

            "product_id": product.product_id,
            "product_name": product.product_name,
            "product_img": product.product_img,
            "product_price": product.product_price,
            "customer_id": customerId,
        }];
        try {
            await addWishListProducts(db, productInfo);
        } catch (error) {
            console.error(error);
        }
    }
    const handleLikePress = (product) => {
        const productId = product.product_id;
        setLikedProducts((prevLikedProducts) => ({
            ...prevLikedProducts,
            [productId]: !prevLikedProducts[productId]
        }))
        likedProducts[productId] ? addToList(product) : removeItem(productId);

    };

    const renderProductList = ({ item }) => {

        const productId = item.product_id;
        const isLiked = likedProducts[productId];
        return (
            <Pressable style={styles.card} onPress={() => navigation.navigate('ProductDetail', {
                productId: productId
            })} >
                <TouchableOpacity style={styles.likeButton} onPress={() => { handleLikePress(item) }} >
                    <Icon
                        name={isLiked ? "heart-outline" : "heart"}
                        size={24}
                        color={isLiked ?"#333" : "#E70038"}

                    />
                </TouchableOpacity>

                <Image source={{ uri: item.product_img }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardDescription}>{item.product_name}</Text>
                    <Text style={styles.cardDescription}>{item.product_price}</Text>
                    <View style={{ padding: 2 }}>
                        <Text style={styles.itemInfoText}>Color: black </Text>
                        <Text style={styles.itemInfoText}>Size: M</Text>

                    </View>
                </View>
            </Pressable>);
    };

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } >
            <View style={styles.header}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My WishList</Text>
                </View>
            </View>
            <SafeAreaView>
                <FlatList
                    data={productWishList}
                    numColumns={1}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProductList}
                    contentContainerStyle={styles.listContent}
                />
            </SafeAreaView>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEDEF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2E4053',
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 12,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "65%",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    listContent: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginTop: 12,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        margin: 4,
        borderRadius: 8,
        marginHorizontal: 10,
        marginBottom: 10,
        height: 200,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImage: {
        height: "100%",
        width: "50%",
        borderRadius: 8,
        resizeMode: 'stretch',
        margin: 0.3,
    },
    cardContent: {
        margin: 10,
        padding: 5,
    },
    cardDescription: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        fontFamily: getRegularFont1(),
    },
    likeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 1,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        borderRadius: 0,
    },
    quantityText: {
        color: 'black',
        marginHorizontal: 8,
    },
    promoCodeView: {
        marginVertical: 10,
        marginHorizontal: 15,
    },
    promoCodeTitleText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 18,
        fontFamily: getRegularFont1(),
    },
    promoCodeWrapper: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    itemInfoText: {
        color: '#555',
        fontFamily: getRegularFont1(),
    },
    textInput: {
        backgroundColor: '#F5F5F5',
        margin: 10,
        flex: 1,
        marginHorizontal: 10,
    },
    fab: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 10,
        marginLeft: 10,
        opacity: 0.85,
    },
    subTotalView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
    },
    subTotalItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 4,
    },
    subTotalTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: getRegularFont1(),
    },
    subTotalText: {
        fontSize: 18,
        color: '#555',
    },
    totalView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        justifyContent: 'space-around',
        marginVertical: 10,
        gap: 5,
        marginHorizontal: 10,
        padding: 10,
        marginBottom: 60,
    },
    totalText: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    checkoutButton: {
        borderRadius: 9,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '70%',
        padding: 5,
        marginVertical: 8,
    },
    appliedCodeView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    }
});


export default WishList;


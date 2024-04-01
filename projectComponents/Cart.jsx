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
    Modal,
    Alert,
    ActivityIndicator,
    ImageBackgroundBase,
    ImageBackground,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card, IconButton, TextInput, FAB, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMERID, PROMOCODE, getSession, saveSession } from '../common/LocalStorage';
import { addWishListProducts, deleteProduct, getDBConnection, getProducts, updateQuantity } from '../db/db';

import { APP_NAME } from '../common/string';
import { deleteTable } from '../components/db-service';
import { EMPTYCART } from '../common/webutils';
import { getRegularFont1 } from '../common/utils';



const Cart = ({ navigation, route }) => {

    // State variables for promo code, quantities, and applied code
    const isFocused = useIsFocused();

    const [promoCode, setPromoCode] = useState('');
    const [quantities, setQuantities] = useState({});
    const [appliedCode, setAppliedCode] = useState('');
    const [productList, setProductList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const [loading, setLoading] = useState(true);


    console.log("code",appliedCode);

   

    // Function to fetch the product list
    const getProductList = useCallback(async () => {
        try {

           
            const db = await getDBConnection();
        const fetchedCustomerId = await getSession(CUSTOMERID);
            const productsObject = await getProducts(db, fetchedCustomerId);


            // Convert the object of products to an array
            const productsArray = Object.values(productsObject);

            setProductList(productsArray);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }, []);

    
    

    // Fetch the product list when the component mounts
    useEffect(() => {
        if (isFocused) {
            fetchData();
            getProductList();
            getPromoCode();

            
        }
    }, [isFocused]);



    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await getProductList(); // Fetch the updated product list
        } catch (error) {
            console.error('Error refreshing product list:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        // Calculate total price from productList
        const newTotalPrice = productList.reduce((total, product) => {

            parseFloat(total);
            const cleanedPrice = product.product_price.replace(/[^\d.]/g, '');


            const productPrice = (parseFloat(cleanedPrice) * product.product_qty);

            return (total + (productPrice));
        }, 0);
        // Update totalPrice state
        setTotalPrice(parseFloat(newTotalPrice).toFixed(2));


    }, [productList]);


    const cartEmptyAPI = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=34646ebcd3153c569e1b0fdc8e; currency=USD; language=en-gb");

        const raw = JSON.stringify({
            "customer_id": customerId
        });

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(EMPTYCART, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json.success == '1') {
                    Alert.alert(APP_NAME, 'Cart emptied');
                    deleteCart();
                }
            })
            .catch((error) => console.error(error));
    }
  const fetchData = async () => {
        const fetchedCustomerId = await getSession(CUSTOMERID);
        setCustomerId(fetchedCustomerId);
    }

    const handleCartEmpty = () => {
        cartEmptyAPI();
    };
    const deleteCart = () => {
        productList.forEach((product) => {
            deleteItem(product.product_id);
        })
    }

  
    // Fetch product list from the database

    const deleteItem = async (id) => {
        try {
            console.log("Id in delete Item", id);
            const db = await getDBConnection();
            await deleteProduct(db, id);
            // Use functional update to ensure you're working with the latest state
            // setProductList(prevProductList => prevProductList.filter(product => product.id !== id));
            getProductList();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = (id) => {
        console.log("delete Pressed");
        setModalVisible(id);
    }

    const updateProductQuantity = async (productId, quantity) => {
        setQuantities(prevState => ({
            ...prevState,
            [productId]: quantity
        }));

        const db = await getDBConnection();
        await updateQuantity(db, productId, quantity);
        getProductList();
    };


    // const updateProductQuantity=async(id, quantity)=>{
    //     
    // };


    // Increment quantity for a product
    const qtyIncrement = (id, qty) => {
        setQuantities(prevState => ({
            ...prevState,
            [id]: (prevState[id] || 1) + 1
        }));

        updateProductQuantity(id, qty + 1);
    };

    // Decrement quantity for a product, with a minimum of 1
    const qtyDecrement = (id, qty) => {
        setQuantities(prevState => ({
            ...prevState,
            [id]: Math.max((prevState[id] || 1) - 1, 1)
        }));

        updateProductQuantity(id, Math.max((qty || 1) - 1, 1));
    };



    // Get promo code from local storage
    const getPromoCode = async () => {
        // let code = await getSession(PROMOCODE);
      
        setPromoCode(route.params?.promoCode);

    }

    // Apply promo code
    const handlePromoCode = () => {
        setAppliedCode(promoCode);
        setPromoCode(null);
    };

    const addToList = async (product) => {
        console.log("Add to tabe Called "); setModalVisible(!modalVisible)
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

    const handleAddtoWishList = (product) => {
        addToList(product);
        deleteItem(product.product_id);
        setModalVisible(!modalVisible);
    }

    const handleCheckout = () => {

    }

    // Render individual product in the list
    const renderProductList = ({ item }) => {


        return (
            <SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible === item.product_id}
                    onRequestClose={() => {
                        Alert.alert(APP_NAME, 'Product has been removed !');
                        setModalVisible(false);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Remove from Cart ?</Text>
                            <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                                <Pressable
                                    style={[styles.button]}
                                    onPress={() => deleteItem(item.product_id)}>
                                    <Text style={styles.textStyle}> Remove </Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button]}
                                    onPress={() => handleAddtoWishList(item)}>
                                    <Text style={styles.textStyle}>Add to WishList</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.card}>
                    {/* <IconButton
                        icon="delete"
                        size={20}
                        style={styles.deleteButton}
                        onPress={() => { handleDelete(item.product_id) }}
                    /> */}

                    <Image source={{ uri: item.product_img }} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardDescription}>{item.product_name}</Text>
                        <Text style={styles.cardDescription}>Price: {item.product_price}</Text>
                        <View style={{ padding: 2 }}>
                            {/* <Text style={styles.itemInfoText}>Color: black </Text>
                            <Text style={styles.itemInfoText}>Size: M</Text> */}
                            <Text style={styles.quantityText}>Quantity: {item.product_qty || 1}</Text>
                            {/* <View style={styles.quantityContainer}>
                                <IconButton
                                    mode='outlined'
                                    icon="minus"
                                    size={12}
                                    style={styles.quantityButton}
                                    onPress={() => { qtyDecrement(item.product_id, item.product_qty) }}
                                />
                                
                                <IconButton
                                    mode='outlined'
                                    icon="plus"
                                    size={12}
                                    style={styles.quantityButton}
                                    onPress={() => { qtyIncrement(item.product_id, item.product_qty) }}
                                />
                            </View> */}
                        </View>
                    </View>
                </View></SafeAreaView>);
    };

    return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <SafeAreaView >
                <View style={styles.header}>
                    <View style={styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-left" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Cart</Text>
                    </View>
                    <View style={styles.cartEmpty}>
                                <Button
                                    mode="text"
                                    textColor="white"
                                    
                                    style={styles.cartEmptyButton}
                                    onPress={() => { handleCartEmpty() }}
                                >
                                    Clear Cart
                                </Button>
                                
                            </View>
                </View>
                {productList.length !== 0 ? (
                    <SafeAreaView >
                        {loading ? (
                            <ActivityIndicator size="large" color="#2E4053" />
                        ) : (<>
                            
                            <FlatList
                                data={productList}
                                numColumns={1}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderProductList}
                                contentContainerStyle={styles.listContent}
                            /></>
                        )}




                        <View style={styles.promoCodeView}>
                            <Text style={styles.promoCodeTitleText}> Promo Code: </Text>
                            <View style={styles.promoCodeWrapper}>
                                <TextInput
                                    mode='outlined'
                                    label="Enter Code Here"
                                    outlineColor="black"
                                    activeOutlineColor="#F0B27A"
                                    value={promoCode}
                                    style={styles.textInput}
                                    onChangeText={()=>setPromoCode()}
                                />
                                {promoCode === '' || promoCode == null ? (
                                    <FAB
                                        style={styles.fab}
                                        mode='flat'
                                        size="small"
                                        color="white"
                                        icon='plus'
                                        onPress={() => { navigation.navigate('PromoCode') }}
                                    />
                                ) : (
                                    <FAB
                                        style={[styles.fab, { backgroundColor: 'green' }]}
                                        mode='flat'
                                        size="small"
                                        color="white"
                                        icon='check'
                                        onPress={() => { handlePromoCode() }}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={styles.subTotalView}>
                            <View style={styles.subTotalItem}>
                                <Text style={styles.subTotalTitle}> SubTotal </Text>
                                <Text style={styles.subTotalTitle}> ${totalPrice} </Text>
                            </View>
                            {appliedCode && (
                                <View style={styles.subTotalItem}>
                                    <Text style={[styles.subTotalText, { fontWeight: "800" }]}> PromoCode: </Text>
                                    <View style={styles.appliedCodeView}>
                                        <Text style={[styles.subTotalText]} > {appliedCode} </Text>
                                        <Pressable onPress={() => { setAppliedCode('') }}>
                                            <Icon name="close" size={16} color="white" backgroundColor="black" style={{ borderRadius: 50, margin: 2, }} />
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                            <View style={styles.subTotalItem}>
                                <Text style={styles.subTotalText}> Discount </Text>
                                <Text style={styles.subTotalText}> $0.00 </Text>
                            </View>
                            <View style={styles.subTotalItem}>
                                <Text style={styles.subTotalText}> Delivery </Text>
                                <Text style={styles.subTotalText}> $00.00 </Text>
                            </View>
                            <View style={styles.totalText}>
                                <Text style={[styles.subTotalTitle,{fontWeight:"600", color:"#222", fontSize:19}]}> Total: </Text>
                                <Text style={[styles.subTotalTitle,{fontWeight:"600", color:"#222", fontSize:19}]}> ${totalPrice} </Text>
                            </View>
                        </View>
                        <View style={styles.totalView}>
                            <Button
                                mode="contained"
                                buttonColor='#E70038'
                                style={styles.checkoutButton}
                                onPress={() => { navigation.navigate('ShippingAddress', {
                                    from :"cart",
                                }) }}
                            >
                                Proceed To Checkout
                            </Button>
                        </View>
                    </SafeAreaView>
                ) : (
                    <View style={styles.cartEmptyView}>
                        <Text style={styles.cartEmptyText}> Your cart is Empty !! </Text>
                        <Image source={require('../assets/EcomImages/emptyCart.png')} style={styles.cartEmptyImage} />

                        <View style={styles.startShoppingContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Store')}>
                <Text style={styles.startShoppingText}>Start shopping</Text>
                <Icon name="store" color="white" size={30} />
            </TouchableOpacity>
        </View>
                    </View>
                )}
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
        width: "55%",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    listContent: {
        position: 'relative',
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginTop: 10,
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
        justifyContent: 'flex-start'
    },
    cardDescription: {
        fontSize: 18,
        marginVertical: 3,
        fontWeight: '400',
        color: 'black',
        fontFamily: getRegularFont1(),
    },
    deleteButton: {
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
        fontSize: 16,
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
        padding: 13,
    },
    subTotalItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 4,
    },
    subTotalTitle: {
        color: '#444',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: getRegularFont1(),
    },
    subTotalText: {
        fontSize: 18,
        color: '#555',
        fontFamily: getRegularFont1(),
    },
    totalView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flex-start",
        justifyContent: 'space-between',
        marginVertical: 10,
        gap: 5,
        marginHorizontal: 10,
        padding: 10,
        marginBottom: 60,
    },
    totalText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
    },
    checkoutButton: {
        borderRadius: 9,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '70%',
        padding: 5,
        opacity: 0.9,
        marginVertical: 8,
        fontFamily: getRegularFont1(),
    },
    appliedCodeView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        top: "70%",
    },
    modalView: {
        margin: 20,
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
        borderRadius: 12,
        padding: 10,
        margin: 4,
        elevation: 2, 
        backgroundColor: '#E81044',
        fontFamily: getRegularFont1(),
    },
    modalText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 17,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: getRegularFont1(),
    },
    cartEmpty: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartEmptyButton: {
        justifyContent:'space-between',
        borderRadius: 20,
    },
    cartEmptyView: {
        height: 450,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FFF',
        marginVertical: 50,
        margin: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartEmptyImage: {
        marginBottom: 20,
        height: 200,
        width: '100%',
        resizeMode: 'contain',
    },
    cartEmptyText: {
        color: '#555',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
        fontFamily: getRegularFont1(),
    },
    startShoppingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E70038',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontFamily: getRegularFont1(),
    },
    startShoppingText: {
        color: 'white',
        fontSize: 18,
        marginRight: 10,
        fontFamily: getRegularFont1(),
    },
});

export default Cart;
// Sample product data
// const ProductListData = {
//     "data": [
//         {
//             "id": "73",
//             "description": "Yellow traditional dress",
//             "count": "5",
//             "price": "500",
//             "image": require('../assets/EcomImages/dress4.jpeg'),
//             "parent": "0"
//         },
//         {c
//             "id": "102",
//             "description": "White lace blouse",
//             "count": "4",
//             "price": "350",
//             "image": require('../assets/EcomImages/dress2.jpeg'),
//             "parent": "73"
//         },
//     ]
// };

import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ToastAndroid,
    SafeAreaView,
    KeyboardAvoidingView,
    FlatList,
    Alert,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Button, Card, FAB, TextInput, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMERID, getSession } from '../common/LocalStorage';
import { CANCEL_ORDER, ORDERS } from '../common/webutils';
import { useIsFocused } from '@react-navigation/native';
import { getRegularFont1 } from '../common/utils';


const OrderScreen = ({ navigation }) => {

    const [order, setOrder] = useState([]);
    const [customerId, setCustomerId] = useState();
    const [loading, setLoading] = useState(true);


    const getInfo = async () => {
        const fetchedCustomerId = await getSession(CUSTOMERID);
        setCustomerId(fetchedCustomerId);
    }
    const isFocused = useIsFocused();
    useEffect(() => {
        getInfo()
    }, []);
    const handleCancelOrder = (orderId) => {
        CancelOrderAPI(orderId);
    }

    const CancelOrderAPI = (orderId) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=133b680179033a789672d735d6; currency=INR; language=en-gb");

        const raw = JSON.stringify({
            "orderId": orderId,
            "customer_id": customerId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(CANCEL_ORDER, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
    
    useEffect(() => {
        if (isFocused && customerId !== '') {
            OrderAPI();
        }

    }, [isFocused, customerId])

    const OrderAPI = () => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=133b680179033a789672d735d6; currency=INR; language=en-gb");

        const raw = JSON.stringify({
            "customer_id": customerId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(ORDERS, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                setOrder(json.data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }

    const OrderList = () => {

        const renderOrderList = ({ item }) => {

            const lineItems = item.line_items;
            return (
                <Pressable style={styles.orderItem} onPress={()=>navigation.navigate('OrderDetail',{
                    orderId: item.order_id,
                })} > 
                    <View style={styles.imageContainer}> 
                        {item.line_items[0].product_data.image ? <Image source={{ uri: item.line_items[0].product_data.image }} style={styles.image} /> : <Image source={require('../assets/EcomImages/dress2.jpeg')} style={styles.image} />}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.itemName}>Order Id: {item.order_id}</Text>
                        {/* <Text style={styles.quantity}>Quantity: {item.line_items[0].quantity}</Text> */}
                        <View style={[styles.status, {
                            backgroundColor: (item.order_status == "Canceled") ? '#E74C3C' : '#566573',
                        }]}>
                            <Text style={styles.statusText}>{item.order_status}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={styles.price}>${item.total}</Text>
                            {item.order_status !== "Canceled" &&
                                <Button
                                    mode="text"
                                    textColor='white'
                                    style={styles.cancelButton}
                                    onPress={() => { handleCancelOrder(item.order_id) }}
                                > Cancel </Button>}
                        </View>
                    </View>
                </Pressable>);
        }

        return (
        
        
        <FlatList
                data={order}
                keyExtractor={(item) => { item.order_id.toString() }}
                renderItem={renderOrderList}
                contentContainerStyle={styles.listContent}
            /> 
           
        
        )
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Orders</Text></View>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <Icon name="bell" size={24} color="white" />
                </TouchableOpacity> */}
            </View>
            <SafeAreaView>
            {loading ?  
                <View style={styles.pageLoadView}>
                    <ActivityIndicator size="large" color="#2E4053" style={styles.activityIndicator} />
                </View> 
                : 
                order.length === 0 ? 
                    <View style={styles.orderEmptyView}>
                        <Text style={styles.orderEmptyText}>No orders available</Text>
                    </View> 
                    : 
                    <OrderList />
            }
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
        alignItems: 'center',
        backgroundColor: '#2E4053',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "60%",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    promoCodeView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: 'black',
        fontFamily: getRegularFont1(),
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    orderItem: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        height: 140,
    },
    imageContainer: {
        width: '30%',
        height: "100%",
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        padding: 15,
        paddingHorizontal: 30,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        fontFamily: getRegularFont1(),
    },
    quantity: {
        fontSize: 16,
        color: '#555',
    },
    status: {
        backgroundColor: '#566573',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 8,
    },
    statusText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: getRegularFont1(),
    },
    price: {
        color: '#555',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    cancelButton: {
        height: 35,
        borderRadius: 4,
        backgroundColor: '#5F5F5F',
        marginHorizontal: 4,
    },
    pageLoadView:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 700,
    },
    activityIndicator:{
        marginBottom : 50,
    },
    orderEmptyView:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 200,
    },
    orderEmptyText:{
        color: '#222',
        fontSize: 30,
        fontWeight: "700",
        fontFamily: getRegularFont1(),
    },
});

export default OrderScreen;

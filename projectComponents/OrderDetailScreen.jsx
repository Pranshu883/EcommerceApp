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
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RNShareFile from 'react-native-share-pdf';
import Share from 'react-native-share';
import { getRegularFont1 } from '../common/utils';

const OrderDetailScreen = ({ navigation, route }) => {

    const [order, setOrder] = useState([]);
    const [customerId, setCustomerId] = useState();
    const [loading, setLoading] = useState(true);
    const [currentOrder, setCurrentOrder] = useState();
    const [pdfPath, setPdfPath] = useState('');


    

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
        navigation.goBack();
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
        if (isFocused) {
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
                
                const storeCurrentOrder = json.data.find(item => item.order_id === route.params.orderId);
                setCurrentOrder(storeCurrentOrder.line_items);
                setOrder(storeCurrentOrder);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }

    

    const OrderList = () => {

        const renderOrderList = ({ item }) => {

            
            return (
                <TouchableOpacity style={styles.orderItem}> 
                    <View style={styles.imageContainer}> 
                        {item.product_data.image ? <Image source={{ uri: item.product_data.image }} style={styles.image} /> : <Image source={require('../assets/EcomImages/dress2.jpeg')} style={styles.image} />}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                        
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <Text style={styles.price}>${item.total}</Text>
                          
                        </View>
                    </View>
                </TouchableOpacity>);
        }

        return (<>
            <FlatList
                data={currentOrder}
                keyExtractor={(item) => { item.order_id.toString() }}
                renderItem={renderOrderList}
                contentContainerStyle={styles.listContent}
            /> 
            <View style={styles.buttonView}> 
           <Button
                                    mode="text"
                                    textColor='white'
                                    style={styles.cancelButton}
                                    onPress={() => { handleCancelOrder(route.params.orderId) }}
                                > Cancel Order </Button></View>
        </>
        )
    }

    const PrintInvoice = ()=>{
        let totalAmount = 0
        const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Amazon Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f0f2f5;
                    color: #000;
                }
                .container {
                    max-width: 800px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    color: #007185;
                }
                .invoice-details {
                    margin-bottom: 20px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                .invoice-details h2 {
                    font-size: 18px;
                    margin-bottom: 5px;
                    color: #333;
                }
                .invoice-details p {
                    margin: 5px 0;
                    font-size: 14px;
                    color: #666;
                }
                .item-list {
                    border-collapse: collapse;
                    width: 100%;
                }
                .item-list th,
                .item-list td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .item-list th {
                    background-color: #f2f2f2;
                }
                .total {
                    margin-top: 20px;
                    text-align: right;
                }
                .total h3 {
                    font-size: 18px;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Invoice</h1>
                        <div class="invoice-details">
                            <div>
                                <h2>Invoice Details</h2>
                                <p><strong>Invoice Number:</strong> ${order.order_id} </p>
                                <p><strong>Date:</strong> ${order.date_added}</p>
                                <p><strong>Customer:</strong> ${order.shipping_firstname} ${order.shipping_lastname}</p>
                            </div>
                            <div>
                                <h2>Billing Address :</h2>
                                <p> ${order.payment_address_1} </p>
                            </div>
                        </div>
                        <div class="invoice-details">
                            <div>
                            </div>
                            <div>
                                <h2>Shipping Address :</h2>
                                <p>  ${order.payment_address_1}</p>
                            </div>
                        </div>
                        <table class="item-list">
                            <thead>
                                <tr>
                                    <th>SI.No</th>
                                    <th>Item</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.line_items.map((product, i) => {
                                    const productTotal = product.price * product.quantity;
                                        totalAmount += productTotal;
                                return(`
                                    <tr key=${i}>
                                        <td>${i + 1}</td>
                                        <td>${product.name}</td>
                                        <td>$${product.price}</td>
                                        <td>${product.quantity}</td>
                                        <td>$${product.price * product.quantity}</td>
                                    </tr>
                                
                         
                       
                
                        `)}).join('') }   
                        </tbody>
                        </table> 
                    <div class="total">
                        <h3>Total Amount: $${totalAmount}</h3>
                    </div>
                    <div>
                        <h3>
                                
                        </h3>
                    </div>
                </div>
        </body>
        </html>`;
        const createPDF = async () => {
            try {
                let PDFOptions = {
                    html: htmlContent,
                    fileName: 'testFile',
                    directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
                };
                let file = await RNHTMLtoPDF.convert(PDFOptions);

                if (!file.filePath) return ;
                
                const path = await FileViewer.open(file.filePath);
                setPdfPath(file.fileName.toString());
            } catch (error) {
                console.log('Failed to generate pdf', error.message);
            }
        };

        const handleSharePDF = async () => {
            try {
                let PDFOptions = {
                    html: htmlContent,
                    fileName: 'testFile',
                    directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
                };
                let file = await RNHTMLtoPDF.convert(PDFOptions);

                // if (!file.filePath) return ;
                console.log("file", file.filePath);
                const shareContent = {
                    title: 'Share PDF',
                    message: 'Here is the PDF file',
                    url: `file://${file.filePath}`,
                    type: 'application/pdf',
                    failOnCancel: true,
                };
    
                const result = await Share.open(shareContent);
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        console.log('Shared with activity type:', result.activityType);
                    } else {
                        console.log('Shared');
                    }
                } else if (result.action === Share.dismissedAction) {
                    console.log('Share cancelled');
                }
            } catch (error) {
                console.error('Error sharing PDF:', error.message);
            }
        };
    
        return (
            
            <View style={[styles.container, styles.centered]}>
                <TouchableOpacity style={styles.button} onPress={createPDF}>
                    <Text style={styles.buttonText}>Print Invoice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSharePDF}>
                    <Text style={styles.buttonText}>Share Invoice</Text>
                </TouchableOpacity>
            </View>

        );
    
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order Details</Text></View>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <Icon name="bell" size={24} color="white" />
                </TouchableOpacity> */}
            </View>
            <SafeAreaView>
                
            {loading ?  <View style={styles.pageLoadView} > 
                <ActivityIndicator size="large" color="#2E4053" style={styles.activityIndicator} />
            </View> :
            <>
            <OrderList/> 
            <PrintInvoice/>
         
             </>}   
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
        width: "70%",
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
        fontFamily: getRegularFont1(),
    },
   
   
    price: {
        color: '#555',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
        fontFamily: getRegularFont1(),
    },
    buttonView:{
        justifyContent: 'center',
        alignItems: "center",
        margin: 10,
    },
    cancelButton: {
        height: 35,
        width: '70%',
        borderRadius: 4,
        backgroundColor: '#5F5F5F',
        marginHorizontal: 4,
        fontFamily: getRegularFont1(),
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
    safeArea: {
        flex: 1,
       
    },
    centered: {
        padding: 10,
        backgroundColor:'#EBEDEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: 'lightblue', // Example button color
        borderRadius: 8,
        margin: 10,
        fontFamily: getRegularFont1(),
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: getRegularFont1(),
    },
});


export default OrderDetailScreen;

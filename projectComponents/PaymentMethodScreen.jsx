import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton, Button } from 'react-native-paper';
import { ADDRESSID, CUSTOMERID, POSTCODE, getSession } from "../common/LocalStorage";
import { CONFIRM_ORDER, EMPTYCART, PAYMENT_METHODS } from "../common/webutils";
import { APP_NAME } from "../common/string";
import { clearTable, getDBConnection, getProducts } from "../db/db";
import { deleteTable } from "../components/db-service";
import { getRegularFont1 } from "../common/utils";

const PaymentMethodScreen = ({ navigation, route }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [checked, setChecked] = useState('cod');


console.log('addressId ',route.params.addressId);
    console.log('customer_id=>', route.params.customerId);
    const orderConfirmAPI = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=34646ebcd3153c569e1b0fdc8e; currency=USD; language=en-gb");

        const raw = JSON.stringify({
            "customer_id":route.params.customerId,
            "currency": "INR",
            "address_id": route.params.addressId,
            "billing_address_id": route.params.addressId,
            "shipping_method": "flat.flat",
            "payment_method": "cod",

        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(CONFIRM_ORDER, requestOptions)
            .then((response) => response.json())
            .then((json) =>{
                if(json.success == '1'){
                    emptyCart();
                    navigation.navigate('thankyou');
                } 
            } )
            .catch((error) => console.error(error));
    }

    const cartEmptyAPI = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=34646ebcd3153c569e1b0fdc8e; currency=USD; language=en-gb");

        const raw = JSON.stringify({
            "customer_id": route.params.customerId,
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
                if(json.success == '1'){
                    
                    deleteCart();
                }
            })
            .catch((error) => console.error(error));
    }

    const emptyCart=()=>{
        cartEmptyAPI();
    }

    const deleteCart=async()=>{

        console.log('WITHIN DELETE CART');
        const db =await getDBConnection();
        await clearTable(db);
        // const cartItems = await getProducts(db);
        // cartItems.forEach(async(cartItem)=>{
        //     await deleteProduct(db, id);
        // })
        
    }

    const handleOrderConfirm = () => {
        orderConfirmAPI()
    }

    useEffect(() => {
        PaymentMethodAPI();
    }, [])

    const PaymentMethodAPI = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=89b3f619255c7fc826fd8ac53f; currency=INR; language=en-gb");

        const raw = JSON.stringify({
            "address_id": route.params.addressId,
            "comment": "test",
            "postcode": route.params.postCode,
            "customer_id": route.params.customerId,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(PAYMENT_METHODS, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                const arr = Object.entries(json.data.payment_methods);
                setPaymentMethods(arr);
            })
            .catch((error) => console.error(error));
    }


    const renderPaymentMethods = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.payItem}
                onPress={() => setChecked(item[0])}
            >
                <RadioButton
                    value={item[0]}
                    status={checked === item[0] ? 'checked' : 'unchecked'}
                    onPress={() =>{checked === item[0] ? setChecked(null) :  setChecked(item[0])}}
                    color="#F0B27A"
                />
                <Text style={styles.paymentMethodName}>{item[0]}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Methods</Text>
                <Text></Text>
            </View>
            <View style={styles.mainView}>
                <Text style={styles.selectPaymentText}>Select Payment Method</Text>
                <FlatList
                    data={paymentMethods}
                    keyExtractor={(item) => item[0]}
                    renderItem={renderPaymentMethods}
                    style={styles.flatlistView}
                />

                {checked ?
                    <Button
                        style={styles.submitButton}
                        mode='contained'
                        onPress={() => { handleOrderConfirm() }}
                    >
                        Save
                    </Button> :
                    <Button
                        style={styles.submitButton}
                        disabled
                        mode='contained'
                    >
                        Save
                    </Button>

                }
            </View>
        </ScrollView>
    );
}

export default PaymentMethodScreen;

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
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    mainView: {
        padding: 20,
        paddingTop: 10,
    },
    selectPaymentText: {
        color: '#555',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        fontFamily: getRegularFont1(),
    },
    payItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentMethodName: {
        color: '#555',
        fontSize: 16,
        marginLeft: 10,
        fontFamily: getRegularFont1(),
    },
    submitButton: {
        backgroundColor: '#F0B27A',
        borderRadius: 3,
        marginTop: 20,
    },
    flatlistView: {
        marginBottom: 20,
    },
});

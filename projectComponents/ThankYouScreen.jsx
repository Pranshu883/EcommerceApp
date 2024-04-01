import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getRegularFont1 } from '../common/utils';


const ThankYouScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{position: 'absolute',zIndex: 5, top:10,left:10}} onPress={() => navigation.goBack() }>
                        <Icon name="chevron-left" size={30} color="black" />
                    </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/EcomImages/OrderConfirmed.jpg")}
                    style={styles.image}
                    
                />
            </View>
            <Text style={styles.thankYouText}>Thank you for shopping with us!</Text>
            <Text style={styles.orderConfirmationText}>Your order has been successfully placed.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.continueShoppingButton}>
                <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE2C8', // Light background color
        padding: 20,
        position: 'relative',
    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        width: "100%",
        height: 250,
    },
    image: {
        width: "100%",
        height: 250,
    },
    thankYouText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#009688', // Blue text color
        fontFamily: getRegularFont1(),
    },
    orderConfirmationText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#333', // Darker text color
        fontFamily: getRegularFont1(),
    },
    continueShoppingButton: {
        backgroundColor: '#34495E', // Turquoise button color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    continueShoppingButtonText: {
        color: '#fff', // White button text color
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: getRegularFont1(),
    },
});

export default ThankYouScreen;

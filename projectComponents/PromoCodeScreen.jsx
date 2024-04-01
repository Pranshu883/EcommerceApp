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
    FlatList,
    Alert,
    Pressable,
} from 'react-native';
import { Button, Card, FAB, TextInput, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PROMOCODE, saveSession } from '../common/LocalStorage';
import { getRegularFont1 } from '../common/utils';

const PromoCodeScreen = ({ navigation }) => {

    const [promoCode, setPromoCode] = useState('');
    const [copyText, setCopyText] = useState('');

    const handleCopy = (text) => {
        setCopyText(text);
        copyToClipBoard(copyText);
    };
    const copyToClipBoard = (text) => {
        if (text) {
            Clipboard.setString(text);
            ToastAndroid.showWithGravity('Code Copied to clipboard', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setPromoCode(text);
          
        }
    };

    
    const handleApplyCode = () =>{

        
        navigation.navigate('Cart',{
            
            promoCode: promoCode,
            
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Promocodes</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <Icon name="bell" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.promoCodeView}>
                <TextInput
                    mode='outlined'

                    label="Enter Code Here"
                    outlineColor="black"
                    backgroundColor="white"
                    activeOutlineColor="black"
                    value={promoCode}
                    style={styles.textInput}
                    onChangeText={setPromoCode}
                />
                <Button
                    mode='contained'
                    textColor='black'
                    onPress={() => handleApplyCode()}
                    style={styles.button}
                > Apply Code </Button>
            </View>
            <View style={styles.offerView}>
                <View style={styles.offerTitle}>
                    <Text style={styles.offerText}> <Icon name="ticket-percent" size={24} /> 20% </Text>
                    <TouchableOpacity onPress={() => handleCopy("20firstorder")}>
                        <Icon name="content-copy" size={24} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.offerContent}>
                    <Text style={styles.text1}>Expire Dec 15,2024</Text>
                    <Text style={styles.text2}> 20firstorder </Text>
                </View>
            </View>
            <View style={styles.offerView}>
                <View style={styles.offerTitle}>
                    <Text style={styles.offerText}> <Icon name="ticket-percent" size={24} /> 25% </Text>
                    <TouchableOpacity onPress={() => handleCopy("25fridaysale")}>
                        <Icon name="content-copy" size={24} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.offerContent}>
                    <Text style={styles.text1}>Expire Sep 30,2024</Text>
                    <Text style={styles.text2}> 25fridaysale </Text>
                </View>
            </View>
        </SafeAreaView>
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
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
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
    textInput: {
        width: '100%',
        borderRadius: 10,
        marginBottom: 8,
        fontFamily: getRegularFont1(),
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        width: '100%',
        padding: 5,
        margin: 5,
        fontFamily: getRegularFont1(),
    },
    offerView: {
        borderRadius: 8,
        backgroundColor: "white",
        display: 'flex',
        justifyContent: 'center',
        padding: 15,
        margin: 10,
    },
    offerTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    offerContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    offerText: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: getRegularFont1(),
    },
    text1: {
        color: '#555',
        fontSize: 16,
        fontFamily: getRegularFont1(),
    },
    text2: {
        color: '#555',
        fontSize: 14,
        fontFamily: getRegularFont1(),
    }
});

export default PromoCodeScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import call from 'react-native-phone-call'
import { openComposer } from "react-native-email-link"; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getRegularFont1 } from '../common/utils';



  


const ContactUsScreen = ({ navigation }) => {

    const handleCall = () => {
        const args = {
            number: '8912717811',
            prompt: false,
            skipCanOpen: true
        };
        call(args).catch(console.error);
    };
    const handleEmail = ()=>{
        const args = {
            to: 'hello@alakmalak.com',
        }
        openComposer(args);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
                <View style={{ width: 24 }}></View> 
            </View>
            <View style={styles.contactUsView}>
                <Pressable onPress={handleCall}> 
                    <ContactInfo
                    icon="phone-in-talk-outline"
                    label="Call us on"
                    value="8912717811"
                    
                />
                </Pressable>
                <Pressable onPress={handleEmail}>
                    <ContactInfo
                    icon="email-outline"
                    label="Email us"
                    value="hello@alakmalak.com"
                />
                </Pressable>
                
            </View>
        </ScrollView>
    );
};

const ContactInfo = ({ icon, label, value }) => {
    return (
        <View style={styles.contactInfo}>
            <Icon name={icon} size={70} color="#2E4053" />
            <Text style={styles.boldText}>{label}</Text>
            <Text style={styles.text}>{value}</Text>
        </View>
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
        backgroundColor: '#2E4053',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '500',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    contactUsView: {
        paddingHorizontal: 20,
        paddingTop: 20,
        margin: 20,
    },
    contactInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        color: '#2E4053',
        fontFamily: getRegularFont1(),
    },
    text: {
        fontSize: 16,
        color: '#555',
        fontFamily: getRegularFont1(),
    },
});


export default ContactUsScreen;

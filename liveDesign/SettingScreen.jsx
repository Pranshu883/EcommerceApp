import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';


const SettingScreen = () => {
    const [isChatSwitchOn, setIsChatSwitchOn] = useState(false);
    const [isEventSwitchOn, setIsEventSwitchOn] = useState(false);
    const [isDarkSwitchOn, setIsDarkSwitchOn] = useState(false);
    const [isPrivacySwitchOn, setIsPrivacySwitchOn] = useState(false);


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("English");
    const [items, setItems] = useState([
        { label: 'English', value: 'English' },
        { label: 'Hindi', value: 'Hindi' }
    ]);

    const LanguageDropDown=()=>{
        return(
            <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            
                            style={styles.dropDownPicker}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        
                        />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTilteView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>
            </View>
            <ScrollView style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}> Notifications </Text>
                    <View style={styles.cardItem}>
                        <Text style={styles.cardItemText}> Astromall chat</Text>
                        <Switch
                            value={isChatSwitchOn}
                            color="#E7D329"
                            size={12}
                            onValueChange={() => setIsChatSwitchOn(!isChatSwitchOn)}
                        />
                    </View>
                    <View style={styles.cardItem}>
                        <Text style={styles.cardItemText}> Live Events</Text>
                        <Switch
                            value={isEventSwitchOn}
                            color="#E7D329"
                            size={12}
                            onValueChange={() => setIsEventSwitchOn(!isEventSwitchOn)}
                        />
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}> Privacy </Text>
                    <View style={styles.cardItem}>
                        <Text style={[styles.cardItemText, { width: 200, margin: 4 }]}>Show my name in reviews section of astrologer's profile</Text>
                        <Switch
                            value={isPrivacySwitchOn}
                            color="#E7D329"
                            size={12}
                            onValueChange={() => setIsPrivacySwitchOn(!isPrivacySwitchOn)}
                        />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.darkModeCardItem}>
                        <View style={styles.cardDarkModeWrapper}>
                            <Icon name="moon-waning-crescent" size={26} color="#555" />
                            <Text style={styles.darkModeText}> Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDarkSwitchOn}
                            color="#E7D329"
                            size={12}
                            onValueChange={() => setIsDarkSwitchOn(!isDarkSwitchOn)}
                        />
                    </View>
                </View>
                <View style={[styles.card, { zIndex: 5}]}>
                    <View style={styles.cardDropDownItem}>
                        <Text style={styles.cardTitle}>Change App language</Text>
                        <LanguageDropDown/>
                    </View>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={styles.cardItem}> 
                            <Text style={styles.cardTitleGreen}>Manage Your Privacy! </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={styles.cardItem}> 
                            <Text style={styles.cardTitleGreen}>Notifications </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={styles.cardItem}> 
                            <Text style={styles.cardTitleGreen}>Terms and Conditions </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={styles.cardItem}> 
                            <Text style={styles.cardTitleGreen}>Privacy Policy </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={styles.logoutWrapper}>
                            <Icon name="logout" size={24} color="#444"  />
                            <Text style={styles.cardTitle}>Logout </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.card,{marginBottom: 20}]}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={styles.logoutWrapper}>
                            <Icon name="delete-outline" size={24} color="red"  />
                            <Text style={styles.deleteText}>Delete my account </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: '#E7D329',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 12,
    },
    headerTilteView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 5,
        marginHorizontal: 3,
    },
    headerTitle: {
        color: "black",
        fontSize: 22,
        marginHorizontal: 30,
    },
    body: {
        padding: 10,
        
    },
    card: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 4,
        zIndex: 2,
    },
    cardTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        padding: 3,
    },
    cardItem: {
        flexDirection: 'row',
        marginHorizontal: 4,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardItemText: {
        color: '#555',
        fontSize: 13,
    },
    cardDarkModeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
    },
    darkModeCardItem:{
        flexDirection: 'row',
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8, marginBottom: 10
    },
    darkModeText:{
        color: '#555',
        fontSize: 16,
    },
    cardDropDownItem:{
        marginHorizontal: 4,
        marginBottom: 4,
        flexDirection: 'column', 
        alignItems: 'flex-start' ,
        justifyContent: 'space-between',
    },
    dropDownPicker:{
        borderRadius: 5, 
        marginVertical: 10,
        marginTop: 10,
        borderWidth: 0.4, 
    },
    logoutWrapper:{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        padding: 5,
    },
    cardTitleGreen:{
        color:"#52BE80",
        fontSize: 16,
        fontWeight: '500',
        padding: 3,
    },
    deleteText:{
        color: 'red',
        fontSize: 15,
        fontWeight: '400',
        marginHorizontal: 10,
    }
});

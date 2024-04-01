import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View, Alert, BackHandler } from "react-native";
import MainPage from "./MainPage";
import { Button } from "react-native-paper";
import Chat from "./Chat";
import Contacts from "./Contacts";
import ListPage from "./ListPage";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import TopTab from "./TopTab";


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();




const Home = ({ route, navigation }) => {

    const [user, setUser] = useState(null);

    const value = {
        "name": route.params?.nameInput || 'No name',
        "email": route.params?.emailInput || 'no email',
        "number": route.params?.numberInput || 'no number',
        "password": route.params?.passwordInput || 'no password',
    };
    const storeUser = async () => {
        try {
            await AsyncStorage.setItem("User", JSON.stringify(value));
        }
        catch (error) {
            Alert(error);
        }
    };
    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("User");
            const currentUser = JSON.parse(savedUser);
            return (currentUser);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        storeUser();
        getUser().then((userData) => {
            setUser(userData);
        });

        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <Tab.Navigator
        >
            <Tab.Screen name="Home Screen" component={MainPage} options={{

                tabBarIcon: ({ color, size }) => {
                    return <Icon name="home" size={size} color={color} />;
                },
            }} />
            <Tab.Screen name="Chat" component={Chat} options={{

                tabBarIcon: ({ color, size }) => {
                    return <Icon name="message" size={size} color={color} />;
                },
            }} />
            <Tab.Screen name="Contacts" component={TopTab} options={{

                tabBarIcon: ({ color, size }) => {
                    return <Icon name="phone" size={size} color={color} />;
                },
            }} />
            <Tab.Screen name="ListPage" component={ListPage} />
        </Tab.Navigator>
    );
}

export default Home;









{/* {user ? (
                    <Text style={{ color: "black" }}>
                        Name: {user.name} 
                        Email: {user.email} 
                        Number: {user.number}
                        Password: {user.password} 
                    </Text>
                ) : (
                    <Text style={{ color: "black" }}>Loading...</Text>
                )} */}
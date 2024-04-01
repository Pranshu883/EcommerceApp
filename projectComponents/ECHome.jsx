import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, BackHandler, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EForgotPassword from "./EForgotPassword";
import Cart from "./Cart";
import MyAccount from "./MyAccount";
import DashBoard from "./DashBoard";
import CategoryScreen from "./CategoryScreen";
import { useIsFocused, useRoute } from "@react-navigation/native";
import ProductDetailScreen from "./ProductDetailScreen";
import WishList from "./WishList";
import { Badge } from "react-native-paper";
import { getDBConnection, getProducts } from "../db/db";
import { CUSTOMERID, FIRST_NAME, getSession, saveSession } from "../common/LocalStorage";
import { firebase } from "@react-native-firebase/auth";
import MyDrawer from "./MyDrawer";

const Tab = createBottomTabNavigator();

const ECHome = ({ navigation , route}) => {
    const [cartLength, setCartLength] = useState();

    const isFocused = useIsFocused();
    const getCartLength=async () => {
        try {
    
          const db = await getDBConnection();
            const fetchedCustomerId = await getSession(CUSTOMERID);
    
          const storedProducts = await getProducts(db, fetchedCustomerId);
          const currentLength = storedProducts.length;
          console.log('items in cart : ',currentLength);
            setCartLength(currentLength);

    
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        if(isFocused){
            getCartLength();
        }
        
        const backAction = () => {
            if (navigation.isFocused()) {
                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: 'YES',
                        onPress: () => BackHandler.exitApp(),
                    },
                ]);
                return true;
            } else {
                navigation.goBack();
                return true;
            }
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [navigation, isFocused]);

    

    

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: '#2E4053',
                flex: 0.09,
                borderRadius: 25,
                overflow: 'hidden',
                position: 'absolute',
                justifyContent: 'space-around',
                marginHorizontal: 5,
                marginBottom: 3,
            },
            tabBarActiveTintColor: '#E70038',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: false,

        }}>
             <Tab.Screen name='Drawer' component={MyDrawer} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <Icon name="store" size={size} color={color} />;
                },
            }} />
            {/* <Tab.Screen name='Store' component={DashBoard} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <Icon name="store" size={size} color={color} />;
                },
            }} /> */}
            <Tab.Screen name='Category' component={CategoryScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="view-list" size={size} color={color} />;
                    },
                }} />
            <Tab.Screen name='cart' component={Cart} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return (
                        <View style={styles.tabBarItem}>
                            <Icon name="cart" size={size} color={color} />
                            <Badge style={styles.badge} size={16}  >{cartLength}</Badge>
                        </View>
                    );
                },
            }} />
            <Tab.Screen name='WishList' component={WishList} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <Icon name="heart" size={size} color={color} />;
                },
            }} />
            <Tab.Screen name='My Account' component={MyAccount} route={route}
                options={{ headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="account" size={size} color={color} />;
                    },
                }} />
        </Tab.Navigator>
    );
};
export default ECHome;

const styles = StyleSheet.create({
    tabBarItem: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        top: -7,
        right: -8,
        backgroundColor: '#E70038',
    }
})

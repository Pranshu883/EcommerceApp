import React, { useCallback, useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Chat from './components/Chat';
import Contacts from './components/Contacts';
import TopTab from './components/TopTab';
import Example from './components/Example';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Alert,
  AppState,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ExpandableList from './components/ExpandableList';
import AnimationPage from './components/AnimationPage';
import ProfileScreen from './components/ProfileScreen';
import crashlytics from '@react-native-firebase/crashlytics';

import DemoProjectMain from './components/DemoProjectMain';



// ECommerce Project Screens 
import ERegisterPage from './projectComponents/ERegisterPage';
import ELoginPage from './projectComponents/ELoginPage';
import EForgotPassword from './projectComponents/EForgotPassword';
import MyAccount from './projectComponents/MyAccount';
import ECHome from './projectComponents/ECHome';
import SplashScreen from 'react-native-splash-screen';
import OnboardingScreen from './projectComponents/OnboardingScreen';
import UpdateProfileScreen from './projectComponents/UpdateProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryScreen from './projectComponents/CategoryScreen';
import ProductListScreen from './projectComponents/ProductListScreen';
import PromoCodeScreen from './projectComponents/PromoCodeScreen';
import ProductDetailScreen from './projectComponents/ProductDetailScreen';
import { CUSTOMERID, getSession, ONBOARDED } from './common/LocalStorage';
import Cart from './projectComponents/Cart';
import ShippingAddressSave from './projectComponents/ShippingAddressSave';
import PaymentMethodScreen from './projectComponents/PaymentMethodScreen';
import OrderScreen from './projectComponents/OrderScreen';
import WishList from './projectComponents/WishList';
import SearchScreen from './projectComponents/SearchScreen';
import ContactUsScreen from './projectComponents/ContactUsScreen';
import {  createTable, creatWishListTable, getDBConnection, getProducts } from './db/db';
import OrderDetailScreen from './projectComponents/OrderDetailScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import { store } from './reduxTodo/store';

import TodoApp from './reduxTodo/todos/TodoApp';
import ProductListApp from './reduxTodo/todos/ProductListApp';
import MyDrawer from './projectComponents/MyDrawer';
import SettingScreen from './liveDesign/SettingScreen';
import BookPoojaScreen from './liveDesign/BookPoojaScreen';
import PoojaDetailScreen from './liveDesign/PoojaDetailScreen';
import ThankYouScreen from './projectComponents/ThankYouScreen';
import { EMPTYCART } from './common/webutils';
import { APP_NAME } from './common/string';
import ChatPage from './liveDesign/ChatPage';
import StoreDesign from './liveDesign/StoreDesign';
import ServiceDetailScreen from './liveDesign/ServiceDetailScreen';
import { AstrologerDeatilsScreen } from './liveDesign/AstrologerDeatilsScreen';
import CalendarExample from './liveDesign/CalendarExample';
import test from './liveDesign/test';
import RegisterPageDesign from './liveDesign/RegisterPageDesign';
import Horoscope from './liveDesign/Horoscope';






const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  const [onboarded, setOnboarded] = useState('');



  


  const loadDataCallBack = useCallback(async () => {
    try {

      const db = await getDBConnection();
      await createTable(db);
      await creatWishListTable(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  
  
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);
  useEffect(() => {
      loadDataCallBack();
  }, []);
  useEffect(() => {
    // Configure Google Sign-In when the app starts
    GoogleSignin.configure({
      webClientId: '263761611453-09jdae27okvsc73fas96elfv8nastd3s.apps.googleusercontent.com',
    });
  }, []);



  useEffect(() => {
    SplashScreen.hide();

  }, []);



 

  // useEffect(() => {
  //   crashlytics().log('App mounted.');
  // }, []);




  return (
    <Provider store= {store}>
    <NavigationContainer
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}
        initialRouteName='Login'
       >

        <Stack.Screen name='Login' component={ELoginPage} />
        <Stack.Screen name='Register' component={ERegisterPage} />
        <Stack.Screen name='Forgot Password' component={EForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name='My Account' component={MyAccount} options={{ headerShown: true }} />
        <Stack.Screen name='Home' component={ECHome} />
        <Stack.Screen name='Onboarding' component={OnboardingScreen} />
        <Stack.Screen name='Update Profile' component={UpdateProfileScreen} />
        <Stack.Screen name='Categories' component={CategoryScreen} />
        <Stack.Screen name='ProductList' component={ProductListScreen} />
        <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
        <Stack.Screen name='PromoCode' component={PromoCodeScreen} />
        <Stack.Screen name='Cart' component={Cart} />
        <Stack.Screen name='ShippingAddress' component={ShippingAddressSave} />
        <Stack.Screen name='PaymentMethod' component={PaymentMethodScreen} />
        <Stack.Screen name='OrderScreen' component={OrderScreen} />
        <Stack.Screen name='OrderDetail' component={OrderDetailScreen} />
        <Stack.Screen name='WishList' component={WishList} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} />
        <Stack.Screen name='ContactUS' component={ContactUsScreen} />
        <Stack.Screen name='thankyou' component={ThankYouScreen}/>

        {/* <Stack.Screen name="SettingScreen" component={SettingScreen}/>
        <Stack.Screen name="BookPooja" component={BookPoojaScreen}/>
        <Stack.Screen name="PoojaDetail" component={PoojaDetailScreen}/>
        <Stack.Screen name="ChatPage" component={ChatPage}/> */}

        {/* <Stack.Screen name="StoreDesign" component={StoreDesign} />
      
        <Stack.Screen name="AstrologerDetailScreen" component={AstrologerDeatilsScreen} />
        <Stack.Screen name="test" component={test} />

       <Stack.Screen name="RegisterPage" component={RegisterPageDesign} />
       <Stack.Screen name="Horoscope" component={Horoscope} /> */}
      </Stack.Navigator>

     
    </NavigationContainer>
   
   
</Provider> 
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

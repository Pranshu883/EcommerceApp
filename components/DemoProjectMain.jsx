import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Chat from './components/Chat';
import Contacts from './components/Contacts';
import TopTab from './components/TopTab';
import Example from './components/Example';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import {
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
import ExpandableList from './components/ExpandableList';
import AnimationPage from './components/AnimationPage';
import ProfileScreen from './components/ProfileScreen';
import crashlytics from '@react-native-firebase/crashlytics';
import FacebookLogin from './components/FaceBookLogin';
import TodoList from './components/TodoList';



const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();







function DemoProjectMain() {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);


  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown:false}}
          initialRouteName='LoginPage'>

          <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Welcome' }}/>
          <Stack.Screen name="Register" component={RegisterPage} />

          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Contacts" component={Contacts}/>
          <Stack.Screen name="ExpandableList" component={ExpandableList}/>
          <Stack.Screen name="AnimationPage" component={AnimationPage} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="FaceBook" component={FacebookLogin} />
          <Stack.Screen name="TodoList" component={TodoList} />
        </Stack.Navigator> 
      
        {/* <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator> */}

      </NavigationContainer>
    </PaperProvider>
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

export default DemoProjectMain;

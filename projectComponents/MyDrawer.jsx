import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import CategoryScreen from './CategoryScreen';
import WishList from './WishList';
import DashBoard from './DashBoard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { FIRST_NAME, clearAsyncStorage, getSession } from '../common/LocalStorage';
import { getRegularFont1 } from '../common/utils';

const Drawer = createDrawerNavigator();

const handleLogOut = (navigation) => {
  Alert.alert(
    'Log Out',
    'Do you want to log out?',
    [
      {
        text: 'No',
        onPress: () => console.log('No pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          clearAsyncStorage();
          navigation.navigate('Login');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]
  );
};

function CustomDrawerContent({ navigation }) {
  const [userName, setUserName] = useState('');
  useEffect(()=>{
    const fetchData=async()=>{
      const fetchedUserName =await getSession(FIRST_NAME);
      setUserName(fetchedUserName);
    }
      fetchData();
  },[])



  return (
    <DrawerContentScrollView {...navigation} style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>{userName}</Text>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
          <Icon name="store" color={color} size={size} />
        )}
        label="Store"
        onPress={() => navigation.navigate('Store')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemText}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Icon name="view-list" color={color} size={size} />
        )}
        label="Category"
        onPress={() => navigation.navigate('Category')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemText}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Icon name="heart" color={color} size={size} />
        )}
        label="WishList"
        onPress={() => navigation.navigate('WishList')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemText}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Icon name="file-document" color={color} size={size} />
        )}
        label="Privacy Policy"
        onPress={() => Linking.openURL('https://www.alakmalak.com/privacy-policy.html')}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemText}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        )}
        label="Log out"
        onPress={() => handleLogOut(navigation)}
        style={styles.drawerItem}
        labelStyle={styles.drawerItemText}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer({ route }) {




  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: '#EBEDEF',
          width: '75%', // Adjust as needed
        },        
        
      }}
      backBehavior='firstRoute'
      drawerContent={({ navigation }) => <CustomDrawerContent navigation={navigation} />}
    >
      <Drawer.Screen name="Store" component={DashBoard} />
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="WishList" component={WishList} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerHeaderText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#333',
    fontFamily: getRegularFont1(),
  },
  drawerItem: {

  },
  drawerItemText: {
    fontSize: 18,
    color: '#555',
    fontFamily: getRegularFont1(),
  },
});

export default MyDrawer;

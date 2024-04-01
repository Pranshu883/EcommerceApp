import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, useTheme, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);



const MainPage = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = "https://jsonplaceholder.typicode.com/posts";

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    const scrollViewRef = useRef(null);

    const scrollToBottom = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };

    const scrollToTop = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    };

    const theme = useTheme();



    useEffect(() => {
      crashlytics().log('App mounted.');
    }, []);

    useEffect(()=>{
      requestUserPermission();
      registerForPushNotifications();

      handleNotification();
    },[])
     async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }

      async function registerForPushNotifications() {
        const token = await messaging().getToken();
        console.log('Push notification token:', token);
      }

      async function handleNotification() {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message received!', remoteMessage);
        });
        
        messaging().onNotification(notification => {
          console.log('Notification received!', notification);
        });
        
        messaging().onNotificationOpened(notificationOpen => {
          console.log('Notification opened!', notificationOpen);
        });
      }

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
    >
      <View style={styles.topNavView}>
        <Button
          style={{ borderColor: 'lightblue', padding: 5, margin: 5, width: 200, textColor: "black", }}
          mode='outlined'
          title='Go to AnimationPage'
          onPress={() => {
            navigation.navigate('AnimationPage', { name: 'AnimationPage' });
          }}
        >
          Go to AnimationPage
        </Button>
        <Button
          style={styles.profileButton}
          mode='outlined'
          icon=''
          onPress={() => {
            navigation.navigate('ProfileScreen', { name: 'Profile' });
          }}
        >
          P
        </Button>
      </View>

      {/* {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        data.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.body}>{post.body}</Text>
          </View>
        ))
      )} */}

      <Button title="Test Crash" mode="contained" onPress={() => crashlytics().crash()} style={styles.logoutButton} > Test Crash </Button> 

      <Button
        mode="outlined"
        color="lightblue"
        onPress={() => {
          AsyncStorage.clear();
          navigation.navigate("LoginPage");
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }]
          });
        }}
        style={styles.logoutButton}
      >
        Logout
      </Button>
      <FAB
        icon="arrow-up"
        style={styles.scrollToTopFab}
        onPress={scrollToTop}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  loadingText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  postContainer: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    padding: 16,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: 'black',
    fontSize: 16,
    marginTop: 8,
    borderRadius: 4,
    borderTopWidth: 1,
    paddingTop: 10,

  },
  logoutButton: {
    marginTop: 16,
    borderColor: 'lightblue',
  },
  scrollToTopFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'lightblue',
  },
  topNavView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  profileButton: {
    borderColor: 'green',
    borderRadius: 40,
    padding: 5,
    margin: 5,
    width: 100,
    textColor: "black",
  },
});

export default MainPage;

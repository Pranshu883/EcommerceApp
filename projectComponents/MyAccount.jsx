import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Image, View, Text, Alert, Pressable, TouchableOpacity, ToastAndroid, Linking } from "react-native"; // Import ToastAndroid
import { Button, FAB } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { CUSTOMERID, FIRST_NAME, PFP, clearAsyncStorage, getSession, saveSession } from "../common/LocalStorage";
import { clearTable, getDBConnection } from "../db/db";
import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";
import { launchImageLibrary } from 'react-native-image-picker';
import { getRegularFont1 } from "../common/utils";


const MyAccount = ({ navigation, route }) => {
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const [image, setImage] = useState(''); // State to hold the profile image URI
    const [select, onSelect] = useState(false); // State to handle image selection mode
    const [userInfo, setUserInfo] = useState(null);


    const isFocused = useIsFocused();


    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // You can access user information here.
                const { displayName, email, photoURL, uid } = user;
                setUserInfo({ displayName, email, photoURL, uid });

                saveSession(FIRST_NAME, userInfo.displayName);
                saveSession(CUSTOMERID, userInfo.uid);
                console.log("userInfo ===>", userInfo);

            } else {
                // User is signed out.
                // Clear user information if needed.
                setUserInfo(null);
            }
        });

        // Cleanup function
        return unsubscribe;
    }, []);
    useEffect(() => {
        if (isFocused) {
            getInfo(); // Fetch user info on component mount
        }
    }, [isFocused])


    async function onGoogleSignOut() {
        try {
            // Sign out from Google
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            // Sign out from Firebase
            await firebase.auth().signOut();

            // Optional: Navigate to the sign-in screen or perform any other actions after sign-out
            console.log('Signed out successfully!');
        } catch (error) {
            console.error('Google sign-out error:', error);
            // Handle sign-out errors
        }
    }

    async function onFacebookSignOut() {
        try {
            // Sign out from Facebook
            await LoginManager.logOut();

            // Sign out from Firebase
            await firebase.auth().signOut();

            // Optional: Navigate to the sign-in screen or perform any other actions after sign-out
            console.log('Signed out successfully!');
        } catch (error) {
            console.error('Facebook sign-out error:', error);
            // Handle sign-out errors
        }
    }
    // Function to fetch user info from AsyncStorage
    const getInfo = async () => {
        try {
            const storedUserName = await getSession(FIRST_NAME);
            if (storedUserName !== null) {
                setUserName(storedUserName); // Set user name if it exists in AsyncStorage
            }
            // else if(userInfo.displayName !== null){
            //     setUserName(userInfo.displayName);
            // }
        } catch (error) {
            console.error('Error retrieving userName from AsyncStorage:', error);
        }
    }

    useEffect(() => {
        if (select) {
            openImagePicker();
        }
        else {
            setImage(require('../assets/Images/pfp.jpeg'));
        }
    }, [select]);

    // Effect to handle image selection mode change
  

    const openImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => { // Specify mediaType as 'photo'
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error(response.error);
            } else {
                const uri = response.assets[0].uri;
                setImage({uri: response.assets[0].uri}); // Set the selected image URI
                showToast("Profile picture updated"); // Show toast message for profile picture update
            }
        });
    };
    // Function to show toast message
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT); // Show toast message with short duration
    };

    const handleLogOut = () => {
        Alert.alert(
            'Log Out',
            'Do you want to log out ?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('No pressed'),
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        clearAsyncStorage();
                        //clearDataTable();

                        if (route.params?.from == 'faceBook')
                            onFacebookSignOut();
                        if (route.params?.from == 'google')
                            onGoogleSignOut();
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


    return (
        <ScrollView style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileView}>
                <View style={styles.profileImgView}>
                    
                    {image && 
                    <Image
                            source={image}
                            style={styles.profileImg}
                        />
                    }
                    
               
                    <TouchableOpacity style={styles.changeProfile} onPress={() => onSelect(!select)}>
                        <Icon name="camera" size={24} color="black" style={styles.cameraIcon} />
                    </TouchableOpacity>

                </View>
                <View style={styles.profileInfo}>
                    <Text style={[styles.infoText, styles.boldText]}>
                        {userName}
                    </Text>

                </View>
                <FAB
                    style={styles.editButton}
                    color="white"
                    icon='pencil'
                    onPress={() => { navigation.navigate('Update Profile') }}
                />
            </View>

            {/* Menu Section */}
            <View style={styles.menuView}>
                <MenuItem icon='book' text='My Orders' onPress={() => navigation.navigate('OrderScreen')} />
                <MenuItem icon='map-marker' text='Delivery Address' onPress={() => navigation.navigate('ShippingAddress', {
                    from: "profile",
                })} />
                <MenuItem icon='phone' text='Contact Us' onPress={() => navigation.navigate('ContactUS')} />
                <MenuItem icon='file-document' text='Privacy Policy' onPress={() => Linking.openURL("https://www.alakmalak.com/privacy-policy.html")} />

            </View>

            {/* Logout Button */}
            <FAB
                style={styles.logoutButton}
                color="white"
                icon="logout"
                label="Log out"
                onPress={() => { handleLogOut() }}
            />
        </ScrollView>
    );
};

// Functional component for menu items
const MenuItem = ({ icon, text, onPress }) => (
    <TouchableOpacity
        style={styles.menuButton}
        onPress={onPress}
    >
        <View style={styles.menuItem}>
            <Icon name={icon} size={20} color="#555" />
            <Text style={styles.menuText}>{text}</Text>
            <Icon name='chevron-right' size={28} color="#555" />
        </View>
    </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E8E8',
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 16,
        marginBottom: 20,
    },
    profileImgView: {
        height: 100,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        overflow: 'hidden',
        position: 'relative', // Add position relative to parent
        borderColor: 'black',
    },
    profileImg: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 60,
        borderWidth: 4,
    },
    cameraIcon: {
        backgroundColor: 'white',
        borderRadius: 40,
        padding: 2,
        opacity: 0.8,
    },
    changeProfile: {
        position: 'absolute',
        left: '77%',
        bottom: '13%',
        zIndex: 3,
    },
    profileInfo: {
        flex: 1,
    },
    infoText: {
        color: 'black',
        fontSize: 16,
        fontFamily: getRegularFont1(),
    },
    boldText: {
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: 'black',
    },
    menuView: {
        padding: 16,
    },
    menuButton: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    menuText: {
        marginLeft: 10,
        flex: 1,
        color: '#444',
        fontSize: 18,
        fontFamily: getRegularFont1(),
    },
    logoutButton: {
        position: 'relative',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        borderRadius: 20,
    },
});



export default MyAccount;

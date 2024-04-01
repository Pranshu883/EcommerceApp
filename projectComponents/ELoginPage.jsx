import React, { useEffect, useState, useRef } from "react";
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Divider, FAB, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import MyAccount from "./MyAccount";
import { CUSTOMERID, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, PHONE, is_login, saveSession } from "../common/LocalStorage";
import { LOGIN } from "../common/webutils";
import { firebase } from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import crashlytics from '@react-native-firebase/crashlytics';
import { getRegularFont1 } from "../common/utils";




const ELoginPage = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isFocused = useIsFocused();

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [load, setLoad] = useState(false);

   
    
    useEffect(() => {
        getSession();
    }, [isFocused]);

    const getSession = async () => {
        const is_login = await AsyncStorage.getItem('is_login');
        if (is_login !== null && is_login !== '0') {
            navigation.navigate('Home', {
                emailInput: email,
                passwordInput: password,
            });
        } else {
            setLoad(true);
        }
    };

    const loginAPI = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=57fb79259ff947769c10e38058; currency=INR; language=en-gb");

        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            // headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(LOGIN, requestOptions)
            .then(response => response.json())
            .then(json => {
                if (json.success == 1) {

                    //  setUsername(data.email)

                    // await AsyncStorage.setItem('userName', username);
                    saveSession(FIRST_NAME, json.data.first_name);
                    saveSession(LAST_NAME, json.data.last_name);
                    saveSession(EMAIL, json.data.email);
                    saveSession(PHONE, json.data.phone);
                    saveSession(CUSTOMERID, json.data.user_id)

                    AsyncStorage.setItem('is_login', '1');
                    navigation.navigate('Home', {


                     from: "login",
                                    emailInput: email,
                                    passwordInput: password,  });

                } else {
                    if (json.error.length > 0) {
                        Alert.alert(json.error[0]);
                    }
                }

            })
            .catch(error => console.log('error', error));



        try {

        } catch (error) {
            console.error('Error saving userName to AsyncStorage:', error);
        }

    };

    useEffect(() => {
        validateForm();
    }, [email, password])

    const validateForm = () => {
        let errors = {};
        const emailRegex = /\S+@\S+\.\S+/;

        if (!email) {
            errors.email = 'Email field is empty';

        } else if (!emailRegex.test(email)) {
            errors.email = 'Email is invalid';

        }

        if (!password) {
            errors.password = 'Enter a Password';

        } else if (password.length < 8) {
            errors.password = 'Password must be atleast 8 characters long';

        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }


    const handleValidation = async () => {


        const emailRegex = /\S+@\S+\.\S+/;


        if (isFormValid) {

            loginAPI();

        }
        else {
            const errorMessage = Object.values(errors).join('\n');

            if (errors.email) {
                emailRef.current.focus();
                Alert.alert(errors.email)
            }
            else if (errors.password) {
                passwordRef.current.focus();
                Alert.alert(errors.password)
            }

        }
    };


    function FacebookSignIn() {
        return (
        <FAB
            icon="facebook"
            color="#2855A0"
            mode="flat"
            size="medium"
            style={styles.fab}
            onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
        />

        );
    }

    async function onFacebookButtonPress() {

        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            console.log(`FB Login result:\n${JSON.stringify(result)}`);

            if (result.isCancelled) {
                return Promise.reject();
            }

            const accessTokenData = await AccessToken.getCurrentAccessToken();
            console.log(`FB Access Token Data:\n${JSON.stringify(accessTokenData)}`);

            if (!accessTokenData || !accessTokenData.accessToken) {
                throw new Error('Something went wrong obtaining the user\'s access token');
            }
            // else{
            //     AsyncStorage.setItem('is_login', '1');
            //     navigation.navigate('Home');
            // }

            const fbCredential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
            console.log(`Created FB credential:\n${JSON.stringify(fbCredential)}`);

            await firebase.auth().signInWithCredential(fbCredential);
            AsyncStorage.setItem('is_login', '1');
            navigation.navigate('Home',{
                screen: 'My Account',
                params: { from: 'faceBook' }
            });
            return Promise.resolve();

        } catch (error) {
            if (error.code === 'auth/invalid-credential') {

            } else if (error.code === 'auth/account-exists-with-different-credential') {

            }

            console.error(error);
            return Promise.reject(error);
        }

    };
 
    function GoogleSignIn() {
        return (
        <FAB
            icon='google'
            mode="flat"
            style={styles.fab}
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
            />
        );
      }


      async function onGoogleButtonPress() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
    
            // Create a Google credential with the token
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
            console.log("googleCredentials ", googleCredential);
    
            // Sign-in the user with the credential
            await firebase.auth().signInWithCredential(googleCredential);
    
            // User successfully signed in, you can navigate to the next screen or perform any necessary actions
            console.log('Signed in with Google!');
            AsyncStorage.setItem('is_login', '1');
            // Example: navigate to Home screen
            navigation.navigate('Home',{
                screen: 'My Account',
                params: { from: 'google' }
            });
        } catch (error) {
            // Handle sign-in errors
            console.error('Google sign-in error:', error);
            // Optionally, show an error message to the user
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container} >

            {load ?
                <>
                    <ImageBackground
                        style={styles.backgroundImg}
                        source={require('../assets/EcomImages/signInImage.webp')}>
                        <Text style={styles.titleText}>Login Page</Text>
                    </ImageBackground>

                    <View style={styles.loginContainer}>
                        <View style={styles.loginInput}>
                            <TextInput
                                mode='outlined'
                                label="Email" c
                                outlineColor="black"
                                value={email}
                                ref={emailRef}
                                style={styles.textInput}
                                onChangeText={email => setEmail(email)}
                                left={<TextInput.Icon icon="email" />}
                            />
                            <TextInput
                                mode='outlined'
                                label="Password"
                                outlineColor="black"
                                ref={passwordRef}
                                value={password} style={styles.textInput}
                                secureTextEntry={true}
                                onChangeText={password => setPassword(password)}
                                left={<TextInput.Icon icon="lock" />}
                            />
                            <View style={styles.forgotPasswordView}>
                                <Button
                                    mode='text'
                                    onPress={() => navigation.navigate('Forgot Password')}

                                ><Text style={styles.text}>Forgot password?</Text></Button>
                            </View>
                            <View style={styles.siginButtonView}>
                                <Button
                                    style={styles.signinButton}
                                    mode='contained-tonal' onPress={handleValidation}>
                                    Sign In
                                </Button>
                                <Divider style={styles.divider} />
                                <View style={styles.siginOptionView}>
                                    {/*  */}
                                    {/* <FAB
                                icon='facebook'
                                mode="flat"
                                size="medium"

                                style={styles.fab}
                                onPress={() => FacebookSignIn()}
                            /> */}
                                    <GoogleSignIn/>
                                    <FacebookSignIn />
                                    {/* <Button 
                                            mode="outlined"
                                            
                                                
                                    onPress={() => crashlytics().crash()} > Test Crash</Button> */}
                                </View>
                                <View style={styles.registerView}>
                                    <Text style={styles.text}>Don't have an account?</Text>
                                    <Button
                                        mode='text'
                                        onPress={() => navigation.navigate('Register')}
                                        style={styles.signUpButton}
                                    >Sign Up</Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </> : null}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    backgroundImg: {
      height: 250,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      color: "white",
      fontWeight: '700',
      fontFamily: getRegularFont1(),
      fontSize: 40,
      zIndex: 2,
    },
    text: {
      color: "black",
      fontWeight: 'bold',
      fontFamily: getRegularFont1(),
    },
    textInput: {
      backgroundColor: '#F5F5F5',
      margin: 2,
      fontFamily: getRegularFont1(),
    },
    loginContainer: {
      padding: 20, 
      backgroundColor: "#EBEDEF",
      borderTopLeftRadius: 10,
      fontFamily: getRegularFont1(),
    },
    loginInput: {
      justifyContent: 'center',
      padding: 10,
      fontFamily: getRegularFont1(),
    },
    forgotPasswordView: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 15,
      marginBottom: 10,
      fontFamily: getRegularFont1(),
    },
    siginButtonView: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderWidth: 0,
      height: 300,
      margin: 5,
      padding: 20,
      marginBottom: 10,
      fontFamily: getRegularFont1(),
    },
    siginOptionView: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 10,
      fontFamily: getRegularFont1(),
    },
    fab: {
      position: 'relative',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      borderRadius: 18,
      elevation: 6,
      fontFamily: getRegularFont1(),
    },
    divider: {
      marginVertical: 15,
      height: 1,
      fontFamily: getRegularFont1(),
    },
    registerView: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 20,
      fontFamily: getRegularFont1(),
    },
    signUpButton: {
      padding: 10,
      fontFamily: getRegularFont1(),
    },
    signinButton: {
      backgroundColor: 'orange',
      borderRadius: 6,
      opacity: 0.8,
      fontFamily: getRegularFont1(),
    },
  });

export default ELoginPage;

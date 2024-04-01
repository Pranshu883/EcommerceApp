import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import FacebookLogin from './FaceBookLogin';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const LoginPage = ({ navigation }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        getSession();
    }, [isFocused]);

    const getSession = async () => {
        const is_login = await AsyncStorage.getItem("is_login");
        if (is_login !== null && is_login !== "0") {
            navigation.navigate("Home");
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            });
        }
    };

    const [email, onChangeEmail] = useState('Email');
    const [password, onChangepPassword] = useState('');

    const submit = () => {
        alert("Submitted");
    };

    const handleEmailValidation = async () => {
        const emailRegex = /\S+@\S+\.\S+/;

        if (email) {
            await AsyncStorage.setItem("is_login", "1");
            navigation.navigate('Home', {
                name: 'Home',
                emailInput: email,
                passwordInput: password,
            });
        } else {
            alert('Error', 'Please enter a valid email address');
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '263761611453-09jdae27okvsc73fas96elfv8nastd3s.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const newUserInfo = await GoogleSignin.signIn();

            setLoggedIn(true);
            setUserInfo(newUserInfo);
            console.log('log In ', loggedIn);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('SignIn in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICE_NOT_AVAILABLE');
            } else {
                alert(error);
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setLoggedIn(false);
            setUserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    keyboardType='email-address'
                    placeholder='Email'
                    placeholderTextColor='grey'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangepPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder='Password'
                    placeholderTextColor='grey'
                />
                <Button
                    style={styles.button}
                    title="Login"
                    onPress={handleEmailValidation}
                />
                <View style={styles.googleSignInButton}>
                    <GoogleSigninButton
                        style={{ width: '100%', height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signIn}
                    />
                    <Button title='Press For FaceBook Login' 
                            onPress={()=>navigation.navigate('FaceBook')}></Button>
                </View>
                <Text style={styles.registerText}>
                    Don't have an account?
                    <Button
                        title="Register"
                        onPress={() => navigation.navigate('Register', { name: 'Register' })}
                    />
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
    },
    button: {
        height: 40,
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'lightblue',
    },
    googleSignInButton: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        marginTop: 20,
        color: 'black',
        textAlign: 'center',
    },
});

export default LoginPage;

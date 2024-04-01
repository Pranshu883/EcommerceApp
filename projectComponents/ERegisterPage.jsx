import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Divider, FAB, TextInput } from "react-native-paper";
import { CUSTOMERID, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, PHONE, is_login, saveSession } from "../common/LocalStorage";
import { REGISTER } from "../common/webutils";
import { APP_NAME } from "../common/string";
import { getRegularFont1 } from "../common/utils";



const ERegisterPage = ({ navigation }) => {
    const [text, onChangeText] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const textRef = useRef(null);
    const emailRef = useRef(null);
    const lastnameRef = useRef(null);
    const numberRef = useRef(null);
    const passwordRef = useRef(null);

    const registerAPI = async () => {


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "currency=INR; language=en-gb");

        var raw = JSON.stringify({
            "firstname": text,
            "lastname": lastName,
            "email": email,
            "telephone": number,
            "password": password,
            "confirm": password,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(REGISTER, requestOptions)
            .then(response => response.json())
            .then(json => {
                if (json.success == 1) {
                    saveSession(FIRST_NAME, json.data.first_name);
                    saveSession(LAST_NAME, json.data.last_name);
                    saveSession(EMAIL, json.data.email);
                    saveSession(PHONE, json.data.phone);
                    saveSession(CUSTOMERID, json.data.user_id);
                    saveSession('is_login', '1');
                    console.log("customer/userId",json.data.user_id );
                    navigation.navigate('Home');
                } else {
                    if (json.error.length > 0) {
                        Alert.alert(APP_NAME,json.error[0]);
                    }
                }
            })
            .catch(error => console.log('error', error));


        //   try {
        //     await AsyncStorage.setItem('userName', text);
        // } catch (error) {
        //     console.error('Error saving userName to AsyncStorage:', error);
        // }
    };

    useEffect(() => {
        validateForm();
    }, [text, lastName, email, number, password])

    const validateForm = () => {
        let errors = {};
        const emailRegex = /\S+@\S+\.\S+/;
    
        if (!text) {
            errors.name = 'Please enter your name.';
        }
    
        if (!lastName) {
            errors.lastName = 'Please enter your last name.';
        }
    
        if (!email) {
            errors.email = 'Please enter your email address.';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }
    
        if (!password) {
            errors.password = 'Please enter a password.';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';
        }
    
        if (!number) {
            errors.number = 'Please enter your phone number.';
        } else if (number.length !== 10 || !/^\d+$/.test(number)) {
            errors.number = 'Please enter a valid 10-digit phone number.';
        }
    
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }
    

    const handleValidation = async () => {



        if (isFormValid) {

            registerAPI();
            Alert.alert(APP_NAME,'Registered Successfully');

        }
        else {
            const errorMessage = Object.values(errors).join('\n');
            if (errors.name) {
                textRef.current.focus();
                Alert.alert(APP_NAME,errors.name)
            }
            else if (errors.lastName) {
                lastnameRef.current.focus();
                Alert.alert(APP_NAME,errors.lastName)
            }
            else if (errors.email) {
                emailRef.current.focus();
                Alert.alert(APP_NAME,errors.email)
            }
            else if (errors.number) {
                numberRef.current.focus();
                Alert.alert(APP_NAME,errors.number)
            }
            else if (errors.password) {
                passwordRef.current.focus();
                Alert.alert(APP_NAME,errors.password)
            }

        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <ImageBackground
                style={styles.backgroundImg}
                source={require('../assets/EcomImages/RegisterBG.jpeg')}>
                <Text style={styles.titleText}>Sign Up </Text>
            </ImageBackground>

            <View style={styles.loginContainer}>
                <View style={styles.loginInput}>
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        label="Name"
                        outlineColor="black"
                        onChangeText={onChangeText}
                        value={text}
                        ref={textRef}
                        left={<TextInput.Icon icon="pencil" />}
                    />
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        label="Last Name"
                        outlineColor="black"
                        onChangeText={setLastName}
                        value={lastName}
                        ref={lastnameRef}
                        left={<TextInput.Icon icon="check" />}
                    />
                    <TextInput
                        ref={emailRef}
                        mode='outlined'
                        label="Email"
                        outlineColor="black"
                        value={email} style={styles.textInput}

                        onChangeText={text => setEmail(text)}
                        left={<TextInput.Icon icon="email" />}
                    />
                    <TextInput
                        mode='outlined'
                        label="Number"
                        outlineColor="black"
                        value={number} style={styles.textInput}
                        maxLength={10}
                        ref={numberRef}
                        onChangeText={text => setNumber(text)}
                        keyboardType="number-pad"
                        left={<TextInput.Icon icon="phone" />}
                    />
                    <TextInput
                        mode='outlined'
                        label="Password"
                        outlineColor="black"
                        value={password} style={styles.textInput}
                        secureTextEntry={true}
                        ref={passwordRef}
                        onChangeText={text => setPassword(text)}
                        left={<TextInput.Icon icon="lock" />}
                    />


                    <View style={styles.siginButtonView}>
                        <Button
                            style={styles.signinButton}
                            mode='contained-tonal' onPress={handleValidation}>
                            Sign Up
                        </Button>
                        <Divider style={styles.divider} />
                        {/* <View style={styles.siginOptionView}>
                            <FAB
                                icon='google'
                                mode="flat"
                                style={styles.fab}
                                onPress={() => console.log('google Sign in')}
                            />
                            <FAB
                                icon='facebook'
                                mode="flat"
                                size="medium"

                                style={styles.fab}
                                onPress={() => console.log('facebook Sign in')}
                            />
                        </View> */}
                        <View style={styles.registerView}>
                            <Text style={styles.text}>Already have an account?</Text>
                            <Button
                                mode='text'
                                onPress={() => navigation.navigate('Login')}
                                style={styles.signUpButton}
                            >Sign In</Button>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
      },
      backgroundImg: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 40,
        opacity: 0.9,
        zIndex: 2,
        fontFamily: getRegularFont1(),
      },
      text: {
        color: "black",
        fontWeight: 'bold',
        fontFamily: getRegularFont1(),
      },
      textInput: {
        backgroundColor: '#F5F5F5',
        margin: 5,
      },
      loginContainer: {
        padding: 20, 
        backgroundColor: "#EBEDEF",
        borderTopLeftRadius: 10,
      },
      loginInput: {
        justifyContent: 'center',
        padding: 12,
      },
      forgotPasswordView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        marginBottom: 10,
      },
      siginButtonView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 0,
        height: 300,
        margin: 5,
        padding: 20,
        marginBottom: 10,
      },
      siginOptionView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
      },
      fab: {
        width: 60,
        height: 60,
        backgroundColor: '#F8F9F9',
      },
      divider: {
        marginVertical: 15,
        height: 1,
      },
      registerView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
      },
      signUpButton: {
        padding: 10,
      },
      signinButton: {
        backgroundColor: 'orange',
        borderRadius: 6,
        opacity: 0.8,
      },

});

export default ERegisterPage;

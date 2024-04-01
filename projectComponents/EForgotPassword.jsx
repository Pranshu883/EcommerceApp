import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TextInput, Button, FAB } from "react-native-paper";
import { FORGOT_PASSWORD } from "../common/webutils";
import { APP_NAME } from "../common/string";
import { getRegularFont1 } from "../common/utils";


const EForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const emailRef = useRef(null);


    const ForgotPasswordAPI = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=4b24fb269bc5048bd602ca3b17; currency=INR; language=en-gb");

        var raw = JSON.stringify({
            "email": email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(FORGOT_PASSWORD, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        validateForm();
    }, [email])

    const validateForm = () => {
        let errors = {};
        const emailRegex = /\S+@\S+\.\S+/;

        if (!email) {
            errors.email = 'Email field is empty';

        } else if (!emailRegex.test(email)) {
            errors.email = 'Email is invalid';
        }
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }
    const handleValidation = () => {
        if (isFormValid) {

            ForgotPasswordAPI();

        }
        else {
            const errorMessage = Object.values(errors).join('\n');
            if (errors.email) {
                emailRef.current.focus();
                Alert.alert(APP_NAME,errors.email)
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleTextView}>

                <Text style={styles.titleText}>
                    Forgot Password
                </Text>
            </View>
            <View style={styles.textContainer} >
                <Text style={styles.text}>
                    Enter email associated with Your acount and we will send an email with instructions
                    to reset your password
                </Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    mode='outlined'
                    label="Email"
                    outlineColor="black"
                    activeOutlineColor="#F0B27A"
                    ref={emailRef}
                    value={email}
                    style={styles.textInput}
                    onChangeText={email => setEmail(email)}
                    left={<TextInput.Icon icon="email" />}
                />
                <View>
                    <Button
                        style={styles.submitButton}

                        mode='contained-tonal' onPress={handleValidation}>
                        Submit
                    </Button></View>
                {/* <Button
                            style={styles.submitButton} 
                            mode='contained-tonal' onPress={() => navigation.navigate('Login')}>
                            Go back
                        </Button> */}
            </View>
        </View>
    );
}
export default EForgotPassword;

styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FAE5D3',
      },
      titleTextView: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
        borderBottomWidth: 1,
      },
      titleText: {
        color: 'black',
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: getRegularFont1(),
      },
      text: {
        color: 'black',
        textAlign: 'center',
        padding: 5,
        fontFamily: getRegularFont1(),
      },
      textContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: 10,
      },
      inputView: {
        flex: 0.2,
        justifyContent: 'space-between',
        padding: 10,
      },
      textInput: {
        backgroundColor: '#F5F5F5',
        margin: 10,
        fontFamily: getRegularFont1(),
      },
      submitButton: {
        backgroundColor: '#F0B27A',
        borderRadius: 3,
        margin: 10,
        fontFamily: getRegularFont1(),
      },
});
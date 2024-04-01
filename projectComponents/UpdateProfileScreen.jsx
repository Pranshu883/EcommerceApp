import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState , useEffect} from "react";
import { StyleSheet , View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, Button, FAB } from "react-native-paper";
import { CUSTOMERID, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, PHONE, getSession, saveSession } from "../common/LocalStorage";
import { UPDATE_USER } from "../common/webutils";
import { APP_NAME } from "../common/string";
import { getRegularFont1 } from "../common/utils";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const UpdateProfileScreen = ({navigation}) => {

    const [text, onChangeText] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [customerId, setCustomerId] = useState('');


    const textRef = useRef(null);
    const emailRef = useRef(null); 
    const lastnameRef = useRef(null);
    const numberRef = useRef(null);
    const passwordRef = useRef(null);



    useEffect(()=>{
        currentInfo();
    },[])

    const currentInfo=async()=>{
        const fetchedFirstName = await getSession(FIRST_NAME);
        const fetchedLastName = await getSession(LAST_NAME);
        const fetchedEmail = await getSession(EMAIL);
        const fetchedNumber = await getSession(PHONE);
        const fetchedPassword = await getSession(PASSWORD);
        const fetchedCustomerId = await getSession(CUSTOMERID);


        console.log(fetchedCustomerId);
        onChangeText(fetchedFirstName);
        setLastName(fetchedLastName);
        setEmail(fetchedEmail);
        setNumber(fetchedNumber);
        setPassword(fetchedPassword);
        setCustomerId(fetchedCustomerId);
    };

    


    const UpdateProfileAPI = async(raw) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/javascript");
        myHeaders.append("Cookie", "OCSESSID=4b24fb269bc5048bd602ca3b17; currency=INR; language=en-gb");

        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(UPDATE_USER, requestOptions)
            .then(response => response.json())
            .then((json)=>{
                console.log(json);
                if(json.success == 1){
                    Alert.alert(APP_NAME,'Profile Updated Successfully');
                    saveSession(FIRST_NAME, text);
                    navigation.navigate('Home');
                }
            })
            .catch(error => console.log('error', error));
    };


    useEffect(()=>{
        validateForm();
    },[text, lastName, email, number, password])

    const validateForm =()=>{
        let errors = {};
        const emailRegex = /\S+@\S+\.\S+/;
        if(!text){
            errors.name = 'Name is required';
           
        }
        if(!lastName){
            errors.lastName = 'Last Name is required';
            
        }
        if(!email){
            errors.email = 'Email field is empty';
            
        }else if(!emailRegex.test(email)){
            errors.email = 'Email is invalid';
        }
        // if(!password){
        //     errors.password = 'Enter a Password';
           
        // }else if(password.length < 8){
        //     errors.password = 'Password must be atleast 8 characters long';
            
        // }
        if(!number){
            errors.number = 'number field is empty';
            
        }else if(number.length != 10){
            errors.number='number is invalid';
            
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }

    const handleReset = ()=>{
        if(!password){
            Alert.alert(APP_NAME,'Enter a Password');
           
        }else if(password.length < 8){
            Alert.alert(APP_NAME,'Password must be atleast 8 characters long');
        }else{
            var raw1 = JSON.stringify({
                "password": password, 
                "confirm": "123456", 
                "customer_id": "26"
              });

              UpdateProfileAPI(raw1);
        }
    }
    const handleValidation =async () => {
        if( isFormValid){ 
          var raw = JSON.stringify({
            "email": email,
            "firstname": text,
            "lastname": lastName, 
            "telephone": number, 
            "confirm": "123456", 
            "customer_id":  customerId,
          });
            UpdateProfileAPI(raw);
           
        }
        else {
            const errorMessage = Object.values(errors).join('\n');
            if (errors.name) {textRef.current.focus();
                Alert.alert(APP_NAME,errors.name)}
            else if(errors.lastName){lastnameRef.current.focus();
                Alert.alert(APP_NAME,errors.lastName)}
            else if(errors.email){emailRef.current.focus();
                Alert.alert(APP_NAME,errors.email)}
            else if(errors.number){numberRef.current.focus();
                Alert.alert(APP_NAME,errors.number)}
            // if(errors.password){passwordRef.current.focus();
            //     Alert.alert(APP_NAME,errors.password)} 
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Update Profile</Text>
                <View style={{ width: 24 }}></View> 
            </View>
            <View style={styles.inputView}>
            <   TextInput
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
                
                <TextInput
                    mode='outlined'
                    label="First Name"
                    outlineColor="black"
                    activeOutlineColor="#F0B27A"
                    ref={textRef}
                    value={text}
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    left={<TextInput.Icon icon="pencil" />}
                />
                <TextInput
                    mode='outlined'
                    label="Last Name"
                    outlineColor="black"
                    activeOutlineColor="#F0B27A"
                    ref={lastnameRef}
                    value={lastName}
                    style={styles.textInput}
                    onChangeText={setLastName}
                    left={<TextInput.Icon icon="pencil" />}
                />
                <TextInput
                    mode='outlined'
                    label="Number"
                    outlineColor="black"
                    activeOutlineColor="#F0B27A"
                    ref={numberRef}
                    value={number}
                    maxLength={10}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    onChangeText={setNumber}
                    left={<TextInput.Icon icon="phone" />}
                />
                <View>
                    <Button
                        style={styles.submitButton}

                        mode='contained-tonal' onPress={handleValidation}>
                        Submit
                    </Button>
                </View>
                <View style={styles.resetView}>
                    <Text style={styles.titleText}> Reset Password</Text>
                    <TextInput
                        mode='outlined'
                        label="Enter New Password"
                        outlineColor="black"
                        activeOutlineColor="#F0B27A"
                        ref={passwordRef}
                        value={password}
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        left={<TextInput.Icon icon="lock" />}
                    />
                    <Button
                        style={styles.submitButton}
                        mode='contained-tonal' onPress={handleReset}>
                        Reset
                    </Button>
                </View>

            </View>
        </ScrollView>
    );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#EBEDEF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#2E4053',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '500',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    titleTextView: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
    },
    titleText: {
        color: '#555',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: getRegularFont1(),
    },
    text: {
        color: 'black',
        textAlign: 'center',
        padding: 5,
    },
    inputView: {
        flex: 0.2,
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
    },
    textInput: {
        backgroundColor: '#F5F5F5',
        margin: 10,
    },
    submitButton: {
        backgroundColor: '#F0B27A',
        borderRadius: 3,
        margin: 10,
    },
    resetView: {
        padding: 10,
        marginVertical: 10,
    },
});


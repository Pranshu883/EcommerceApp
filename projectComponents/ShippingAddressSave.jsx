import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COUNTRIES, SHIPPING_ADDRESS_SAVE } from "../common/webutils";
import { ADDRESSID, CUSTOMERID, EMAIL, FIRST_NAME, LAST_NAME, PHONE, POSTCODE, getSession, saveSession } from "../common/LocalStorage";
import { APP_NAME } from "../common/string";
import { getRegularFont1 } from "../common/utils";

const ShippingAddressSave = ({ navigation, route }) => {
    const [text, onChangeText] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [countries, setCountries] = useState([]);
    const [country_id, setCountry_id] = useState('99');
    const [customerId, setCustomerId] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const textRef = useRef(null);
    const emailRef = useRef(null);
    const lastnameRef = useRef(null);
    const numberRef = useRef(null);
    const passwordRef = useRef(null);
    const address1Ref = useRef(null);
    const cityRef = useRef(null);
    const postCodeRef = useRef(null);
 
    useEffect(() => {
        currentInfo();
        // getCountriesAPI();
    }, [])
    console.log("CUSTOMER ID =>", customerId)
    const currentInfo = async () => {
        const fetchedFirstName = await getSession(FIRST_NAME);
        const fetchedLastName = await getSession(LAST_NAME);
        const fetchedEmail = await getSession(EMAIL);
        const fetchedNumber = await getSession(PHONE);
        const fetchedCustomerId = await getSession(CUSTOMERID);



       
        onChangeText(fetchedFirstName);
        setLastName(fetchedLastName);
        setEmail(fetchedEmail);
        setNumber(fetchedNumber);
        setCustomerId(fetchedCustomerId);
    };

    // const getCountriesAPI = () => {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Cookie", "OCSESSID=cc46036e90ff3e07a996a2a3cc; currency=INR; language=en-gb");

    //     const requestOptions = {
    //         method: "GET",
    //         headers: myHeaders,
    //         redirect: "follow"
    //     };

    //     fetch(COUNTRIES, requestOptions)
    //         .then((response) => response.json())
    //         .then((json) => { setCountries(json.data) })
    //         .catch((error) => console.error(error));
    // }

    const ShippingAddressAPI = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "OCSESSID=cc46036e90ff3e07a996a2a3cc; currency=INR; language=en-gb");

        const raw = JSON.stringify({
            "zone_id": "1485",
            "country_id": country_id,
            "address_1": address1,
            "address_2": address2,
            "company": "Alakmalak",
            "postcode": postCode,
            "city": city,
            "firstname": text,
            "lastname": lastName,
            "email": email,
            "telephone": number,
            "customer_id": customerId,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(SHIPPING_ADDRESS_SAVE, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.success == 1) {
                    Alert.alert(APP_NAME, 'Address Saved successfully');

                    saveSession(POSTCODE, json.data.postCode);
                    saveSession(ADDRESSID, json.data.address_id);
                    if (route.params.from == 'profile') {
                        navigation.goBack()
                    } else {
                        navigation.navigate('PaymentMethod', {
                            postCode: json.data.postCode,
                            addressId: json.data.address_id,
                            customerId: customerId,
                        });
                    }
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        validateForm();
    }, [text, lastName, email, number, postCode, address1, city])

    const validateForm = () => {
        let errors = {};
        const emailRegex = /\S+@\S+\.\S+/;
        if (!text) {
            errors.name = 'Name is required';
        }
        if (!lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!email) {
            errors.email = 'Email field is empty';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!number) {
            errors.number = 'number field is empty';
        } else if (number.length != 10) {
            errors.number = 'number is invalid';
        }

        if (!address1) {
            errors.address1 = 'Address field is empty';
        }
        if (!postCode) {
            errors.postCode = 'Enter Post Code';
        } else if (postCode.length < 6) {
            errors.postCode = 'Post Code should be 6 digit long';
        }
        if (!city) {
            errors.city = 'Enter your City name';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }

    const handleValidation = async () => {
        if (isFormValid) {
            ShippingAddressAPI();
        } else {
            const errorMessage = Object.values(errors).join('\n');
            if (errors.name) {
                textRef.current.focus();
                Alert.alert(APP_NAME, errors.name)
            }
            else if (errors.lastName) {
                lastnameRef.current.focus();
                Alert.alert(APP_NAME, errors.lastName)
            }
            else if (errors.email) {
                emailRef.current.focus();
                Alert.alert(APP_NAME, errors.email)
            }
            else if (errors.number) {
                numberRef.current.focus();
                Alert.alert(APP_NAME, errors.number)
            }
            else if (errors.address1) {
                address1Ref.current.focus();
                Alert.alert(APP_NAME, errors.address1)
            }
            else if (errors.city) {
                cityRef.current.focus();
                Alert.alert(APP_NAME, errors.city)
            }
            else if (errors.postCode) {
                postCodeRef.current.focus();
                Alert.alert(APP_NAME, errors.postCode)
            }
        }
    }

    const CountryDropDown = () => {
        const [open, setOpen] = useState(false);
        const [items, setItems] = useState([]);
    
        useEffect(() => {
            const getCountriesAPI = () => {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", "OCSESSID=cc46036e90ff3e07a996a2a3cc; currency=INR; language=en-gb");
    
                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };
    
                fetch(COUNTRIES, requestOptions)
                    .then((response) => response.json())
                    .then((json) => { 
                        const mappedCountries = json.data.map((data) => ({
                            label: data.name,
                            value: data.country_id
                        }));
                        setItems(mappedCountries);
                    })
                    .catch((error) => console.error(error));
            }
    
            getCountriesAPI();
        }, []);
    
        return (
            <DropDownPicker
                style={styles.countryInput}
                placeholder="Country"
                open={open}
                value={country_id}
                items={items}
                setOpen={setOpen}
                setValue={setCountry_id}
                setItems={setItems}
                searchable={true}
                searchablePlaceholder="Search for a country"
                searchableError="Country not found"
            />
        );
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.headerWrapper}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-left" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}> Shipping Address </Text>
                    </View>
                </View>
                <View style={styles.inputView}>

                    <View style={styles.topView}>
                        <View style={styles.topSubView}>
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
                        </View >

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
                        <TextInput
                            mode='outlined'
                            label="Number"
                            outlineColor="black"
                            activeOutlineColor="#F0B27A"
                            maxLength={10}
                            ref={numberRef}
                            value={number}
                            style={styles.textInput}
                            keyboardType="number-pad"
                            onChangeText={setNumber}
                            left={<TextInput.Icon icon="phone" />}
                        />

                    </View>

                    <View style={styles.bottomView}>
                        <CountryDropDown />
                        <TextInput
                            mode='outlined'
                            label="Address 1"
                            outlineColor="black"
                            activeOutlineColor="#F0B27A"
                            editable={true}
                            multiline={true}
                            ref={address1Ref}
                            value={address1}
                            style={styles.textInput}
                            onChangeText={setAddress1}

                        />

                        <TextInput
                            mode='outlined'
                            label="Address 2 (optional)"
                            outlineColor="black"
                            activeOutlineColor="#F0B27A"
                            editable={true}
                            multiline={true}

                            value={address2}
                            style={styles.textInput}
                            onChangeText={setAddress2}

                        />

                        <View style={styles.bottomSubView}>
                            <TextInput
                                mode='outlined'
                                label="Post Code"
                                outlineColor="black"
                                activeOutlineColor="#F0B27A"
                                maxLength={6}
                                ref={postCodeRef}
                                value={postCode}
                                style={[styles.textInput, { width: '35%' }]}
                                keyboardType="number-pad"
                                onChangeText={setPostCode}

                            />
                            <TextInput
                                mode='outlined'
                                label="City"
                                outlineColor="black"
                                activeOutlineColor="#F0B27A"
                                ref={cityRef}
                                value={city}
                                style={[styles.textInput, { width: '50%' }]}
                                onChangeText={setCity}

                            />
                        </View>
                    </View>
                    <View>
                        <Button
                            style={styles.submitButton}
                            title="Save & Next"
                            mode='contained-tonal' onPress={handleValidation}>
                            Save & Next
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ShippingAddressSave;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEDEF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2E4053',
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 12,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: getRegularFont1(),
    },
    text: {
        color: 'black',
        textAlign: 'center',
        padding: 5,
        fontFamily: getRegularFont1(),
    },
    inputView: {
        flex: 0.2,
        justifyContent: 'space-between',
        padding: 15,
    },
    textInput: {
        backgroundColor: '#F5F5F5',
        margin: 5,
        marginTop: 10,
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
    topView: {
        justifyContent: 'space-evenly',
        padding: 4,
    },
    topSubView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    countryInput: {
        backgroundColor: '#F5F5F5',
        width: '45%',
        margin: 5,
        marginTop: 10,
    },
    bottomView: {
        padding: 5,
    },
    bottomSubView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

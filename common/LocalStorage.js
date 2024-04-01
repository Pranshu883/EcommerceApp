// https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CustomConsole } from './utils';

export const saveSession = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log("Key=>" + key + ":" + "Value=>" + value);
    } catch (e) {
        // saving error
    }
}

export const clearAsyncStorage = async () => {
    AsyncStorage.clear();
}

export const getSession = async (key) => {
    var value = "";
    try {
        value = await AsyncStorage.getItem(key)
        console.log("Key=>" + key + ":" + "Value=>" + value);
    } catch (e) {
        // error reading value
        // CustomConsole("Error=>" + e);
    }
    return value;
}

// User Data
export const USER_ID = "user_id";
export const FIRST_NAME = "first_name";
export const LAST_NAME = "last_name";
export const PHONE = "phone";
export const EMAIL = "email";
export const OTP_VERIFY = "otp_verify";
export const PASSWORD = "password";
export const ONBOARDED = "false";
export const PROMOCODE =  "";
export const POSTCODE = "";
export const ADDRESSID = "";
export const CUSTOMERID = "34";       
export const PFP = "";

import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, useWindowDimensions, Alert, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Modal, Text, View, Image, Pressable, } from 'react-native';
import { colors } from './color.js';
import { externalStyles } from './styles.js';
import { TOKEN, USER_ID, getSession, saveSession } from './LocalStorage.js';
import { USER_REFRESH_TOKEN } from './webUtils.js';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';







// wallet Button 

export const WalletButton = () => {
    const [amount, setAmount] = useState();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXRhaWxzIjp7InVzZXJfaWQiOiIyIiwicm9sZSI6IjIifSwibm9uY2UiOiJjZjM0YmZiNS1iYTUxLTQ3N2EtYTJiZS1lMTEwYTllZmFkNTYiLCJpYXQiOjE3MTA5OTY0NDcsImV4cCI6MTcxMTAyNTI0N30.JfmXaEe177hFdQ8xsoKim2h8Ijy5MCWuFRrA_kSdfdk");

    const raw = "";

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://142.132.250.155:8000/walletTransactions", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            if (json) {
                setAmount(json.total_amount);
            }
        })
        .catch((error) => console.error(error));

    return (
        <TouchableOpacity style={styles.walletContainer} onPress={() => { }} >
            <Text style={styles.walletAmount} >₹{amount}</Text>
            <Image source={require("../assets/DesignImages/wallet.png")} style={{ width: 20, height: 17 }} />
        </TouchableOpacity>
    )

};

// Filter Button

export const FilterButton = () => {
    return (
        <TouchableOpacity style={styles.filterButton}  >

            <Image source={require("../assets/DesignImages/Filter.png")} style={{ height: 17, width: 17 }} />
        </TouchableOpacity>
    )
}


//Header for AtroTalk

export const Header = ({ title, searchValue, setSearchValue }) => {


    return (
        <View style={styles.header}>
            <ImageBackground style={styles.headerBackground} source={require('../assets/DesignImages/HeaderImage.png')} resizeMode="center" >
                <View style={styles.headerWrapper}>
                    <View style={styles.headerTop}>
                        <View style={styles.drawerContainer}>
                            <Icon name="sort-variant" size={38} color="white" style={{}} />
                            <Text style={styles.drawerText}>{title}</Text>
                        </View>
                        <View style={styles.filterContainer} >
                            <WalletButton />
                            <FilterButton />
                        </View>
                    </View>


                    <LinearGradient
                        colors={['#EDDEC6', 'white']}
                        style={styles.headerBottom}
                    >
                        <Pressable onPress={() => { }} >
                            <Icon name="magnify" size={26} color="brown" />
                        </Pressable>

                        <TextInput
                            value={searchValue}
                            onChange={setSearchValue}
                            placeholder="Search Astrologer, Astro pooja"
                            placeholderTextColor="black"

                        />
                    </LinearGradient>
                </View>
            </ImageBackground>
        </View>
    )
}


// gradient Button

export const GradientButton = ({ label, height, width, labelStyle, onPress, mode, borderRadius }) => {
    const [innerHeight, setInnerHeight] = useState();
    const [innerWidth, setInnerWidth] = useState();

    useEffect(() => {
        // Initialize innerHeight and innerWidth once when the component mounts
        if (!isNaN(height)) {
            setInnerHeight(height - 2.75);
        } else {
            setInnerHeight("98%");
        }
        if (!isNaN(width)) {
            setInnerWidth(width - 2.75);
        } else {
            setInnerWidth("98%");
        }
    }, [mode]); // Empty dependency array ensures this effect runs only once when component mounts


    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#9900A8', '#DE8602']}
            style={[styles.gradientButton, height && { height: height }, width && { width: width }, borderRadius && { borderRadius: borderRadius }]}
        >
            <Pressable onPress={onPress} style={[
                styles.gradientButtonInner,
                height && { height: innerHeight },
                width && { width: innerWidth },
                borderRadius && { borderRadius: borderRadius - 1 },
                mode === "outline" && { backgroundColor: "white" }
            ]}>
                <Text style={[styles.buttonText, labelStyle && (labelStyle)]}>{label}</Text>
            </Pressable>
        </LinearGradient>
    );
};



// custom loading view
export const progressView = (isProgressVisible) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isProgressVisible}>
            <View style={externalStyles.loadingMainView}>
                <View style={externalStyles.loadingSubView}>
                    <Text style={externalStyles.loadingText}>Loading</Text>
                    <ActivityIndicator size="large" color={colors.themeColor} />
                </View>
            </View>
        </Modal>
    );
}

// refresh token api
export const refreshTokenApiCall = async () => {

    try {
        const user_id = await getSession(USER_ID);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user_id": user_id,
            "role": "2"
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        CustomConsole(USER_REFRESH_TOKEN + "\n" + raw);

        const response = await fetch(USER_REFRESH_TOKEN, requestOptions);
        const json = await response.json();

        CustomConsole(json);

        if (json.status == 1) {
            saveSession(TOKEN, json.token);
        }

        // Return the status value
        return json.status;
    } catch (error) {
        CustomConsole("Refresh token exception: " + error);
        // Propagate the error to the caller
        throw error;
    }
};


export const ProfilePic = ({ isNew , source, height, width}) => {
    return (
        <View style={{ flex: 0.3, alignItems: "center" }}>
            <Image source={{ uri: source }}
                style={{ height:height ? height : 80, width: width? width : 80, borderRadius: 50, borderWidth: 2, borderColor: "#DE8602" }} />

            {
                isNew && (
                    <View style={{ height: 13, width: 33, borderWidth: 1, borderColor: "white", borderRadius: 30, backgroundColor: "#DE8602", alignItems: "center", justifyContent: "center", top: -10, }} >
                        <Text style={{ fontSize: 9, fontWeight: "600", color: "white" }} >NEW</Text>
                    </View>
                )
            }

        </View>
    )
}

// custom console
export const CustomConsole = (visible) => {
    console.log(visible);
}

// common alert box
export function alertDialogDisplay(title, msg) {
    Alert.alert(title, msg, [
        { text: 'OK' },
    ]);
}

// .00 digits
export const CustomDigits = (text) => {
    return parseFloat(text).toFixed(2);
}

//validate email method
export const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
        return false;
    }
    else {
        return true;
    }
}

// format date dd-mm-yyyy
export const formatDate = (date) => {
    const datefor = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + date.getMonth() + 1
    const year = date.getFullYear()

    return datefor + "-" + month + "-" + year;
}

// get only date
export const getOnlyDateNo = (date) => {
    const datefor = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    return datefor;
}

// get only year
export const dateYear = (date) => {
    const dateyear = date.getFullYear();
    return dateyear;
}

// regular fonts
export const getRegularFont = () => {
    if (Platform.OS === 'ios') {
        return "PlusJakartaSans-Regular"
    } else {
        return "plusjakartasans_regular"
    }
}
export const getRegularFont1 = () => {
    if (Platform.OS === 'ios') {
        return "Poppins_Regular"
    } else {
        return "poppins_regular"
    }
}

// bold fonts
export const getBoldFont = () => {
    if (Platform.OS === 'ios') {
        return "PlusJakartaSans-Bold"
    } else {
        return "plusjakartasans_bold"
    }
}

// semi bold fonts
export const getSemiBoldFont = () => {
    if (Platform.OS === 'ios') {
        return "PlusJakartaSans-Bold"
    } else {
        return "plusjakartasans_bold"
    }
}


export const InputField = ({ fieldName, value, setValue, secure }) => {
    return (
        <View style={styles.inputFieldContainer} >
            <Text style={styles.inputText} >{fieldName}</Text>
            <TextInput
                style={styles.inputField}
                placeholder={`Enter ${fieldName}`}
                placeholderTextColor="black"
                value={value}
                onChange={setValue}
                secureTextEntry={secure}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    inputFieldContainer: {
        marginTop: 16,
        marginHorizontal: 19,
    },
    inputText: {
        fontSize: 15,
        color: "white",
        fontWeight: "500",
        fontFamily: "Plus Jakarta Sans",
        lineHeight: 19,
    },
    inputField: {
        height: 44,
        width: "100%",
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        marginVertical: 6,
        paddingHorizontal: 16,
        color: "black",
    },
    walletContainer: {
        height: 34,
        width: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly",
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 5,
    },
    walletAmount: {
        color: 'white',
        fontSize: 14,
        fontWeight: "500",

    },
    filterButton: {
        height: 34,
        width: 34,
        justifyContent: 'center',
        padding: 8,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 2,
    },
    header: {
        height: 188,
        width: '100%',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginHorizontal: 1,
        overflow: 'hidden',
    },
    headerBackground: {
        height: "100%",
        width: "100%",

    },
    headerWrapper: {
        margin: 10,
        borderColor: "white",
        marginTop: 18,
        padding: 10,
        justifyContent: "space-evenly",
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    drawerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        justifyContent: 'flex-start',
    },
    drawerText: {
        color: "white",
        fontSize: 14,
        fontWeight: "700",
        paddingHorizontal: 2,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 5
    },
    headerBottom: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        marginHorizontal: 3,
    },
    gradientButton: {
        height: 40,
        width: "100%",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",

    },
    buttonText: {
        color: "white",
        fontSize: 13,
        fontWeight: "400",
        fontFamily: 'Plus Jakarta Sans',
    },
    gradientButtonInner: {
        height: "100%", width: "100%", justifyContent: "center", alignItems: "center",
        borderRadius: 4,
    }
})

// get month name
// export const getMonthName = (date) => {
//     // date.toLocaleString('en-US', { month: 'short' }); // {month:'long'}

//     const month = moment(date).format("MMM");
//     CustomConsole("Month===> ", month);
//     return month;
// }

// get date format
// export const getFormatDate = (date) => {

//     const month = moment(date).format("DD MMM, YYYY HH:mm a");
//     CustomConsole("Month===> ", month);
//     return month;
// }

// export const formatDateYMD = (date) => {
//     const datefor = date.getDate()
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()

//     return year + "-" + month + "-" + datefor;
// }



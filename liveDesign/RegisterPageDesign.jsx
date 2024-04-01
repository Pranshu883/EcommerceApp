import React, { useState } from "react";
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { InputField } from "../common/utils";


const RegisterPageDesign = ({navigation}) => {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={require("../assets/DesignImages/RegisterBG.png")} style={styles.background} >
                <TouchableOpacity style={styles.gobackButton} onPress={()=>{``}} >
                    <Image source={require("../assets/DesignImages/left_chevron.png")} resizeMode="contain" style={{ height: 13, width: 13, }} />
                </TouchableOpacity>
                <View style={styles.profileWrapper} >
                    <Image source={require("../assets/DesignImages/default1.png")} style={{ height: 24, width: 24 }} resizeMode="contain" />
                    <Image source={require("../assets/DesignImages/default2.png")} style={{ height: 21, width: 41 }} resizeMode="contain" />
                </View>
                <Text style={styles.signUpText} >Sign Up</Text>

                {/* <View style={styles.inputFieldContainer} >
                    <Text style={styles.inputText} >Name</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Name"
                        placeholderTextColor="black"
                        value={name}
                        onChange={setName}
                    />
                </View> */}
                <InputField fieldName="Name" value={name} setValue={setName} secure={false} />
                <InputField fieldName="Phone Number" value={phoneNumber} setValue={setPhoneNumber} secure={false} />
                <InputField fieldName="Email Id" value={emailId} setValue={setEmailId} secure={false} />
                <InputField fieldName="Password" value={password} setValue={setPassword} secure={true} />
                <InputField fieldName="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secure={true} />

                {/* <View style={styles.inputFieldContainer} >
                    <Text style={styles.inputText} >Phone number</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Phone Number"
                        placeholderTextColor="black"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                    />
                </View>
                <View style={styles.inputFieldContainer} >
                    <Text style={styles.inputText} >Email ID</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter Email ID"
                        placeholderTextColor="black"
                        value={emailId}
                        onChange={setEmailId}
                    />
                </View>
                <View style={styles.inputFieldContainer} >
                    <Text style={styles.inputText} >Password</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter password"
                        placeholderTextColor="black"
                        value={password}
                        onChange={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputFieldContainer} >
                    <Text style={styles.inputText} >Confirm Password</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter password"
                        placeholderTextColor="black"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        secureTextEntry={true}
                    />
                </View> */}

                <Pressable onPress={() => { }} style={styles.RegisterButtonWrapper} >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#9900A8', '#DE8602']}
                        style={styles.RegisterButton}
                    >
                        <Text style={styles.RegisterText} >Register</Text>
                    </LinearGradient>
                </Pressable>


            </ImageBackground>
        </ScrollView>
    )
}

export default RegisterPageDesign;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        height: "100%",
        width: "100%",
    },
    gobackButton: {
        height: 34,
        width: 34,
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 42,
        marginLeft: 19,
    },
    profileWrapper: {
        height: 97,
        width: 97,
        borderRadius: 50,
        backgroundColor: "white",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    signUpText: {
        fontSize: 22,
        color: "white",
        fontWeight: "700",
        fontFamily: "Plus Jakarta Sans",
        textAlign: 'center',
        margin: 2,
    },
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
    RegisterButtonWrapper: {
        marginVertical: 35,
        marginHorizontal: 19,
    },
    RegisterButton: {
        height: 44,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 5,
    },
    RegisterText: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
        fontFamily: "Plus Jakarta Sans"
    },

})
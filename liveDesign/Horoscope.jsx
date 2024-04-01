import React, { useState } from "react";
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { InputField } from "../common/utils";


const Horoscope = ({ navigation }) => {



    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <ImageBackground source={require("../assets/DesignImages/RegisterBG.png")} style={styles.background} resizeMode="cover" >
                <ImageBackground source={require("../assets/DesignImages/horoscope2.png")} style={styles.foreground} resizeMode="contain" >
                    <View style={styles.top} >
                        <View style={styles.titleWrapper} >
                            <Image source={require("../assets/DesignImages/Drawer.png")} style={{ height: 19, width: 32 }} resizeMode="contain" />
                            <Text style={styles.title} >Find your {'\n'}Horoscope </Text>
                        </View>
                        <View style={styles.profileWrapper} >
                            <Image source={require("../assets/DesignImages/image22.png")} style={styles.profileImage} />
                        </View>
                    </View>

                    <Text style={styles.horoscope} >Horoscope</Text>
                    <Text style={styles.description} >Millionaires skip horoscopes; however, billionaires find value in consulting them for guidance and insight into future endeavors.</Text>

                

                    <Pressable onPress={() => { }} style={styles.RegisterButtonWrapper} >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#9900A8', '#DE8602']}
                            style={styles.RegisterButton}
                        >
                            <Text style={styles.RegisterText} >Get Started Now</Text>
                        </LinearGradient>
                    </Pressable></ImageBackground>
            </ImageBackground>
        </ScrollView>
    )
}

export default Horoscope;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        height: "100%",
        width: "100%",
      
    },
    foreground: {
        height: "96%",
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
    top: {
        height: 39,
        width: 323,
        borderColor: "black",
        marginTop: 43,
        marginHorizontal: 19,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

    },
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 13,
        color: "white",
        fontFamily: "Plus Jakarta Sans",
        fontWeight: "700",
        marginHorizontal: 9,
    },

    profileWrapper: {
        height: 39,
        width: 39,
    },
    profileImage: {
        height: "100%",
        width: "100%",
        resizeMode: "contain",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#DE8602",
    },
    horoscope: {
        fontSize: 34,
        color: "white",
        fontWeight: '700',
        textAlign: "center",
        fontFamily: "Plus Jakarta Sans",
        marginTop: 484,
        lineHeight: 41,
    },
    description: {
        fontSize: 15,
        color: "white",
        fontWeight: "400",
        fontFamily: "Plus Jakarta Sans",
        lineHeight: 24,
        textAlign: "center",
        alignSelf: "center",
        maxWidth: "70%",
        width: 269,
        marginTop: 24,
        paddingBottom: 15,
    },
    RegisterButtonWrapper: {
        marginVertical: 35,
        marginHorizontal: 19,
        zIndex: 3,
    },
    RegisterButton: {
        height: 44,
        width: 294,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        alignSelf: "center",
    },
    RegisterText: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
        fontFamily: "Plus Jakarta Sans"
    },

})
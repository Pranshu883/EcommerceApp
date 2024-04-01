import React from "react";
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";


const ChatPage = ()=>{
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerTilteView}>
                <Image source={require('../assets/Images/AstroTalkLogo.png')} style={styles.applogo} />
                <View style={styles.titleWrapper}>
                    <Text style={styles.headerTitle}>AstroTalk </Text>
                    <Text style={styles.OnlineStatus}>Online </Text>
                </View>
            </View>   
        </View>
        <ScrollView style={styles.body} >
            <ImageBackground source={require('../assets/Images/whatsppbg.jpeg')} resizeMode="cover" style={styles.background} >

                <View style={styles.textContainer}>
                    
                    <Image source={require('../assets/Images/pfp.jpeg')} style={styles.pfp} />
                    <View style={styles.textWrapper}>
                        
                        <Text style={styles.text} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt possimus, nam sequi culpa dolor nesciunt necessitatibus, explicabo tenetur hic laboriosam ab error delectus veniam tempora officia quasi dolorum optio dolore!  </Text>
                    </View>
                </View>
                <View style={[styles.textContainer, {flexDirection: 'row'}]}>
                    
                    
                    <View style={[styles.textWrapper,{alignSelf:"flex-end", flexDirection: 'row'}]}>
                        <Image source={require('../assets/Images/Placeholder.jpeg')} style={[styles.pfp, {position: 'relative'}]} />
                        <Text style={styles.text} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt possimus, nam sequi culpa dolor nesciunt necessitatibus, explicabo tenetur hic laboriosam ab error delectus veniam tempora officia quasi dolorum optio dolore!  </Text>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    </SafeAreaView>
    )
};

export default ChatPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: '#E7D329',
        paddingHorizontal: 5,
        padding: 2,
    },
    headerTilteView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 3,
        marginHorizontal: 3,
    },
    headerTitle: {
        color: "black",
        fontSize: 22,
        fontWeight: '500',
    },
    body: {

    },
    background:{
        flex: 1,
        justifyContent: 'center',
        height: "100%"

    },
    titleWrapper:{
      marginHorizontal: 10,
     
    },
    applogo:{
        height: 65,
        width: 65,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    OnlineStatus:{
        color: "#555",
        fontSize: 16,
    },
    textContainer:{  
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10,
        margin: 10,
    },
    textWrapper:{
        backgroundColor:"white",
        maxWidth: "85%",
        paddingHorizontal: 10,
        borderRadius: 30,
        position: "relative",
        padding: 5,
        overflow: 'visible',
        backgroundColor: '#FEF9E7',
        margin: 6,
    },
    pfp:{
        height: 70,
        width: 70,
        marginHorizontal: 4,
        resizeMode: 'cover',
        borderRadius: 50,
        position: "absolute",
        zIndex: 4,
        top: -2,
        alignSelf:'flex-start',
    },
    text:{
        padding: 10,
        color: "black",
        fontSize: 16,
        fontWeight: '500',
        maxWidth: "80%",
    },
});
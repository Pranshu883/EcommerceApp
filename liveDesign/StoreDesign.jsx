import React, { useState } from "react";
import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';




const StoreDesign = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState('');

    //dummy data for flat list
    const data = [
        {id:"1", process: "Online Pooja", image:require("../assets/DesignImages/image1.png") },
        {id:"2", process: "Kundli Matching", image:require("../assets/DesignImages/image2.png") },
        {id:"3", process: "Vedic Predictions", image:require("../assets/DesignImages/image3.png") },
        {id:"4", process: "Candle Healing", image:require("../assets/DesignImages/image4.png") },
    ];

    const renderList=({item})=>{
        return(
            <View style={styles.card}>
                <View style={styles.imgWrapper}>
                    <Image source={item.image} style={styles.img} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText} >{item.process} </Text>


                    <LinearGradient 
                        colors={['#9900A8','#DE8602']}
                        style={styles.gradient} >

                        <TouchableOpacity style={styles.listButton} onPress={()=>navigation.navigate('ServiceDetailScreen')} >
                            <Icon name="arrow-top-right" size={24} color="#9900A8" />
                        </TouchableOpacity>    

                    </LinearGradient>
                </View>
            </View>
        )
    };




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <ImageBackground style={styles.headerBackground} source={require('../assets/DesignImages/HeaderImage.png')} resizeMode="center" >
                    <View style={styles.headerWrapper}>
                        <View style={styles.headerTop}>
                            <View style={styles.drawerContainer}>
                                <Icon name="sort-variant" size={38} color="white" style={{}} />
                                <Text style={styles.drawerText}>Our Products{'\n'} & Service Store</Text>
                            </View>
                            <View style={styles.filterContainer} >
                                <TouchableOpacity style={styles.walletContainer} onPress={() => { }} >
                                    <Text style={styles.walletAmount} >₹300</Text>
                                    <Icon name="wallet-outline" size={20} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filterButton}  >

                                    <Icon name="filter-outline" size={22} color="white" />
                                </TouchableOpacity>
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
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search Astrologer, Astro pooja"
                                placeholderTextColor="black"

                            />
                        </LinearGradient>
                    </View>
                </ImageBackground>
            </View>
            <FlatList
                data={data}
                keyExtractor={data.id}
                renderItem={renderList}
                numColumns={2}
                contentContainerStyle={styles.body}    
            />
            
        </SafeAreaView>
    )
};

export default StoreDesign;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 7,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 5,
    },
    walletAmount: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 7,

    },
    filterButton: {
        justifyContent: 'center',
        padding: 8,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 2,
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
    body:{
        padding: 12,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor:'white',
    },
    card:{  
        height: 175,
        width: 150,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:'#DDD3C2',
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset:{width: 1, height:4 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 6,
        zIndex: 2,
    },
    imgWrapper:{
        height: "65%",
        width: "100%",
        borderRadius: 10,
        overflow: 'hidden',
    },
    img:{
        height:"100%",
        width: "100%",
        resizeMode: 'cover',
    },
    infoContainer:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        margin:1,
        padding: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    infoText:{
        color: 'black',
        fontSize: 16,
        maxWidth: "70%",
        fontWeight:'400',
    },
    gradient:{
        height: 35,
        width: 35,
        borderRadius:30,
        justifyContent: 'center',
        alignItems:'center',
    },
    listButton:{
        height: 33,
        width: 33,
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems:'center',
        justifyContent:'center',
    }


})
import React from "react";
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FAB } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';


const PoojaDetailScreen = ({ navigation }) => {


    // dummy data for the reviews list 
    const data = [
        { id: "1", name: "Ayushi", rating: 2, date: "08 Feb 2024"},
        { id: "2", name: "Ankita", rating: 3, date: "02 Feb 2024"},
        { id: "3", name: "Akansha", rating: 4, date: "07 Feb 2024"},
    ];

    const renderReviews = ({ item }) => {
        return (
            <View style={styles.reviewCard}>
                <View style={styles.userProfileView}>
                    <View style={styles.userPfpWrapper}>
                        <Image source={require("../assets/EcomImages/defaultimage.jpeg")} style={styles.userPfp} />
                    </View>
                    <Text style={styles.userName}>{item.name} </Text>
                    <Pressable
                        onPress={()=>{console.log("dotsIconPressed")}}
                        style={styles.dotsIcon} 
                    >
                        <Icon name="dots-vertical" size={22} color="#777" />
                    </Pressable>
                    
                </View>
                <View style={styles.reviewInfoView}>
                    <View style={styles.ratingView}>
                        <Rating
                        startingValue={item.rating} 
                        imageSize={18}
                  
                        type="custom"
                        ratingBackgroundColor="grey"
                        readonly    
                        />
                        <Text style={styles.reviewdate}>{item.date}</Text>
                    </View>
                    <Text style={styles.reviewText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui omnis ipsam nemo necessitatibus eveniet? Voluptates unde eum totam</Text>
                </View>
            </View>
        )
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTilteView}>
                    <TouchableOpacity onPress={() => { navigation.goBack()}}>
                        <Icon name="arrow-left" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Product Details </Text>
                </View>
                <Pressable style={styles.shareButton} onPress={() => { console.log("share button clicked") }}>
                    <Icon name="whatsapp" size={20} color="white" style={styles.whatsappIcon} />
                    <Text style={styles.shareText}>Share</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.body} showsVerticalScrollIndicator={false} >
                <View style={styles.productImageContainer}>
                    <Image source={require("../assets/EcomImages/dress2.jpeg")} style={styles.productImage} />
                    <View style={styles.productTimeInfo}>
                        <Text style={styles.productTimeText}>1 hours left </Text>
                        <Text style={styles.productTimeText}> 00d : 01h : 49m : 00s left </Text>
                    </View>
                </View>

                <View style={styles.bodyItem}>
                    <Text style={styles.titleText}>Maha Rudrabhishek Pooja</Text>
                    <Text style={styles.descriptionText}>Wipes Out all sins & purifies the Atmosphere</Text>
                </View>

                <View style={styles.bodyItem}>
                    <Text style={styles.itemTitleText}>What are the benefits?</Text>
                    <Text style={styles.listText}> {"\u2022"} Helps in promoting career growth</Text>
                    <Text style={styles.listText}> {"\u2022"} Removes negativity from life</Text>
                    <Text style={styles.listText}> {"\u2022"} removal of doshas</Text>
                    <Text style={styles.listText}> {"\u2022"} Brings harmony in relationships </Text>
                </View>

                <View style={styles.bodyItem}>
                    <Text style={styles.itemTitleText}>How will it happen?</Text>
                    <Text style={styles.descriptionText}> .....Add The related description.... </Text>
                </View>
 
                <View style={[styles.bodyItem, { paddingTop: 0 }]}>
                    <View style={styles.expertProfileView}>
                        <View style={styles.expertPFPView}>
                            <Image source={require("../assets/EcomImages/dress4.jpeg")} style={styles.pfpImage} />
                        </View>
                        <View style={styles.expertInfoView}>
                            <Text style={styles.expertName}>Vijay Ji</Text>
                            <Text style={styles.expertPosition}>Face Reading Expert</Text>
                            <Text style={styles.expertTime}>08 Mar 2024, <Text style={[styles.expertTime, { color: "#777", fontWeight: '300' }]}>06:00 PM</Text> </Text>
                        </View>
                    </View>
                    <View style={styles.expertDescription}>
                        <Text style={styles.expertDescriptionText}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima cumque vitae earum consequuntur quasi. Quas enim nisi sint eum rerum nam iusto quam error! Obcaecati cupiditate sit cumque amet quis?
                        </Text>
                    </View>
                </View>

                <View style={styles.reviewContainer}>
                    <Text style={styles.reviewTitle}>CUSTOMER TESTIMONIALS</Text>
                    <FlatList
                        data={data}
                        keyExtractor={data.id}
                        renderItem={renderReviews}
                        contentContainerStyle={styles.listStyle}
                    />
                </View>

            </ScrollView>
            <View style={styles.bookingContainer}>
                <View style={styles.bookingDetails}>
                    <Text style={styles.bookingPrice}>₹ 999</Text>
                    <Text style={styles.bookingSeats}>Only 4 seats left</Text>
                </View>
                <FAB
                    mode="elevated"
                    label="Book Now"
                    onPress={()=>{console.log("Book Now Pressed")}}
                    backgroundColor="#E7D329"
                    size="small"
                    color="black"
                    customSize={50}
                    style={styles.fab}
                />
            </View>
        </SafeAreaView>
    )
};

export default PoojaDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',

    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#E7D329',
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 12,
    },
    headerTilteView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 5,
        marginHorizontal: 3,
    },
    headerTitle: {
        color: "black",
        fontSize: 22,
        marginHorizontal: 25,
    },
    shareButton: {
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 2,
    },
    shareText: {
        color: "black",
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 3,
    },
    whatsappIcon: {
        backgroundColor: 'limegreen',
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        padding: 2,
    },
    body: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white',
        marginBottom: 60,
    },
    productImageContainer: {
        height: 350,

    },
    productImage: {
        width: "100%",
        height: '90%',
        resizeMode: 'stretch'
    },
    productTimeInfo: {
        backgroundColor: '#64C864',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
        paddingHorizontal: 5,
    },
    productTimeText: {
        color: 'white',
        fontWeight: '400',
        zIndex: 10,
        elevation: 10,
        margin: 2,
    },
    bodyItem: {
        padding: 6,
        margin: 10,
        paddingBottom: 20,
        borderRadius: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd"
    },
    titleText: {
        color: '#444',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    itemTitleText: {
        color: '#444',
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 2,
    },
    descriptionText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '400',
    },
    listText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '300',
    },
    bookingContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        zIndex: 5,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
    },
    bookingDetails: {
        marginHorizontal: 10,
    },
    bookingPrice: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
    },
    bookingSeats: {
        color: '#64C864',
        fontSize: 14,
    },
    fab: {
        margin: 16,
        right: 0,
        bottom: 0,
        width: 160,
        margin: 4,
    },
    expertProfileView: {

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    expertPFPView: {
        height: 70,
        width: 70,
        borderRadius: 40,
        borderWidth: 1,
        overflow: "hidden",

    },
    pfpImage: {
        height: "110%",
        width: '100%',
        resizeMode: 'stretch',
    },
    expertInfoView: {
        marginBottom: 5,
        padding: 10,
        marginHorizontal: 2,
    },
    expertName: {
        color: '#444',
        fontSize: 16,
        fontWeight: '500',
    },
    expertPosition: {
        color: '#444',
        fontSize: 14,
        fontWeight: '400',
        paddingVertical: 2,
    },
    expertTime: {
        marginTop: 3,
        color: 'black',
        fontSize: 18,
        fontWeight: '400',
    },
    expertDescription: {
        paddingHorizontal: 5,
    },
    expertDescriptionText: {
        color: '#555',
        fontSize: 13,
        fontWeight: '400',
    },
    listStyle:{
        marginBottom: 10,
    },
    reviewContainer: {
        margin:3,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#F8F8F8'
    },
    reviewTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        padding: 10,
    },
    reviewCard: {
       
        padding: 10,

        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        // Keep existing flex direction
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 4,
        zIndex: 2,
       
      
    },
    userProfileView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',

    },
    userPfpWrapper:{
        height: 60,
        width: 60,
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: 2,
        marginHorizontal: 3,
    },
    userPfp: {
        height: "100%",
        width: "100%",
        resizeMode: "center",
        
    },
    userName: {
        color: 'black',
        fontSize: 18,
        fontWeight: "400",
    },
    reviewInfoView:{
        padding: 5,
    },  
    ratingView: {
        flexDirection: 'row',
        alignItems :'center',
        justifyContent: 'flex-start',
        padding: 5,

    }, 
    reviewdate:{
        color: '#777',
        fontSize: 13,
        fontWeight: '400',
        marginHorizontal: 10,
    },
    reviewText:{
        color: '#666',
        fontSize: 14,
        fontWeight: '400',
        padding: 5,
    },
    dotsIcon:{
        position: 'absolute',
        right: 0,
    },
});
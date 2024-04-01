import React, { useState } from "react";
import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import { Rating } from "react-native-ratings";




const ServiceDetailScreen = () => {

    const [searchQuery, setSearchQuery] = useState('');


    //astrologers dummy data 
    const data = [
        { id: "1", name: "Sanskruti", image: require("../assets/DesignImages/image15.png") },
        { id: "2", name: "Shivam", image: require("../assets/DesignImages/image15.png") },
        { id: "3", name: "Nirmalji", image: require("../assets/DesignImages/image15.png") },
    ];

    const reviews = [
        { id: "1", name: "Jagdish Trivedi", image: require("../assets/DesignImages/image22.png") },
        { id: "2", name: "Shyamal", image: require("../assets/DesignImages/image22.png") },
        { id: "3", name: "Shiv", image: require("../assets/DesignImages/image22.png") },
        { id: "4", name: "Harshad", image: require("../assets/DesignImages/image22.png") },

    ];

    const renderReviews = ({ item }) => {
        return (
            <View style={styles.customerCard} >
                <View style={styles.customerProfileWrapper} >
                    <View style={styles.customerPfpWrapper}>
                        <Image style={styles.customerPfp} source={item.image} />
                    </View>
                    <View style={styles.customerInfo} >
                        <Text style={styles.customerName}>{item.name}</Text>
                        <View style={styles.customerRatingView}>
                            <View style={{ flexDirection: "row", alignItems: "center", }} >
                                <Image source={require("../assets/DesignImages/Vector.png")} style={styles.star1} />
                                <Image source={require("../assets/DesignImages/Vector.png")} style={styles.star1} />
                                <Image source={require("../assets/DesignImages/Vector.png")} style={styles.star1} />
                                <Image source={require("../assets/DesignImages/Vector.png")} style={styles.star1} />
                                <Image source={require("../assets/DesignImages/Vector.png")} style={styles.star1} />
                                <Text style={[styles.starNo, { marginHorizontal: 3, fontWeight: "400" }]} >4.5</Text>
                            </View>
                            <Text style={styles.reviewdate} >1 Day ago</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.customerReviewWrapper} >
                    <Text style={styles.customerReview}>Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum simply ummy of the printing  been the industry. </Text>
                </View>

            </View>
        )
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.astrologerCard}>
                <View style={styles.pfpWrapper} >
                    <Image source={item.image} style={styles.pfp} />
                </View>
                <View style={styles.astroInfoContainer}>
                    <View style={styles.astroInfo}>
                        <Text style={styles.astrologerName}>{item.name}</Text>
                        <View style={styles.additionalInfo} >
                            <View style={styles.infoItem}>
                                <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                <Text style={styles.infoText}>Vedic</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                <Text style={styles.infoText}>Hindi, Gujrati</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                <Text style={[styles.infoText, { fontWeight: '700' }]}>Exp: 6 Years</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                <Text style={[styles.infoText, { fontWeight: '700' }]}>₹300</Text>
                            </View>

            
                        </View>
                    </View>
                    <View style={styles.astroReview} >
                        <View style={styles.ratingView} >
                            <Rating
                                startingValue={item.rating}
                                imageSize={9}

                                type="custom"
                                readonly
                            />
                            <Text style={styles.ratingText}>4.5</Text>
                        </View>
                        <View>
                            <Text style={styles.reviewNo}>( 255 reviews)</Text>
                        </View>

                    </View>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#9900A8', '#DE8602']}
                        style={styles.bookNowWrapper}
                    >
                        <Pressable style={styles.bookNowButton} >
                            <Text style={styles.bookNow} >Book Now</Text>
                        </Pressable>
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
                                <Text style={styles.drawerText}>Our Products{'\n'} & Service Details</Text>
                            </View>
                            <View style={styles.filterContainer} >
                                <TouchableOpacity style={styles.walletContainer} onPress={() => { }} >
                                    <Text style={styles.walletAmount} >₹300</Text>
                                    <Image source={require("../assets/DesignImages/wallet.png")}  style={{width: 20, height: 17}} />
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
            <ScrollView contentContainerStyle={styles.body}>
                <View style={styles.serviceImageContainer}>
                    <Image source={require('../assets/DesignImages/image1.png')} style={styles.serviceImage} />
                </View>
                <View style={styles.descriptionContainer} >
                    <Text style={styles.serviceName}>Dhan Prapti Pooja</Text>
                    <Text style={styles.serviceDescription}>Lorem Ipsum is simply dummy text of the smapl printing setting industry.</Text>
                </View>
                <View style={styles.descriptionContainer} >
                    <View style={styles.subHeadingView}>
                    <Image source={require("../assets/DesignImages/Ellipse15.png")} style={[styles.ellipse,{height: 12, width: 12}]} />
                        <Text style={styles.subHeading}>Sub Heading here</Text>
                    </View>

                    <Text style={styles.serviceDescription}>Lorem Ipsum is simply dummy text of the smapl printing setting industry.</Text>
                </View>


                <View style={styles.descriptionContainer} >
                    <View style={styles.subHeadingView}>
                    <Image source={require("../assets/DesignImages/Ellipse15.png")} style={[styles.ellipse,{height: 12, width: 12}]} />

                        <Text style={styles.subHeading}>List Section Here</Text>
                    </View>

                    <Text style={styles.serviceDescription}>Printing and typesetting industry lorem Ipsum has been the industry's standard.</Text>
                    <View style={styles.listContainer}>
                        <View style={styles.listItem} >
                            <Image source={require("../assets/DesignImages/CheckedCircle.png")} style={styles.checkedCircle} />
                            <Text style={styles.listText}>Dummy text ever since the when </Text>
                        </View>
                        <View style={styles.listItem} >
                            <Image source={require("../assets/DesignImages/CheckedCircle.png")} style={styles.checkedCircle} /> 
                            <Text style={styles.listText}>An unknown printer took</Text>
                        </View>
                        <View style={styles.listItem} >
                            <Image source={require("../assets/DesignImages/CheckedCircle.png")} style={styles.checkedCircle} />     
                            <Text style={styles.listText}>Galley of type and scrambled it to make</Text>
                        </View>
                        <View style={styles.listItem} >
                            <Image source={require("../assets/DesignImages/CheckedCircle.png")} style={styles.checkedCircle} />
                            <Text style={styles.listText}>Type specimen book. </Text>
                        </View>

                    </View>
                </View>

                <View style={styles.astrologerContainer}>
                    <Text style={styles.astrologerTitle} >Astrologers</Text>
                    <FlatList
                        data={data}
                        keyExtractor={data.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listStyle}
                    />
                </View>
                <View style={styles.reviewSection}>
                    <Text style={styles.reviewSectionTitle} >Ratings & Review</Text>

                    <View style={styles.reviewSectionSubTitleWrapper} >
                        <Image source={require("../assets/DesignImages/Star.png")} style={styles.star} />
                        <Text style={styles.reviewSectionSubTitle} >

                            4.9 ( 255 Reviews)
                        </Text>
                    </View>
                    <View style={styles.ratingContainer} >
                        <View style={styles.ratingItem} >
                            <Text style={styles.starNo} >5 Star</Text>
                            <Progress.Bar
                                style={styles.ratingRectangle}
                                progress={0.9}
                                width={217}
                                height={8}
                                color="#1F9D1D"
                                unfilledColor="#E0E2F0"
                                borderColor="#E0E2F0"
                                borderWidth={0}
                            />

                            <Text style={styles.starNo}>4.5</Text>
                        </View>

                        <View style={styles.ratingItem} >
                            <Text style={styles.starNo} >4 Star</Text>
                            <Progress.Bar
                                style={styles.ratingRectangle}
                                progress={0.5}
                                width={217}
                                height={8}
                                color="#5CD959"
                                unfilledColor="#E0E2F0"
                                borderColor="#E0E2F0"
                                borderWidth={0}
                            />

                            <Text style={styles.starNo}>2.5</Text>
                        </View>

                        <View style={styles.ratingItem} >
                            <Text style={styles.starNo} >3 Star</Text>
                            <Progress.Bar
                                style={styles.ratingRectangle}
                                progress={0.7}
                                width={217}
                                height={8}
                                color="#DBD425"
                                unfilledColor="#E0E2F0"
                                borderColor="#E0E2F0"
                                borderWidth={0}
                            />

                            <Text style={styles.starNo}>2.1</Text>
                        </View>

                        <View style={styles.ratingItem} >
                            <Text style={styles.starNo} >2 Star</Text>
                            <Progress.Bar
                                style={styles.ratingRectangle}
                                progress={0.2}
                                width={217}
                                height={8}
                                color="#DC9A38"
                                unfilledColor="#E0E2F0"
                                borderColor="#E0E2F0"
                                borderWidth={0}
                            />

                            <Text style={styles.starNo}>1.5</Text>
                        </View>

                        <View style={styles.ratingItem} >
                            <Text style={styles.starNo} >1 Star</Text>
                            <Progress.Bar
                                style={styles.ratingRectangle}
                                progress={0.1}
                                width={217}
                                height={8}
                                color="#FF2F2F"
                                unfilledColor="#E0E2F0"
                                borderColor="#E0E2F0"
                                borderWidth={0}
                            />

                            <Text style={styles.starNo}>1.1</Text>
                        </View>


                    </View>
                    <View style={styles.CustomerReviewContainer} >
                        <FlatList
                            data={reviews}
                            keyExtractor={reviews.id}
                            renderItem={renderReviews}
                            contentContainerStyle={styles.reviewListStyle}
                        />
                    </View>
                </View>


            </ScrollView>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#9900A8', '#DE8602']}
                style={styles.bottomContainer} >
                    
                <Text style={styles.bottomText} >₹30/min</Text>
                <Pressable style={styles.chatNowButton} >
                    <Text style={styles.chatText} >Chat Now</Text>
                </Pressable>
            </LinearGradient>


        </SafeAreaView>
    )
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 188,
        width: '100%',
        position: "absolute",
        zIndex: 3,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginHorizontal: 1,
        overflow: 'hidden',
    },
    headerBackground: {
        height: "100%",
        width: "100%",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
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
        fontFamily:"Plus Jakarta Sans",
        paddingHorizontal: 2,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    walletContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 90,
        height: 34,
        padding: 7,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 3,
    },
    walletAmount: {
        color: 'white',
        fontSize: 14,
        fontWeight: "500",
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
    body: {
        marginTop: 188,
        backgroundColor: 'white',
    },

    imgWrapper: {
        height: "65%",
        width: "100%",
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    img: {
        height: "100%",
        width: "100%",
        resizeMode: 'cover',
    },
    serviceImage: {
        width: "100%",
        height: 188,
        borderRadius: 18,
    },
    descriptionContainer: {
        padding: 20,
    },
    serviceName: {
        color: "black",
        fontSize: 20,
        fontWeight: '500',
        fontFamily:'Plus Jakarta Sans',
    },
    serviceDescription: {
        color: "black",
        fontSize: 13,
        fontWeight: '400',
        fontFamily:'Plus Jakarta Sans',
        marginVertical: 10,
    },
    subHeadingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    subHeading: {
        color: 'black',
        fontSize: 15,
        fontWeight: "500",
        fontFamily:'Plus Jakarta Sans',
        marginHorizontal: 3,
    },
    listContainer: {
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listText: {
        color: "black",
        fontSize: 13,
        fontWeight: '400',
        fontFamily:'Plus Jakarta Sans',
        marginVertical: 5,
    },
    checkedCircle:{
        height: 10,
        width: 10,
        marginHorizontal: 5,
    },
    astrologerContainer: {
        borderColor: "#F7F0E5",
        borderWidth: 3,
        padding: 19,
    },
    astrologerTitle: {
        color: "black",
        fontSize: 19,
        fontWeight: '600',
        fontFamily:'Plus Jakarta Sans',
        marginTop: 5,
    },
    listStyle: {
        marginTop: 10,

    },
    astrologerCard: {
        borderWidth: 0.7,
        borderColor: '#DDD3C2',
        borderRadius: 10,
        height: 127,
        width: "100%",
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'white',
        paddingRight: 5,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 4,
        zIndex: 2,
    },
    pfpWrapper: {
        height: 75,
        width: 75,
        borderWidth: 1,
        borderColor: '#DE8602',
        overflow: "hidden",
        borderRadius: 50,
        marginLeft: 14,
        marginTop: 21,
    },
    pfp: {
        height: "100%",
        width: "100%",
        resizeMode: 'cover',
        borderRadius: 50,
    },
    astroInfoContainer: {
        paddingVertical: 4,
        width: "65%",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: 12,
    },
    astroInfo: {
        marginTop: 14,
    },
    astrologerName: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
        fontFamily:'Plus Jakarta Sans',
    },
    additionalInfo: {
        marginTop: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        color: "#626262",
        fontSize: 11,
        fontFamily:'Plus Jakarta Sans',
        marginHorizontal: 2,
    },
    astroReview: {
        marginTop: 13,
        position: 'relative',
        marginRight: 5,
    },
    ratingView: {
        padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: 65,
    },
    ratingText: {
        color: 'black',
        fontSize: 10,
        fontWeight: "700",
        fontFamily:'Plus Jakarta Sans',
        marginHorizontal: 3,
    },
    reviewNo: {
        color: "black",
        fontWeight: "400",
        fontFamily:'Plus Jakarta Sans',
        fontSize: 10,
    },
    bookNowWrapper: {
        width: 85,
        height: 34,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        bottom: 22,
        right: 5,
    },
    bookNowButton: {
        width: 83,
        height: 32,
        borderRadius: 4,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: "center",
    },
    bookNow: {
        color: "#9900A8",
        fontSize: 13,
        fontWeight: '500',
        fontFamily:'Plus Jakarta Sans',
    },
    ellipse: {
        width: 7,
        height: 7,
    },
    reviewSection: {
        borderWidth: 1,
        borderColor: "#DDD3C2",
        borderRadius: 10,
        width: "88%",
        marginTop: 40,
        marginHorizontal: 19,
        alignSelf: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
        zIndex: 2,
        marginBottom: 350,
    },
    reviewSectionTitle: {
        color: "black",
        fontSize: 19,
        fontWeight: "700",
        fontFamily:'Plus Jakarta Sans',
        marginHorizontal: 12,
        marginTop: 14,

    },
    reviewSectionSubTitleWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 12,
    },
    reviewSectionSubTitle: {
        color: "#474747",
        fontSize: 11,
        fontWeight: "400",
        fontFamily:'Plus Jakarta Sans',
        marginHorizontal: 2,
    },
    star: {
        height: 10,
        width: 10,
    },
    star1: {
        height: 14,
        width: 14,
    },
    ratingContainer: {
        marginVertical: 15,
        marginHorizontal: 12
    },
    ratingItem: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    },
    starNo: {
        color: "#474747",
        fontSize: 14,
        fontWeight: "600",
        fontFamily:'Plus Jakarta Sans',
    },
    ratingRectangle: {
        width: 217,
        margin: 10,
        borderRadius: 34,
    },
    CustomerReviewContainer: {
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#DDD3C2",

    },
    customerCard: {
        borderBottomWidth: 1,
        borderColor: "#DDD3C2",
        marginHorizontal: 13,
        marginTop: 35,
        height: 142,
    },
    customerPfpWrapper: {
        height: 50,
        width: 50,
        overflow: "hidden",
        borderRadius: 50,
    },
    customerPfp: {
        height: "100%",
        width: "100%",
        resizeMode: "center",
    },
    customerProfileWrapper: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",

    },
    customerInfo: {

        paddingLeft: 6,
        width: "82.5%",
    },
    customerName: {
        color: "#474747",
        fontSize: 14,
        fontWeight: "600",
        fontFamily:'Plus Jakarta Sans',
        marginTop: 9,

    },
    customerRatingView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",

    },
    reviewdate: {
        color: "#A1A1A1",
        fontSize: 14,
        fontWeight: "400",
        fontFamily:'Plus Jakarta Sans',
    },
    customerReviewWrapper: {
        marginTop: 13,
    },
    customerReview: {
        color: "#474747",
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 20,
    },
    bottomContainer: {
        width: "99%",
        height: 75,
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"center",
        position: "absolute",
        zIndex: 3,
        bottom: 0,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
        paddingHorizontal: 18,
        paddingBottom: 3,
    },
    bottomText:{
        color:"white",
        fontSize: 27,
        fontWeight: "700",
        fontFamily:'Plus Jakarta Sans',
    },
    chatNowButton:{
        height: 40,
        width: 118,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent: "center",
        zIndex: 10,
        position: "absolute",
        right: 18,
        borderRadius: 8,
    },
    chatText:{
        color:"#9900A8",    
        fontSize:17,
        fontWeight: "700",
        fontFamily:'Plus Jakarta Sans',
    }
});
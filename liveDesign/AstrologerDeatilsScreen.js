import React, { useState, useRef, useEffect } from 'react';
import { Alert, FlatList, Image, ImageBackground, Pressable, TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView, } from 'react-native';
import { externalStyles } from '../common/styles';
import { colors } from '../common/color';
import { CustomConsole, FilterButton, Header, WalletAPI, WalletButton, alertDialogDisplay, refreshTokenApiCall } from '../common/utils';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import { Rating } from "react-native-ratings";
import CalendarStrip from 'react-native-calendar-strip';
import moment, { weekdays, weekdaysMin } from 'moment';

import SeeMore from 'react-native-see-more-inline';
// import { TOKEN, getSession } from '../common/LocalStorage';
// import { ASTROLOGER_DETAILS } from '../common/webUtils';

export function AstrologerDeatilsScreen({ navigation, route }) {

    // const astrologer_id = route.params.paramId;

    const [phoneNumber, setPhoneNumber] = useState("+919876543210");
    const [address, setAddress] = useState("Ahmedabad");
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState('');
    const [profile_image, setProfileImage] = useState('');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [current_address, setCurrentAddress] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [role, setRole] = useState("");
    const [otp, setOtp] = useState("");
    const [user_profile, setUser_profile] = useState("");
    const [category_ids, setCategoryIds] = useState("");
    // const [category_ids, setCategoryIds] = useState("");

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [currentMonth, setCurrentMonth] = useState( moment().month());
    const calendarRef = useRef(null);
    const [startingDate, setStartingDate] = useState(new Date());





    useEffect(() => {

    }, [])
    


    const MonthStrip = () => {
        return (
            <SafeAreaView style={styles.availabilityHeader} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                >
                    {months.map((month, index) => (
                        <Pressable onPress={() => handleMonthSelect(month)} key={index}>
                            <Text 
                                style={[styles.headerMonth,
                                { color: month === currentMonth ? '#9900A8' : '#858585', borderColor: month === currentMonth ? "#9900A8" : "#DDD3C2" }]}>
                                {month}
                            </Text>
                        </Pressable>

                    ))}
                </ScrollView>
            </SafeAreaView>

        )

    }

    const handleMonthSelect = (index) => {
        const selectedMonthDate = moment().month(index)

   
            
       
       
        setSelectedDay(selectedMonthDate);
    };

    const handleDateSelected = (dateString) => {
        const selectedDate = moment(dateString);
        const selectedMonth = months[selectedDate.month()];
        setCurrentMonth(selectedMonth);
      };

    
    // useEffect(() => {
    //     getSessionData();
    // }, []);

    // const getSessionData = async () => {
    //     try {
    //         getAstrologerDetailsApi();
    //     } catch (error) {

    //     }
    // }

    // // astrologer details api
    // const getAstrologerDetailsApi = async () => {

    //     try {
    //         const token = await getSession(TOKEN);

    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", token);
    //         myHeaders.append("Content-Type", "application/json");

    //         const raw = JSON.stringify({
    //             "astrologer_id": astrologer_id
    //         });

    //         const requestOptions = {
    //             method: "POST",
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: "follow"
    //         };

    //         CustomConsole(ASTROLOGER_DETAILS + "\n" + raw);

    //         setLoading(true);
    //         fetch(ASTROLOGER_DETAILS, requestOptions)
    //             .then((response) => response.json())
    //             .then(async (json) => {
    //                 CustomConsole(json);

    //                 if (json.status == 1) {
    //                     // success response

    //                     setFullName(json.astrotalk_deyails[0].user_name);

    //                 }
    //                 else if (json.status == 10) {
    //                     // refresh token
    //                     setLoading(false);

    //                     const status = await refreshTokenApiCall();
    //                     CustomConsole("Status: " + status);

    //                     if (status == 1) {
    //                         getAstrologerDetailsApi();
    //                     } else {

    //                     }
    //                 }
    //                 else {
    //                     // other reponse status
    //                     setLoading(false);
    //                     Alert.alert(APP_NAME, json.message);
    //                 }
    //             })
    //             .catch((error) => {
    //                 setLoading(false);
    //                 CustomConsole("Category list Api Error: " + error);
    //             });

    //     } catch (error) {
    //         setLoading(false);
    //         CustomConsole("Category List Api Exception: " + error);
    //     }
    // }


    const handlePress = (day) => {
        if (selectedDay !== day) {
            setSelectedDay(day);
        }
    };

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
    };




    return (
        <View style={{ flex: 1 }}>

            {/* header view */}
                <Header title={`Chat with \nAstrologer`} searchValue={searchQuery} setSearchValue={setSearchQuery} />
            {/* end of header view */}

            {/* main view */}

            <FlatList data={["1"]}
                renderItem={(item) => {
                    return (
                        <View style={{
                            marginHorizontal: 5,
                            overflow: "hidden",
                            zIndex: 6,
                            position: "relative",
                            elevation: 5,
                            // marginBottom: 50
                        }}>
                            {/* astrologer basic details view */}
                            {/* <View  style={{height: 13, width: 76, backgroundColor:'#897F83', alignItems:'center', transform: [{rotate: '-45deg'}],position:"absolute", top: 20,left: -20,  zIndex: 4, }} >
                                                <Text style={{fontSize:9, color: "white", fontWeight:"400"}} >Rising Star</Text>
                                            </View> */}
                            <View style={{
                                backgroundColor: colors.white,
                                elevation: 5,
                                marginVertical: 10,
                                borderRadius: 10,
                                padding: 10,
                                paddingTop: 20,
                            }}>


                                <View style={{ flexDirection: "row", borderBottomWidth: 0, borderBottomColor: colors.borderColor, paddingBottom: 10 }}>

                                    <View style={{ flex: 0.3, alignItems: "center" }}>
                                        <Image source={{ uri: "https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.webp?b=1&s=170667a&w=0&k=20&c=nksxkI9jIKMXW-pw47aKqrPHM3ahY1XgOApN3YiOk1g=" }}
                                            style={{ height: 80, width: 80, borderRadius: 50, borderWidth: 2, borderColor: "#DE8602" }} />
                                        <View style={{ height: 13, width: 33, borderWidth: 1, borderColor: "white", borderRadius: 30, backgroundColor: "#DE8602", alignItems: "center", justifyContent: "center", top: -10, }} >
                                            <Text style={{ fontSize: 9, fontWeight: "600", color: "white" }} >NEW</Text>

                                        </View>

                                    </View>
                                    <View style={{ flex: 0.7, paddingLeft: 5 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{
                                                    color: colors.black,
                                                    fontSize: 18,
                                                    fontWeight: "600"
                                                }}>ChanchalM</Text>
                                                {/* <Image source={require("../assets/DesignImages/verify.png")}
                                                    style={{ height: 20, width: 20, marginLeft: 10, tintColor: "green" }} />
                                                <Pressable style={{
                                                    paddingHorizontal: 7,
                                                    paddingVertical: 4,
                                                    backgroundColor: colors.themeColor,
                                                    borderRadius: 5,
                                                    marginLeft: 10
                                                }}>
                                                    <Text style={{
                                                        color: colors.black,
                                                        fontSize: 10,
                                                        fontWeight: "600"
                                                    }}>Follow</Text>
                                                </Pressable> */}


                                            </View>
                                            {/* <Pressable style={{ padding: 5 }}>
                                                <Image source={require("../assets/DesignImages/three_dots.png")}
                                                    style={{ height: 20, width: 20, tintColor: "grey" }} />
                                            </Pressable> */}
                                            <View style={{ padding: 5, }} >
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Image source={require("../assets/DesignImages/star.png")}
                                                        style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                    <Image source={require("../assets/DesignImages/star.png")}
                                                        style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                    <Image source={require("../assets/DesignImages/star.png")}
                                                        style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                    <Image source={require("../assets/DesignImages/star.png")}
                                                        style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                    <Image source={require("../assets/DesignImages/star.png")}
                                                        style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                </View>
                                                <Text style={{
                                                    fontSize: 10,
                                                    color: "grey"
                                                }}>30489 orders</Text>
                                            </View>


                                        </View>
                                        <View style={styles.listItem} >
                                            <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                            <Text style={{
                                                fontSize: 12,
                                                color: "grey"
                                            }}>Tarot, Palmistry</Text>
                                        </View>

                                        <View style={styles.listItem} >
                                            <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                            <Text style={{
                                                fontSize: 12,
                                                color: "grey"
                                            }}>Hindi</Text>
                                        </View>

                                        <View style={styles.listItem} >
                                            <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                            <Text style={{
                                                fontSize: 12,
                                                color: "grey"
                                            }}>Exp: 7 Years</Text>
                                        </View>

                                        <View style={styles.listItem} >
                                            <Image source={require("../assets/DesignImages/Ellipse15.png")} style={styles.ellipse} />
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: "grey",
                                                    textDecorationLine: "line-through"
                                                }}>₹ 28</Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: "red",
                                                    fontWeight: "700",
                                                    marginLeft: 5
                                                }}>₹ 5/min</Text>
                                            </View>
                                        </View>



                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#DDD3C2" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", borderRightWidth: 1, borderRightColor: colors.borderColor, flex: 1, justifyContent: "center" }}>
                                        <Image source={require("../assets/DesignImages/phone_call.png")}
                                            style={{ height: 20, width: 20, marginLeft: 10, tintColor: "grey" }} />
                                        <Text style={{
                                            fontSize: 13,
                                            color: "grey",
                                            fontWeight: "500",
                                            marginLeft: 10
                                        }}>149K <Text style={{ fontWeight: "400" }}>mins</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "center" }}>
                                        <Image source={require("../assets/DesignImages/bubble_chat.png")}
                                            style={{ height: 20, width: 20, marginLeft: 10, tintColor: "grey" }} />
                                        <Text style={{
                                            fontSize: 13,
                                            color: "grey",
                                            fontWeight: "500",
                                            marginLeft: 10
                                        }}>30K <Text style={{ fontWeight: "400" }}>mins</Text></Text>
                                    </View>
                                </View>

                                {/* description view */}
                                <View style={{
                                    backgroundColor: colors.white,
                                    marginVertical: 5,
                                    borderRadius: 10,
                                    padding: 10
                                }}>

                                    <Text style={styles.availableTime} >I am available until: 8:30 am EST</Text>

                                    <View style={styles.contactView} >
                                        <View style={styles.timeTextWrap} >
                                            <View style={styles.phoneCallIconContainer} >
                                                <Image source={require("../assets/DesignImages/phone_call.png")} style={styles.phoneCallIcon} />
                                            </View>

                                            <Text style={styles.timeText} >₹30/min</Text>
                                        </View>
                                        <Pressable style={styles.contactButton} >
                                            <Text style={styles.contactText} >Call Now</Text>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.contactMsgView, {}]} >
                                        <View style={styles.timeTextWrap} >
                                            <View style={styles.msgIconContainer} >
                                                <Image source={require("../assets/DesignImages/Message_Bubble.png")} style={[styles.phoneCallIcon, { height: 10, width: 12, }]} />
                                            </View>
                                            <Text style={styles.timeText} >₹20/min</Text>
                                        </View>
                                        <Pressable style={styles.contactMsgButton} >
                                            <Text style={styles.contactMsgText} >Chat Now</Text>
                                        </Pressable>
                                    </View>

                                    <View style={{ marginTop: 30 }} >
                                        <Text style={[styles.subHeading, { marginHorizontal: 0 }]} >About Sanskruti</Text>
                                        <SeeMore numberOfLines={2} linkColor={"blue"} linkPressedColor={"rgba(255, 60, 72, 0.6)"}
                                            seeLessText="See Less" seeMoreText="See More..." style={{ lineHeight: 21, color: "rgba(0, 0, 0, 0.6)", fontSize: 13, fontWeight: "400" }}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        </SeeMore>
                                    </View>



                                </View>
                                {/* end of description view */}
                                <View style={styles.availablityView} >
                                    <Text style={styles.subHeading} >Availability</Text>
                                    <MonthStrip />


                                    {/* <View style={styles.weekDayContainer} >
                                        <Pressable
                                            style={[
                                                styles.weekDay,
                                                { backgroundColor: selectedDay === "S" ? "#9900A8" : "transparent" },
                                            ]}
                                            onPress={() => handlePress("S")}
                                        >
                                            <Text style={[styles.day, { color: selectedDay === "S" ? "white" : "#B9B9B9" }]}>S</Text>
                                            <Text style={[styles.date, { color: selectedDay === "S" ? "white" : "#B9B9B9" }]}>12</Text>
                                        </Pressable>

                                        <Pressable
                                            style={[
                                                styles.weekDay,
                                                { backgroundColor: selectedDay === "M" ? "#9900A8" : "transparent" },
                                            ]}
                                            onPress={() => handlePress("M")}
                                        >
                                            <Text style={[styles.day, { color: selectedDay === "M" ? "white" : "#B9B9B9" }]}>M</Text>
                                            <Text style={[styles.date, { color: selectedDay === "M" ? "white" : "#B9B9B9" }]}>13</Text>
                                        </Pressable>

                                        <Pressable
                                            style={[
                                                styles.weekDay,
                                                { backgroundColor: selectedDay === "T" ? "#9900A8" : "transparent" },
                                            ]}
                                            onPress={() => handlePress("T")}
                                        >
                                            <Text style={[styles.day, { color: selectedDay === "T" ? "white" : "#B9B9B9" }]}>T</Text>
                                            <Text style={[styles.date, { color: selectedDay === "T" ? "white" : "#B9B9B9" }]}>14</Text>
                                        </Pressable>

                                        <Pressable
                                            style={[
                                                styles.weekDay,
                                                { backgroundColor: selectedDay === "W" ? "#9900A8" : "transparent" },
                                            ]}
                                            onPress={() => handlePress("W")}
                                        >
                                            <Text style={[styles.day, { color: selectedDay === "W" ? "white" : "#B9B9B9" }]}>W</Text>
                                            <Text style={[styles.date, { color: selectedDay === "W" ? "white" : "#B9B9B9" }]}>15</Text>
                                        </Pressable>

                                        <Pressable
                                            style={[
                                                styles.weekDay,
                                                { backgroundColor: selectedDay === "Tu" ? "#9900A8" : "transparent" },
                                            ]}
                                            onPress={() => handlePress("Tu")}
                                        >
                                            <Text style={[styles.day, { color: selectedDay === "Tu" ? "white" : "#B9B9B9" }]}>T</Text>
                                            <Text style={[styles.date, { color: selectedDay === "Tu" ? "white" : "#B9B9B9" }]}>16</Text>
                                        </Pressable>

                                        <Pressable
                                            style={[
                                                styles.weekDay,
                                                { backgroundColor: selectedDay === "F" ? "#9900A8" : "transparent" },
                                            ]}
                                            onPress={() => handlePress("F")}
                                        >
                                            <Text style={[styles.day, { color: selectedDay === "F" ? "white" : "#B9B9B9" }]}>F</Text>
                                            <Text style={[styles.date, { color: selectedDay === "F" ? "white" : "#B9B9B9" }]}>17</Text>
                                        </Pressable>

                                        <Pressable
                                            style={[
                                                styles.weekDay,
                                                { backgroundColor: selectedDay === "Sa" ? "#9900A8" : "transparent" },
                                            ]}
                                            onPress={() => handlePress("Sa")}
                                        >
                                            <Text style={[styles.day, { color: selectedDay === "Sa" ? "white" : "#B9B9B9" }]}>S</Text>
                                            <Text style={[styles.date, { color: selectedDay === "Sa" ? "white" : "#B9B9B9" }]}>12</Text>
                                        </Pressable>
                                    </View> */}

                                    <CalendarStrip
                                        ref={calendarRef}
                                        calendarAnimation={{ type: 'parallel', duration: 30 }}
                                        daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white', backgroundColor: "#9900A8" }}
                                        style={styles.weekDayContainer}
                                        calendarHeaderStyle={{ color: 'black', }}
                                        calendarColor={'white'}

                                        dateNumberStyle={{ color: '#B9B9B9', fontSize: 12, fontWeight: "700" }}
                                        dateNameStyle={{ color: '#B9B9B9', fontSize: 12, fontWeight: "700" }}
                                        highlightDateNumberStyle={{ color: 'white', fontSize: 12, fontWeight: "700" }}
                                        highlightDateNameStyle={{ color: 'white', fontSize: 12, fontWeight: "700", }}
                                        highlightDateContainerStyle={{ backgroundColor: "#9900A8", borderWidth: 0 }}
                                        dayContainerStyle={{ backgroundColor: "white", height: 51, width: 37, borderColor: "#DDD3C2", borderWidth: 1, }}
                                        iconContainer={{ flex: 0.1, }}
                                        selectedDate={selectedDay}
                                        scrollToOnSetSelectedDate={true}
                                        showMonth={false}
                                        iconStyle={{ height: 10, }}
                                        // startingDate={startingDate}
                                        onDateSelected={handleDateSelected}
                                    />


                                    <View style={styles.schedule} >
                                        <View style={styles.row} >
                                            <View style={styles.timeView} >
                                                <Text style={styles.time} >9:30 AM - 12:30 PM</Text>
                                            </View>
                                            <View style={styles.methodView} >
                                                <Image source={require("../assets/DesignImages/phone_call.png")}
                                                    style={{ height: 13, width: 13, tintColor: "#9C9C9C", marginHorizontal: 10, }}
                                                />
                                                <Image source={require("../assets/DesignImages/Message_Bubble.png")}
                                                    style={{ height: 13, width: 15, tintColor: "#9C9C9C" }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.row} >
                                            <View style={styles.timeView} >
                                                <Text style={styles.time} >9:30 AM - 12:30 PM</Text>
                                            </View>
                                            <View style={styles.methodView} >
                                                <Image source={require("../assets/DesignImages/phone_call.png")}
                                                    style={{ height: 13, width: 13, tintColor: "#9C9C9C", marginHorizontal: 10, }}
                                                />
                                                <Image source={require("../assets/DesignImages/Message_Bubble.png")}
                                                    style={{ height: 13, width: 15, tintColor: "#9C9C9C" }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.row} >
                                            <View style={styles.timeView} >
                                                <Text style={styles.time} >9:30 AM - 12:30 PM</Text>
                                            </View>
                                            <View style={styles.methodView} >
                                                <Image source={require("../assets/DesignImages/phone_call.png")}
                                                    style={{ height: 13, width: 13, tintColor: "#9C9C9C", marginHorizontal: 10, }}
                                                />
                                                <Image source={require("../assets/DesignImages/Message_Bubble.png")}
                                                    style={{ height: 13, width: 15, tintColor: "#9C9C9C" }}
                                                />
                                            </View>
                                        </View>
                                    </View>



                                    <Pressable onPress={() => { }} >
                                        <LinearGradient
                                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                            colors={['#9900A8', '#DE8602']}
                                            style={styles.appointmentButtonContainer}
                                        >
                                            <Text style={styles.appointmentText} >Schedule Appointment</Text>
                                        </LinearGradient>
                                    </Pressable>
                                </View>


                            </View>
                            {/* end of astrologer basic details view */}


                            {/* image list view */}
                            <View style={styles.photoView} >

                                <Text style={styles.Heading} >Photos</Text>
                                <FlatList style={{
                                    marginVertical: 10

                                }}
                                    horizontal
                                    data={[
                                        "https://encrypted-tbn0.gstatic.com/DesignImages?q=tbn:ANd9GcQ6grFw6XPQyIBp1lY2wDOoGtltYdTQLRd27QOqsRxMT_YJ3cD3v3w2E0_d5wLiqmdHu_U&usqp=CAU",
                                        "https://likewisestage.blob.core.windows.net/DesignImages/adbe7230-5587-43e5-96fe-3ce863f25e88/photo.jpg",
                                        "https://encrypted-tbn0.gstatic.com/DesignImages?q=tbn:ANd9GcSXs_iIewEiaZ3tXb6n6VgaUIONS0B0HjwsqcvA3-EnnaNm0BwX216u2dZl2QTHnP7VOIU&usqp=CAU",
                                        "https://encrypted-tbn0.gstatic.com/DesignImages?q=tbn:ANd9GcSFowEgYTDVrX21V9dHEqCb4Fkm608l_CVUFVvAplchlVNVwRfKRQjPRnPC-a1Yq0RiO7U&usqp=CAU"
                                    ]}
                                    ItemSeparatorComponent={<View style={{ margin: 5 }} />}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <Image source={{ uri: item }}
                                                style={{ width: 80, height: 80, borderRadius: 10, marginRight: 4, }} />
                                        );
                                    }} />
                            </View>
                            {/* end of image list view */}

                            {/* review list view */}
                            <View style={{ marginVertical: 5 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                    <Text style={{
                                        fontSize: 20,
                                        color: colors.black
                                    }}>User Reviews</Text>
                                    <Pressable onPress={() => navigation.navigate("ReviewListScreen")}>
                                        <Text style={{
                                            fontSize: 13,
                                            color: "grey"
                                        }}>View All</Text>
                                    </Pressable>
                                </View>

                                {/* <FlatList
                                    style={{ marginTop: 10 }}
                                    data={["1", "2"]}
                                    ItemSeparatorComponent={<View style={{ margin: 3 }} />}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ backgroundColor: colors.white, elevation: 5, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/DesignImages?q=tbn:ANd9GcQ6grFw6XPQyIBp1lY2wDOoGtltYdTQLRd27QOqsRxMT_YJ3cD3v3w2E0_d5wLiqmdHu_U&usqp=CAU" }}
                                                            style={{ height: 45, width: 45, borderRadius: 50 }} />
                                                        <Text style={{
                                                            fontSize: 20,
                                                            color: colors.black,
                                                            marginLeft: 10
                                                        }}>XYZ</Text>
                                                    </View>
                                                    <Pressable style={{ padding: 5 }}>
                                                        <Image source={require("../assets/DesignImages/three_dots.png")}
                                                            style={{ height: 20, width: 20, tintColor: "grey" }} />
                                                    </Pressable>
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Image source={require("../assets/DesignImages/star.png")}
                                                            style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                        <Image source={require("../assets/DesignImages/star.png")}
                                                            style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                        <Image source={require("../assets/DesignImages/star.png")}
                                                            style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                        <Image source={require("../assets/DesignImages/star.png")}
                                                            style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                        <Image source={require("../assets/DesignImages/star.png")}
                                                            style={0 >= 1 ? externalStyles.singleProductReviewActiveStar : externalStyles.singleProductReviewInactiveStar} />
                                                    </View>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        color: colors.grey,
                                                        marginTop: 10
                                                    }}>XYZ</Text>
                                                </View>
                                            </View>
                                        );
                                    }} /> */}
                                <View style={styles.CustomerReviewContainer} >
                                    <Text style={styles.reviewSectionTitle} >Ratings & Review</Text>
                                    <View style={styles.reviewSectionSubTitleWrapper} >
                                        <Image source={require("../assets/DesignImages/star.png")} style={styles.star} />
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
                                    <FlatList
                                        data={reviews}
                                        keyExtractor={reviews.id}
                                        renderItem={renderReviews}
                                        contentContainerStyle={styles.reviewListStyle}
                                    />
                                </View>

                                <Pressable onPress={() => navigation.navigate("ReviewListScreen")}
                                    style={{ marginTop: 10 }}>
                                    <Text style={{
                                        fontSize: 17,
                                        color: colors.allReviews,
                                        fontWeight: "500"
                                    }}>See all reviews</Text>
                                </Pressable>
                            </View>
                            {/* end of review list view */}

                            {/* check similar consultants */}
                            <View style={{ backgroundColor: colors.white, borderRadius: 10, elevation: 1, paddingVertical: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                    <Text style={{
                                        fontSize: 20,
                                        color: colors.black
                                    }}>Check Similar Consultants</Text>
                                    <Pressable>
                                        {/* information_icon */}
                                        <Image source={require("../assets/DesignImages/information_icon.png")}
                                            style={{ height: 20, width: 20, tintColor: colors.black }} />
                                    </Pressable>
                                </View>

                                <FlatList
                                    style={{ paddingHorizontal: 10, paddingVertical: 10 }}
                                    horizontal
                                    data={["1", "2"]}
                                    ItemSeparatorComponent={<View style={{ margin: 5 }} />}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ backgroundColor: colors.white, elevation: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, margin: 2 }}>
                                                <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/DesignImages?q=tbn:ANd9GcQ6grFw6XPQyIBp1lY2wDOoGtltYdTQLRd27QOqsRxMT_YJ3cD3v3w2E0_d5wLiqmdHu_U&usqp=CAU" }}
                                                    style={{ height: 100, width: 100, borderRadius: 50 }} />
                                                <Text style={{
                                                    fontSize: 20,
                                                    color: colors.black, textAlign: "center"
                                                }}>Dhaval</Text>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: colors.grey, textAlign: "center"
                                                }}>₹ 5/min</Text>
                                            </View>
                                        );
                                    }}
                                />

                            </View>
                            {/* end of check similar consultants */}

                            {/* chat with assistant */}
                            <View style={{ marginVertical: 5, backgroundColor: colors.white, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 15, elevation: 2, }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Image source={require("../assets/DesignImages/telemarketer.png")}
                                        style={{ height: 25, width: 25, tintColor: "grey" }} />
                                    <Text style={{
                                        fontSize: 20,
                                        color: colors.black,
                                        marginLeft: 10
                                    }}>Chat with Assistant</Text>
                                </View>
                                <Image source={require("../assets/DesignImages/right_arrow.png")}
                                    style={{ height: 15, width: 15, tintColor: "grey" }} />
                            </View>
                            {/* end of chat with assistant */}

                            {/* gift list view */}
                            <View style={{ marginVertical: 5, backgroundColor: colors.white, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 15, elevation: 2, }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Image source={require("../assets/DesignImages/gift.png")}
                                            style={{ height: 20, width: 20, tintColor: "grey" }} />
                                        <Text style={{
                                            fontSize: 20,
                                            color: colors.black,
                                            marginLeft: 10
                                        }}>Send Gift to ChanchalM</Text>
                                        <Image source={require("../assets/DesignImages/info.png")}
                                            style={{ height: 20, width: 20, tintColor: "grey", marginLeft: 5 }} />
                                    </View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: colors.black,
                                    }}>₹ 1</Text>
                                </View>
                                <FlatList style={{ marginTop: 15 }}
                                    numColumns={4}
                                    data={["1", "2"]}
                                    ItemSeparatorComponent={<View style={{ margin: 5 }} />}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{ margin: 5 }}>
                                                <Image source={require("../assets/DesignImages/gift.png")}
                                                    style={{ height: 70, width: 70, tintColor: "grey" }} />
                                                <Text style={{
                                                    fontSize: 10,
                                                    color: colors.black,
                                                    textAlign: "center",
                                                    marginTop: 10
                                                }}>Flowers</Text>
                                                <Text style={{
                                                    fontSize: 13,
                                                    color: colors.black,
                                                    textAlign: "center"
                                                }}>₹ 5</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            {/* end of gift list view */}

                        </View>
                    );
                }}
            />

            {/* chat and call button view */}
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.white }}>
                <Pressable style={{ flex: 1, backgroundColor: colors.white, margin: 5, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 15, elevation: 2 }}>
                    <Image source={require("../assets/DesignImages/bubble_chat.png")} style={{ width: 15, height: 15, resizeMode: "contain", tintColor: colors.allReviews }} />
                    <Text style={{
                        flex: 1,
                        fontSize: 17,
                        color: colors.allReviews,
                        fontWeight: "500",
                        textAlign: 'center'
                    }}>Chat</Text>
                </Pressable>
                <Pressable style={{ flex: 1, backgroundColor: colors.white, margin: 5, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 15, elevation: 2 }}>
                    <Image source={require("../assets/DesignImages/phone_call.png")} style={{ width: 15, height: 15, resizeMode: "contain", tintColor: colors.allReviews }} />
                    <Text style={{
                        flex: 1,
                        fontSize: 17,
                        color: colors.allReviews,
                        fontWeight: "500",
                        textAlign: 'center'
                    }}>Call</Text>
                </Pressable>
            </View>
            {/* end of chat and call button view */}

            {/* end of main view */}

        </View>
    );
}

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
    availableTime: {
        color: "black",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 5,
    },
    contactView: {
        height: 55,
        width: 296,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#9900A8",
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 13,
        paddingRight: 6,
        backgroundColor: "rgba(153, 0, 168, 0.1)",
    },
    timeTextWrap: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeText: {
        fontSize: 13,
        color: "black",
        fontWeight: "400",
        marginHorizontal: 5,
    },
    phoneCallIconContainer: {
        height: 25,
        width: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: "#9900A8",
        borderRadius: 30,
        backgroundColor: "white",
    },
    phoneCallIcon: {
        height: 13,
        width: 13,
    },
    contactButton: {
        width: 148,
        height: 42,
        borderWidth: 1,
        borderColor: "#9900A8",
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    contactText: {
        fontSize: 15,
        color: "#9900A8",
        fontWeight: "600"
    },
    contactMsgView: {
        height: 55,
        width: 296,
        borderWidth: 1,
        borderColor: "#DE8602",
        borderRadius: 6,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 13,
        paddingRight: 6,
        backgroundColor: "rgba(222, 134, 2, 0.1)",
    },
    contactMsgButton: {
        width: 148,
        height: 42,
        borderWidth: 1,
        borderColor: "#DE8602",
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    contactMsgText: {
        fontSize: 15,
        color: "#DE8602",
        fontWeight: "600"
    },
    msgIconContainer: {
        height: 25,
        width: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: "#DE8602",
        borderRadius: 30,
        backgroundColor: "white",
    },
    subHeading: {
        color: "black",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 5,
        marginHorizontal: 10,
    },
    availablityView: {
        marginTop: 20,


    },
    availabilityHeader: {
        paddingHorizontal: 10,
        // borderBottomWidth: 1,
        // borderColor: "#DDD3C2",
    },
    headerMonth: {
        fontSize: 13,
        fontWeight: "700",
        color: "#858585",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: "#DDD3C2"
    },
    weekDayContainer: {
        height: 100, paddingTop: 0,
    },
    weekDay: {
        height: 51,
        width: 37,
        borderWidth: 1,
        borderColor: "#DDD3C2",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    day: {
        fontSize: 13,
        color: "#B9B9B9",
        fontWeight: "700",
    },
    date: {
        fontSize: 13,
        color: "#858585",
        fontWeight: "700",
    },
    schedule: {

        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#DDD3C2",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#DDD3C2",
        height: 41,
    },
    time: {
        color: "#474747",
        fontSize: 13,
        fontWeight: "400",
        marginHorizontal: 10,

    },
    methodView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderLeftWidth: 1,
        borderLeftColor: "#DDD3C2",
        padding: 10,
        height: 41,
        flex: 0.5,
    },
    appointmentButtonContainer: {
        height: 42,
        width: "95%",
        marginVertical: 25,

        borderRadius: 5,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    appointmentText: {
        fontSize: 15,
        color: "white",
        fontWeight: "700",
    },
    Heading: {
        color: "black",
        fontSize: 20,
        fontWeight: "600",
    },
    photoView: {
        height: 144,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 10,
        marginVertical: 10,
        margin: 1,
        paddingLeft: 10,
        paddingTop: 10,
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
        fontFamily: 'Plus Jakarta Sans',
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
        fontFamily: 'Plus Jakarta Sans',
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
        fontFamily: 'Plus Jakarta Sans',
    },
    ratingRectangle: {
        width: 217,
        margin: 10,
        borderRadius: 34,
    },
    CustomerReviewContainer: {
        width: "100%",
        margin: 1,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#DDD3C2",
        backgroundColor: "white",

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
        fontFamily: 'Plus Jakarta Sans',
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
        fontFamily: 'Plus Jakarta Sans',
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
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        zIndex: 3,
        bottom: 0,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
        paddingHorizontal: 18,
        paddingBottom: 3,
    },
    bottomText: {
        color: "white",
        fontSize: 27,
        fontWeight: "700",
        fontFamily: 'Plus Jakarta Sans',
    },
    chatNowButton: {
        height: 40,
        width: 118,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        position: "absolute",
        right: 18,
        borderRadius: 8,
    },
    chatText: {
        color: "#9900A8",
        fontSize: 17,
        fontWeight: "700",
        fontFamily: 'Plus Jakarta Sans',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ellipse: {
        width: 7,
        height: 7,
        marginHorizontal: 4,
    },
})
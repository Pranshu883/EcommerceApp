import { StyleSheet } from 'react-native';
import { colors } from './color';

export const externalStyles = StyleSheet.create({

    // common
    textinput_lable: {
        fontSize: 13,
        color: colors.black,
        fontWeight: "500",
    },
    background_textinput: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        fontSize: 18,
        color: colors.black,
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    flexView: {
        flex: 1
    },

    // common loading view
    loadingMainView: {
        flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center'
    },
    loadingSubView:{
        borderRadius: 10, backgroundColor: 'white', padding: 25
    },
    loadingText:{
        fontSize: 15, color: "black", fontWeight: "300"
    },


    // header design
    headerMainView: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 13,
        borderBottomColor: colors.borderColor,
        borderBottomWidth: 1
    },
    headerBackIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    headerText: {
        color: colors.black,
        fontSize: 20,
        marginLeft: 15
    },

    //login
    login_text: {
        color: colors.black,
        fontSize: 20
    },
    login_container: {

    },
    login_container_sub1: {
        width: "100%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    login_container_sub2: {
        // width: "100%",
        height: "70%",
        // alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: 100,
        backgroundColor: colors.themeColor
    },
    login_logo: {
        height: "50%",
        width: "50%",
        resizeMode: 'contain',
        margin: 30
    },
    login_phone_number: {
        // width: "70%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: "black",
        fontSize: 18,
        backgroundColor: "white",
        height: 50
    },
    row_orientation_center: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 5
    },
    commonButtonView: {
        backgroundColor: colors.black,
        borderRadius: 15,
        padding: 10,
        marginTop: 20
    },
    commonButtonText: {
        color: colors.white,
        fontSize: 17,
        textTransform: "uppercase",
        textAlign: 'center'
    },

    // otp screen
    otp_textinput: {
        // flex: 1,
        height: 50,
        width: 50,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: "hidden",
        marginLeft: 4,
        marginRight: 4,
        fontSize: 18,
        marginTop: 24,
        marginBottom: 24,
        borderColor: colors.borderColor,
        borderWidth: 1,
        fontSize: 20,
        color: "#231F20",
        fontWeight: "bold",

    },
    otp_textinput_active: {
        // flex: 1,
        height: 50,
        width: 50,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: "hidden",
        marginLeft: 4,
        marginRight: 4,
        fontSize: 18,
        marginTop: 24,
        marginBottom: 24,
        borderColor: colors.borderColor,
        borderWidth: 1,
        fontSize: 20,
        color: "#231F20",
        fontWeight: "bold",
    },
    otpMainView: {
        paddingTop: 40, paddingHorizontal: 20
    },
    otpSentToMobileText: {
        color: "green",
        fontSize: 17,
        textAlign: 'center'
    },
    otpTextinputMainView: {
        flexDirection: "row",
        alignSelf: "center"
    },
    otpSubmitButtonView: {
        backgroundColor: colors.themeColor,
        borderRadius: 15,
        padding: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.borderColor
    },
    otpSubmitButtonText: {
        color: colors.black,
        fontSize: 17,
        textTransform: "uppercase",
        textAlign: 'center'
    },
    resendOtpText: {
        marginTop: 30,
        color: "green",
        fontSize: 17,
        textAlign: 'left'
    },
    resendOtpTextLink: {
        marginTop: 30,
        color: "blue",
        fontSize: 17,
        textAlign: 'left',
        textDecorationLine: "underline"
    },

    // register
    register_container_sub2: {
        // width: "100%",
        height: "70%",
        // alignItems: "center",
        paddingHorizontal: 25,
        // backgroundColor: colors.themeColor
    },

    // Profile
    profile_image: {
        width: 120,
        height: 120,
        alignSelf: "center",
        marginTop: 30,
        borderRadius: 100
    },

    // astrologer details screen
    singleProductReviewActiveStar: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        tintColor: colors.reviewStar
    },
    singleProductReviewInactiveStar: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        tintColor: colors.borderColor
    },

    // Chat List
    chat_list_image: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 100
    },

});
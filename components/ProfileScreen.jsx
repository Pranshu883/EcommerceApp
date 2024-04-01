import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Button, Image, Text, ScrollView, FlatList, Animated, Pressable, Modal } from "react-native";
import { Card } from "react-native-paper";

const data = [
    { id: '1', image: require('../assets/Images/image1.jpeg') },
    { id: '2', image: require('../assets/Images/image2.jpeg') },
    { id: '3', image: require('../assets/Images/image3.png') },
    { id: '4', image: require('../assets/Images/image4.jpeg') },
    { id: '5', image: require('../assets/Images/image5.jpeg') },
    { id: '6', image: require('../assets/Images/image6.jpeg') },
    { id: '7', image: require('../assets/Images/image7.jpeg') },
    { id: '8', image: require('../assets/Images/image8.jpeg') },
    { id: '9', image: require('../assets/Images/image9.jpeg') },
];



const CardGrid = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImg, setSelectedImg ] = useState(null);

    const renderItem = ({ item }) => (
        
        <Card style={styles.card}>
            <Pressable onPress={()=>{console.log('img clicked'); console.log(item.image); setModalVisible(true)}}>
                <Image source={item.image} style={styles.cardImage} />
            </Pressable>
            
        </Card>
    );

    return (
        <View style={styles.flatListContainer}>
            
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={renderItem}
            /><Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    setSelectedImg(undefined);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Card style={styles.modalCard} >
                    {selectedImg && <Image source={selectedImg} style={styles.modalImg} />}</Card>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const ProfileScreen = ({ navigation }) => {

    const [header, setHeader] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;


    const [imgWrapperFlexDirection, setImgWrapperFlexDirection] = useState('column');
    const [profileTextAlign, setProfileTextAlign] = useState('center');

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const newFlexDirection = offsetY > 100 ? 'row' : 'column';
        setImgWrapperFlexDirection(newFlexDirection);
        const newTextAlign = offsetY > 100 ? 'flex-start' : 'center';
        setProfileTextAlign(newTextAlign);
    };




    return (<>

        <View style={styles.topContainer}>
            <Animated.View
                style={[styles.profileWrapper, { flexDirection: imgWrapperFlexDirection }]}>

                <View style={styles.imgView}>
                    <Image
                        style={styles.pfpImg}
                        source={require('../assets/Images/pfp.jpeg')}
                    />
                </View>
                <Animated.View style={[{ alignItems: profileTextAlign }]}>
                    <Text style={styles.text}>
                        PRANSHU AMIN
                    </Text>
                    <Text style={styles.text}>
                        Role: Developer
                    </Text>
                    <Text style={styles.text}>
                        Join Date: 12/2/24
                    </Text>
                </Animated.View>
            </Animated.View>
        </View>
        <ScrollView style={styles.container} onScroll={handleScroll} scrollEventThrottle={16} >
            <View style={styles.bottomContainer} >
                <Text style={[styles.text,]}>Post</Text>
                <CardGrid />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => navigation.goBack()}
                        title="Go Back"
                        color="maroon"
                    />
                </View>
            </View>
        </ScrollView></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        color: 'black',
        textAlign: 'auto',
        marginBottom: 8,
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 300,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginBottom: 16,
    },
    profileWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'beige',
        width: 300,
        height: 300,
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        height: 110,
        width: 110,
        borderRadius: 60,
        margin: 16,
    },
    pfpImg: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    bottomContainer: {
        flex: 1,
        borderTopWidth: 2,
        padding: 8,
    },
    flatListContainer: {
        flex: 1,
        padding: 16,
    },
    card: {
        flex: 1,
        margin: 4,
        borderRadius: 8,
        borderWidth: 2,
        overflow: 'hidden',
    },
    cardImage: {
        height: 200,
        width: '100%',
        resizeMode: 'cover',
    },
    buttonContainer: {
        marginTop: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        color: 'black',
        marginBottom: 15,
        textAlign: 'center',
      },
      modalCard: {
        margin: 2,
      },
    modalImg: {
        height: 500,
        width: 400,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
});

export default ProfileScreen;

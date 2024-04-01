import React from "react";
import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const BookPoojaScreen=({navigation})=>{


    const data = [
        {id: "1", date:"08 March 2024", image: require("../assets/EcomImages/dress2.jpeg")}, 
        {id: "2", date:"09 March 2024", image: require("../assets/EcomImages/dress2.jpeg")},
    ];

    const renderItem = ({item})=>{
        const { day, month } = extractDayAndMonth(item.date);
        
        return(
            <View style={styles.itemContainer}>
                <View style={styles.dateBadgeView}>
                    <View style={styles.dayContainer}>
                        <Text style={styles.dayText}>{day} </Text>
                    </View>
                    <View style={styles.monthContainer}>
                        <Text style={styles.dayText}>{month} </Text>
                    </View>
                    <View style={styles.verticalDivider} />
                </View>
                <TouchableOpacity style={styles.postView} onPress={()=>navigation.navigate("PoojaDetail") }>
                        <Image source={item.image} style={styles.postImage}  />
                        <View style={styles.postInfoView}>
                            <Text style={styles.postInfoText}> {item.date} </Text>
                            <Text style={styles.postInfoText}> Book Now <Icon name="arrow-right" size={18} color="black" /> </Text>
                        </View>
                </TouchableOpacity>
            </View>
        )
    }
    const extractDayAndMonth = (dateString) => {
            const [day, month] = dateString.split(" ");
            return { day, month };
          };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTilteView}>
                    <TouchableOpacity onPress={() => {}}>
                        <Icon name="view-headline" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Book a Pooja </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                        <Icon name="magnify" size={26} color="black" />
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.body}>
                <FlatList
                    data = {data}
                    keyExtractor={data.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                />
            </SafeAreaView>
        </SafeAreaView>
    );

};
export default BookPoojaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        marginBottom: 60,
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
        marginHorizontal: 30,
    },
    body:{
        paddingVertical: 5,
        marginHorizontal: 2,
    },
    itemContainer:{
        
        flexDirection: 'row',
        height: 310,
        width: "98%",
        marginVertical: 10, 
        
    },
    dateBadgeView:{
      
        width: '20%',
        height: "100%",
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 5, 
    },
   
    dayContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: 10,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        
    },
    dayText:{
        color:"black",
        fontSize: 16,
    },
    verticalDivider:{
        width: 1,
        height: "75%",
        backgroundColor: '#666',
        marginTop: 12,
        marginHorizontal: 10,
    },
    postView:{
        width: '80%',
        height: "100%",
        marginBottom: 10,
        borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 6,
            zIndex: 2,
    },
   
    postImage:{
        width: "100%",
        height: "88%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        resizeMode: 'stretch',

    },
    postInfoView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingVertical: 10,
        backgroundColor: "white",
        paddingHorizontal: 5,
    },
    postInfoText:{
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    }
})


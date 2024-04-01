import React, { useState , useEffect} from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";
import CallLogs from "./CallLogs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



const Tab = createMaterialTopTabNavigator();

const Contacts = () => {

    const [image, setImage] = useState('');
    const [select, onSelect] = useState(false);


    useEffect(() => {
        if (select) {
            openImagePicker();
        }
        else {
            setImage(require('../assets/Images/Placeholder.jpeg'));
        }
    }, [select]);


    const openImagePicker = () => {
        launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error(response.error);
            } else {
                setImage({ uri: response.assets[0].uri });

            }
        });
    };



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'black' }}>
                Contacts
            </Text>
            {/* <Image
                source={require('../assets/Images/Placeholder.jpeg')}
                style={{ width: 200, height: 200 }}
            /> */}

            {select ? 
            <Button
                mode="contained-tonal"
                onPress={()=>{onSelect(false)}}>
                Delete
            </Button> :
            <Button
                mode="contained-tonal"
                onPress={()=>{onSelect(true)}}>
                Select
            </Button>   }
            {image && <Image source={image} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default Contacts;
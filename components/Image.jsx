import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { openCropper } from "react-native-image-crop-picker";

const Image = () => {

    const [image, setImage] = useState('');

    const openImagePicker = () => {
        launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error(response.error);
            } else {

                cropper(response.assets[0].uri);
            }
        });
    };

    const cropper = (uri) => {

        openCropper({
            path: uri,
            width: 300,
            height: 300,
        }).then((croppedImage) => {
            console.log("croppedImage.path => ", croppedImage.path)
            setImage({ uri: croppedImage.path });
        }).catch((error) => {
            console.log('ImageCropper Error: ', error);
        });

    }

    return (
        <View>
           

            {/* {image && <Image source={image} style={{ width: 300, height: 300 }} />} */}
            {image != "" ? <Image source={{ uri: image }} style={{ width: 300, height: 300 }} /> : null}

            <Button
                mode="contained-tonal"
                onPress={openImagePicker}>
                Select
            </Button>
        </View>
    )
}

export default Image;
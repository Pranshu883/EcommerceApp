import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, StyleSheet, View, Button, Easing } from "react-native";

const AniMove = () => {
    const startValue = useRef(new Animated.Value(0)).current;
    const rotateBox = useRef(new Animated.Value(0)).current;
    const [isRotating, setIsRotating] = useState(false);

    const boxMove = () => {
        Animated.timing(startValue, {
            toValue: 150,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };

    const boxMoveBack = () => {
        Animated.timing(startValue, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };

    const boxRotate = () => {
        if (isRotating) {
            // If already rotating, stop the rotation
            rotateBox.setValue(0);
        } else {
            // If not rotating, start the rotation
            Animated.loop(
                Animated.timing(rotateBox, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        }

        // Toggle the rotation state
        setIsRotating(!isRotating);
    };

    const spin = rotateBox.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.square,
                        {
                            transform: [
                                {
                                    translateX: startValue,
                                },
                            ],
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.square,
                        {
                            transform: [
                                {
                                    translateY: startValue,
                                },
                            ],
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.square,
                        { backgroundColor: 'red' },
                        {
                            transform: [
                                {
                                    rotate: spin,
                                },
                                {
                                    translateX: startValue,
                                },
                                {
                                    translateY: startValue, 
                                },
                                
                            ],
                        },
                    ]}
                />
            </View>
            <View style={styles.buttonRow}>
                <Button title="Move" onPress={boxMove} />
                <Button title="Move back " onPress={boxMoveBack} />
                <Button title='rotation' onPress={boxRotate} />
            </View>
        </SafeAreaView>
    );
};

export default AniMove;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    square: {
        margin: 10,
        height: 70,
        width: 70,
        backgroundColor: "green",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
    },
});

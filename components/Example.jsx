import React, { useState, useCallback, useEffect } from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-picker/picker';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from "react-native";

const Example = () => {
    const [date, setDate] = useState(new Date());
    const [fileResponse, setFileResponse] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [htmlContent, setHtmlContent] = useState();
    const { width } = useWindowDimensions();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            dateFormat: 'day month year',
            display: 'spinner',
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            });
            setFileResponse([...fileResponse, response]);
        } catch (err) {
            console.warn(err);
        }
    }, [fileResponse]);

    // useEffect(()=>{
    //     const fetchContent = async()=>{
    //         try{
    //             const response = await fetch('../assets/html/example.html')
    //             const content = await response.text();
    //                 setHtmlContent(content);
    //         }
    //         catch {
    //             console.error('Error fetching HTML content:', error);
    //         }
    //     };
    //     fetchContent();
    // },[]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Button onPress={showDatepicker} title="Select Date" />
                <Button onPress={showTimepicker} title="Select Time" />
            </View>
            <Text style={styles.dateText}>Selected: {formatDate(date)}//{date.toLocaleTimeString('en-US',{hour12:false} )} </Text>

            <View style={styles.documentPickerContainer}>
                <Text style={styles.title}>Document Picker Example</Text>
                {fileResponse.map((file, index) => (
                    <Text
                        key={index.toString()}
                        style={styles.fileText}
                        numberOfLines={1}
                        ellipsizeMode={'middle'}>
                        Selected File: {file?.uri}
                    </Text>
                ))}
                <Button title="Select Document" onPress={handleDocumentSelection} />
            </View>

            <View style={styles.pickerContainer}>
                <Text style={styles.title}>React Native Picker Example</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) => setSelectedLanguage(itemValue)}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>

            <View style={styles.htmlContainer}>
                <Text style={styles.title}>Render HTML Example</Text>
                <RenderHtml
                    contentWidth={width}
                    source={source}
                    tagsStyles={mixedStyle}
                />
            </View>
        </ScrollView>
    );
};

const source = {
    html: `
    <html>
    <head>
      <title>Div Align Attribbute</title>
    </head>
    <body>
      <p style="color: black;">asdnaos dijspqwdjpqewdjkpqwdk</p>
      <div align="left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
      <div align="right">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
      <div align="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
      <div align="justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
    </body>
  </html>`
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
    },
    documentPickerContainer: {
        marginTop: 16,
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
    },
    fileText: {
        fontSize: 14,
        marginBottom: 4,
        color: '#555555',
    },
    pickerContainer: {
        marginTop: 16,
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
    },
    picker: {
        color: 'black',
        backgroundColor: 'lightblue',
    },
    htmlContainer: {
        marginTop: 16,
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
    },
});

const mixedStyle = {
    body: {
        whiteSpace: 'normal',
        color: '#555555',
    },
    p: {
        color: '#333333',
    },
};

export default Example;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { GradientButton, ProfilePic, WalletButton, getRegularFont1 } from '../common/utils';
import { longPressHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';

const test = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  // const dates = generateDates();
  const [dates, setDates] = useState(generateDates());
  const months = [{ monthNumber: 0, monthName: "Jan" },
  { monthNumber: 1, monthName: "Feb" },
  { monthNumber: 2, monthName: "Mar" },
  { monthNumber: 3, monthName: "Apr" },
  { monthNumber: 4, monthName: "May" },
  { monthNumber: 5, monthName: "Jun" },
  { monthNumber: 6, monthName: "Jul" },
  { monthNumber: 7, monthName: "Aug" },
  { monthNumber: 8, monthName: "Sep" },
  { monthNumber: 9, monthName: "Oct" },
  { monthNumber: 10, monthName: "Nov" },
  { monthNumber: 11, monthName: "Dec" }]

  // Function to generate list of dates
  function generateDates() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const dates = [];
    for (let i = 1; i <= numberOfDays; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  }

  function generateDates22(year, month) {
    dates.length = 0;
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      dates.push(new Date(year, month, i));
    }
    setDates(dates);
  }

  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Do something with the selected date
  };



  return (
    <>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {months.map((date) => (
          <TouchableOpacity
            key={date.monthNumber}
            style={[styles.dateItem, selectedMonth === date.monthName && styles.selectedDateItem]}
            onPress={() => {
              setSelectedMonth(date.monthName)
              generateDates22(2024,date.monthNumber)
            }}
          >
            <Text style={styles.dateText}>{date.monthName}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date.toISOString()}
            style={[styles.dateItem, selectedDate.getDate() === date.getDate() && styles.selectedDateItem]}
            onPress={() => handleDateSelect(date)}
          >
            <Text style={styles.dateText}>{date.getDate()}/{date.getMonth() + 1}</Text>
          </TouchableOpacity>
        ))}
        
      </View>
      
    </ScrollView>
    <View style={{backgroundColor:"black", width: "100%", height:  300, alignItems: 'center', justifyContent: 'center'}} >
        <GradientButton label={"Register"} height={25} width={84}
          labelStyle={{
            color: 'purple',
            fontSize: 10,
            fontWeight: "bold",
          }}
          mode="outline"
          borderRadius={5}
          onPress={() => { Alert.alert("button Pressed ") }}
        />
        <ProfilePic source={"https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.webp?b=1&s=170667a&w=0&k=20&c=nksxkI9jIKMXW-pw47aKqrPHM3ahY1XgOApN3YiOk1g="}
          isNew={true}
          height={100} 
          width={100}
          />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  dateItem: {
    height:"20%",
    padding: 10,
    marginRight: 10,
    borderRadius: 50, // to make it round
    backgroundColor: '#ccc', // default background color
  },
  selectedDateItem: {
    backgroundColor: 'blue', // selected background color
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
export default test;

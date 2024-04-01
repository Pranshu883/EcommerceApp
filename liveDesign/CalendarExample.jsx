import { useState } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
import moment, { weekdays, weekdaysMin } from 'moment';



const CalendarExample = () => {
    const [selected, setSelected] = useState('');

    let datesWhitelist = [{
        start: moment(),

    }];
    let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled

    return (
        <View  >
            <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white',backgroundColor:"#9900A8" }}
                    style={{height: 100, paddingTop: 20, paddingBottom: 10,borderWidth: 1, overflow:"visible",}}
                    calendarHeaderStyle={{color: 'black',}}
                    calendarColor={'white'}
                    dateNumberStyle={{color: '#B9B9B9', fontSize: 12, fontWeight: "700" }}
                    dateNameStyle={{color: '#B9B9B9', fontSize: 12, fontWeight: "700" }}
                    highlightDateNumberStyle={{color: 'white',fontSize: 12, fontWeight: "700"}}
                    highlightDateNameStyle={{color: 'white',fontSize: 12, fontWeight: "700", }}
                    highlightDateContainerStyle	={{backgroundColor:"#9900A8", borderWidth: 0}}
                    dayContainerStyle={{backgroundColor: "white", height: 51,width: 37,borderColor: "#DDD3C2", borderWidth:1,}}
                    iconContainer={{flex: 0.1,  }}
                    selectedDate={moment()}
                    scrollToOnSetSelectedDate= {true}
                    showMonth={false}
                />
        </View>
    )   
};

export default CalendarExample;
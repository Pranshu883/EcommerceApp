import React from "react";
import Contacts from "./Contacts";
import CallLogs from "./CallLogs";
import Image from "./Image";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Example from "./Example";

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
    return (
        <Tab.Navigator screenOptions={{HeaderShown:false}}>
            <Tab.Screen name="Call Logs" component={CallLogs} />
            <Tab.Screen name="contacts" component={Contacts} />
            <Tab.Screen name="Images" component={Image} />
            <Tab.Screen name="Examples" component={Example} />
        </Tab.Navigator>
    );
};

export default TopTab;
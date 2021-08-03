import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Home } from "../screens";
import {
    createBottomTabNavigator,
    BottomTabBar
} from "@react-navigation/bottom-tabs";
import { icons } from "../contants";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions = {{
                showLabel: false
            }}
        >
            <Tab.Screen
                name = "Home"
                component = {Home}
                option = {{
                    tabBarIcon: ({focused}) => {
                        <Image
                            source = { icons.home }
                            resizeMode = "contain"
                            style = {styles.image}
                        />
                    }
                }}
            >

            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    }
});

export default Tabs;
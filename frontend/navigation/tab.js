import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { 
    Home,
    User
} from "../screens";
import {
    createBottomTabNavigator,
    BottomTabBar
} from "@react-navigation/bottom-tabs";
import {
    homeIcon,
    searchIcon,
    likeIcon,
    userIcon
} from "../contants";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator

            style = {styles.tabBottom}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName  = homeIcon;
                    } else if (route.name === 'Search') {
                        iconName = searchIcon;
                    } else if (route.name === 'Like') {
                        iconName = likeIcon;
                    } else if (route.name === 'User') {
                        iconName = userIcon;
                    }
                    return <Image source = { iconName } style = {styles.tabIcon} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name = "Home"
                component = {Home}
                options={{header: () => null}}
            >
            </Tab.Screen>
            <Tab.Screen
                name = "Search"
                component = {Home}
                options={{header: () => null}}
            >
            </Tab.Screen>
            <Tab.Screen
                name = "Like"
                component = {Home}
                options={{header: () => null}}
            >
            </Tab.Screen>
            <Tab.Screen
                name = "User"
                component = {User}
                options={{header: () => null}}
            >
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabIcon: {
        width: 30,
        height: 30
    },
    tabBottom: {
        backgroundColor: "transparent",
        borderTopWidth: 0,
        elevation: 0
    }
});

export default Tabs;
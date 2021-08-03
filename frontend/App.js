import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home, Restaurant, OrderDelivery} from "./screens";
import Tabs from "./navigation/tab.js";

const Stack = createNativeStackNavigator();

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name = "Home" component = {Tabs}></Stack.Screen>
                <Stack.Screen name = "Restaurent" component = {Restaurant}></Stack.Screen>
                <Stack.Screen name = "OrderDelivery" component = {OrderDelivery}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

});

export default App;

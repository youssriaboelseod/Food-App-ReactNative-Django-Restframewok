import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Home, 
    Product, 
    OrderDelivery,
    Register,
    User
} from "./screens";
import Tabs from "./navigation/tab.js";
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name = "Home" 
                    component = { Tabs } 
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen 
                    name = "Product" 
                    component = {Product} 
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen 
                    name = "OrderDelivery" 
                    component = {OrderDelivery} 
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen
                    name = "Register" 
                    component = {Register} 
                    options={{header: () => null}}
                ></Stack.Screen>
                <Stack.Screen
                    name = "Signin" 
                    component = {User} 
                    options={{header: () => null}}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({

});

export default App;

import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

const axios = require('axios');

const displayAlert = (message) => {
    Alert.alert(
        "Notification",
        message,
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ])
}

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleRegisterPressed = () => {
        console.log('Pressed');

    }

    handleLoginPressed = () => {
        console.log('Login pressed!')
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                <View style = {styles.titleWrapper}>
                    <Text style = {styles.loginTitle}>Sign in to app</Text>
                </View>
                <View style = {styles.loginWrapper}>
                    <TextInput
                        style = {styles.input}
                        placeholder = 'Username'
                        onChangeText = {(text) => {
                            this.setState({
                                username: text
                            });
                        }}
                        value = {this.state.username}
                    ></TextInput>
                    <TextInput
                        style = {styles.input}
                        secureTextEntry={true}
                        placeholder = 'Password'
                        onChangeText = {(text) => {
                            this.setState({
                                password: text
                            });
                        }}
                        value = {this.state.password}
                    ></TextInput>
                    <TouchableOpacity 
                        style = {styles.buttonLogin}
                        onPress = {() => {
                            this.handleLoginPressed()
                        }}
                    >
                        <Text style = {{fontSize: 17}}>Sign in</Text>
                    </TouchableOpacity>
                    <View style = {styles.registerWrapper}>
                        <Text style = {styles.registerText}>Don't have any accounts ? </Text>
                        <TouchableOpacity
                            onPress = {() => {this.handleRegisterPressed()}}
                        >
                            <Text style = {styles.registerText}>Register an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f5',
        justifyContent: 'center'
    },
    titleWrapper: {
        marginBottom: 20,
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    loginWrapper: {
        height: 300,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        width: 250,
        height: 50,
        margin: 10,
        borderRadius: 5,
        fontSize: 17
    },
    buttonLogin: {
        backgroundColor: '#e0e0eb',
        width: 250,
        height: 50,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerWrapper: {
        flexDirection: 'row',
        marginTop: 20
    },
    registerText: {
        fontSize: 15
    }
});

export default User;
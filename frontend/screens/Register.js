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

import  {
    ipAddress,
} from '../contants';

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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            firstname: ''
        }
    }

    handleSignInPressed = () => {
        this.props.navigation.goBack();
    }

    handleRegisterPressed = () =>{
        axios.post(`${ipAddress}/api/register/`, {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.firstname
        })
        .then((response) => {
            displayAlert('Create account successfully');
            this.props.navigation.goBack();
        })
        .catch((error) => {
            displayAlert(error);
        })
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                <View style = {styles.titleWrapper}>
                    <Text style = {styles.loginTitle}>Sign up to Food app</Text>
                </View>
                <View style = {styles.loginWrapper}>
                    <TextInput
                        style = {styles.input}
                        placeholder = 'Email'
                        onChangeText = {(text) => {
                            this.setState({
                                email: text
                            });
                        }}
                        value = {this.state.email}
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
                        placeholder = 'First-name'
                        onChangeText = {(text) => {
                            this.setState({
                                firstname: text
                            });
                        }}
                        value = {this.state.firstname}
                    ></TextInput>
                    <TouchableOpacity 
                        style = {styles.buttonLogin}
                        onPress = {() => {
                            this.handleRegisterPressed()
                        }}
                    >
                        <Text style = {{fontSize: 17}}>Sign up</Text>
                    </TouchableOpacity>
                    <View style = {styles.registerWrapper}>
                        <Text style = {styles.registerText}>Already have any accounts ? </Text>
                        <TouchableOpacity
                            onPress = {() => {this.handleSignInPressed()}}
                        >
                            <Text style = {styles.registerText}>Sign in</Text>
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
        top: 100
        // justifyContent: 'center'
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
        backgroundColor: '#ff7733',
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

export default Register;
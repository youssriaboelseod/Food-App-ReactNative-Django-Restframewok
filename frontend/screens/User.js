import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import {
    userIcon,
    backIconLight,
    settingIcon,
    ipAddress
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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailLogin: '',
            isSigned: false
        }
    }

    handleRegisterPressed = () => {
        this.props.navigation.navigate('Register', {

        });
    }

    async middleWare () {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/middleware/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    isSigned: true,
                    emailLogin: response.data
                });
            })
            .catch((error) => {
                console.log('Autholorize!')
            });
    }

    static getDerivedStateFromProps(props, state) {
        if(props.route.params != null) {
            if(props.route.params.isSignedIn === false) {
                state.isSigned = false
            }
            props.route.params = null;
        }
        return true;
    }

    componentDidMount() {
        console.log('Component did Mount')
        this.middleWare();
    }

    handleLoginPressed = () => {
        axios.post(`${ipAddress}/api/sign-in/`, {
            email: this.state.email,
            password: this.state.password
        })
        .then(async (response) => {
            console.log(response.data.access_token)
            await AsyncStorage.setItem('token', response.data.access_token);
            this.setState({
                email: '',
                password: '',
                emailLogin: response.data.email,
                isSigned: true
            })
            console.log(this.state.emailLogin);
            this.props.navigation.navigate('Home', {

            });
        })
        .catch((error) => {
            displayAlert(error);
        })
    }

    async handleSignOuPressed() {
        await AsyncStorage.setItem('token', '');
        this.setState({
            isSigned: false
        });
    }

    renderSignedView() {
        return(
            <SafeAreaView style = {styles.containerSignIn}>
                <View style = {styles.titleWrapper}>
                    <Text style = {styles.loginTitle}>Sign in to Food App</Text>
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
                    <TouchableOpacity 
                        style = {styles.buttonLogin}
                        onPress = {() => {
                            this.handleLoginPressed()
                        }}
                    >
                        <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Sign in</Text>
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

    renderHeader() {
        return(
            <View style = {styles.headerWrapper}>
                <View style = {styles.avatarWrapper}>
                    <Image
                        style = {styles.avatar}
                        source = {userIcon}
                    ></Image>
                </View>
                <Text style = {styles.loginTitle}>{this.state.emailLogin}</Text>
                <View>
                    <TouchableOpacity 
                        style = {styles.settingWrapper}
                        onPress = {() => {
                            this.props.navigation.navigate('Setting', {
                                
                            })
                        }}
                    >
                        <Image
                            style = {styles.settingIcon}
                            source = {settingIcon}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderUserView() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
            </SafeAreaView>
        );
        
    }

    renderMainView() {
        if(this.state.isSigned) {
            return(
                this.renderUserView()
            );
        } else {
            return(
                this.renderSignedView()
            );
        }
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderMainView()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5ef',
        // justifyContent: 'center'
    },
    containerSignIn: {
        flex: 1,
        backgroundColor: '#f5f5ef',
        justifyContent: 'center'
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ff7733',
        height: 100
    },  
    nameWrapper: {
        left: 155,
        fontSize: 25,
        color: '#FFF'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    editText: {
        fontSize: 18,
        color: '#FFF'
    },
    editButtomWrapper: {
        left: 180
    },
    titleWrapper: {
        marginBottom: 20,
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 22,
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
    },
    avatarWrapper: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 10
    },
    settingIcon: {
        width: 22,
        height: 22
    },
    settingWrapper: {
        marginLeft: 10
    }
});

export default User;
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {  Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated,
    ImageStore,
    Alert,
    FlatList,
    TextInput
} from "react-native";

import {
    backIcon,
    miXao,
    backIconLight,
    storeIcon,
    heartIcon1,
    ipAddress
} from '../contants';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.setState = {
            password: '',
            confirmPassword: ''
        }
    }

    renderHeader() {
        return(
            <View style = {styles.headerWrapper}>
                <TouchableOpacity
                    style = {styles.iconBackWrapper}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image
                        source = {backIcon}
                        resizeMode = 'contain'
                        style = {styles.backIcon}
                    ></Image>
                </TouchableOpacity>
                <View>
                    <Text style = {styles.nameWrapper}>Password</Text>
                </View>
            </View>
        );
    }

    renderMainView() {
        return(
            <View style = {styles.container}> 
                <View style = {styles.titleWrapper}>
                    <Text style = {styles.textStyle}>Type in New Password</Text>
                </View>
                <View style = {styles.changePasswordWrapper}>
                    <TextInput
                        placeholder = 'New password'
                        style = {styles.textInput}
                        onChangeText = {(text) => {
                            this.setState({
                                password: text
                            });
                        }}
                    ></TextInput>
                </View>
                <View style = {styles.changePasswordWrapper}>
                    <TextInput
                        placeholder = 'Confirm password'
                        style = {styles.textInput}
                        onChangeText = {(text) => {
                            this.setState({
                                confirmPassword: text
                            });
                        }}
                    ></TextInput>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView>
                {this.renderHeader()}
                {this.renderMainView()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: 140
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 65
    },  
    nameWrapper: {
        left: 130,
        fontSize: 22,
        color: '#000'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    titleWrapper: {
        height: 40,
        paddingTop: 7,
        paddingLeft: 7
    },
    textStyle: {
        fontSize: 16
    },
    changePasswordWrapper: {
        height: 50,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        justifyContent: 'center',
    },
    textInput: {
        fontSize: 16,
        paddingLeft: 7
    }
});

export default ChangePassword;
import axios from "axios";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
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
    FlatList
} from "react-native";

import {
    backIcon,
    miXao,
    backIconLight,
    storeIcon,
    heartIcon1,
    ipAddress
} from '../contants';

class Setting extends Component {
    constructor(props) {
        super(props);
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
                <Text style = {styles.nameWrapper}>Settings</Text>
            </View>
        );
    }

    renderAccountSetting() {
        return(
            <View style = {styles.accountSettingWrapper}>
                <View
                    style = {{height: 40, justifyContent: 'center', paddingLeft: 7}}
                >
                    <Text style = {styles.settingText}>Account Settings</Text>
                </View>
                <View style = {styles.accountSettingDetailWrapper}>
                    <TouchableOpacity
                        onPress = {() => {
                            this.props.navigation.navigate('Information', {

                            });
                        }}
                    >
                        <Text style = {styles.settingText}>Information and Contact</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.accountSettingDetailWrapper}>
                    <TouchableOpacity
                        onPress = {() => {
                            this.props.navigation.navigate('ChangePassword', {

                            });
                        }}
                    >
                        <Text style = {styles.settingText}>Password</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.accountSettingDetailWrapper}>
                    <TouchableOpacity
                        onPress = {async () => {
                            console.log('Press')
                            await AsyncStorage.setItem('token', '');
                            const token = await AsyncStorage.getItem('token');
                            this.props.navigation.navigate('User', {
                                isSignedIn: false
                            })
                        }}
                    >
                        <Text style = {styles.settingText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderAccountSetting()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 65
    },  
    nameWrapper: {
        left: 140,
        fontSize: 22,
        color: '#000'
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
    accountSettingWrapper: {
        flexDirection: 'column',
        width: '100%',
        height: 140
    },
    settingText: {
        fontSize: 16
    },
    accountSettingDetailWrapper: {
        height: 50,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        justifyContent: 'center',
        paddingLeft: 7
    }
})

export default Setting;
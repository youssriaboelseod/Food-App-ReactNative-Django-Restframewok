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
    FlatList
} from "react-native";

import {
    backIcon,
    miXao,
    backIconLight,
    storeIcon,
    heartIcon1,
    userIcon,
    rightArrowIcon,
    ipAddress
} from '../contants';

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

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            first_name: ''
        }
    }

    async getUserInformation() {
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/user/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            this.setState({
                username: response.data['user_name'],
                email: response.data['email'],
                first_name: response.data['first_name']
            });
        })
        .catch((erorr) => {
            displayAlert('We have some problems. Please try again!');
        });
    }

    componentDidMount() {
        this.getUserInformation();
    }

    handleChangeFirstName() {
        console.log('handleChangeFirstName');
    }

    handleChangeEmail() {
        console.log('handleChangeEmail');
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
                    <Text style = {styles.nameWrapper}>User Informations</Text>
                </View>
            </View>
        );
    }

    renderMainView() {
        return(
            <View>
                <View style = {styles.firstWrapper}>
                    <View style = {styles.avtWrapper}>
                        <Image
                            source = {userIcon}
                            style = {styles.avt}
                        ></Image>
                        <TouchableOpacity style = {styles.btnChangeAvt}>
                            <Text style = {{fontSize: 16, color: "#ff7733"}}>Change avatar</Text>
                            <Image
                                style = {{height: 20, width: 20, marginLeft: 15}}
                                source = {rightArrowIcon}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.settingDetailWrapper}>
                        <Text style = {styles.textStyle}>Username</Text>
                        <Text style = {{fontSize: 16, marginRight: 35}}>...username</Text>
                    </View>
                </View>
                <View style = {styles.secondWrapper}>
                    <View style = {styles.settingDetailWrapper}>
                        <Text style = {styles.textStyle}>Name</Text>
                        <TouchableOpacity  
                            style = {styles.btnChangeAvt}
                            onPress = {() => {
                                this.handleChangeFirstName();
                            }}    
                        >
                            <Text style = {styles.textStyle}>...FirstName</Text>
                            <Image
                                style = {{height: 20, width: 20, marginLeft: 15}}
                                source = {rightArrowIcon}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.settingDetailWrapper}>
                        <Text style = {styles.textStyle}>Email</Text>
                        <TouchableOpacity 
                            style = {styles.btnChangeAvt}
                            onPress = {() => {
                                this.handleChangeEmail();
                            }}  
                        >
                            <Text style = {styles.textStyle}>...Email</Text>
                            <Image
                                style = {{height: 20, width: 20, marginLeft: 15}}
                                source = {rightArrowIcon}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderMainView()}
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
        left: 100,
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
    avtWrapper: {
        height: 70,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        paddingLeft: 7,
        paddingRight: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    settingDetailWrapper: {
        height: 50,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 7,
        paddingRight: 7,
        flexDirection: "row"
    },
    btnChangeAvt: {
        flexDirection: "row",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 16
    },
    firstWrapper: {
        marginTop: 10,
        marginBottom: 10
    }
});

export default Information;
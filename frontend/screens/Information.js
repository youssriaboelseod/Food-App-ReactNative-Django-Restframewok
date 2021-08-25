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
    ipAddress
} from '../contants';

class Information extends Component {
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
                <View>
                    <Text style = {styles.nameWrapper}>Informations</Text>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
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
        left: 120,
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
});

export default Information;
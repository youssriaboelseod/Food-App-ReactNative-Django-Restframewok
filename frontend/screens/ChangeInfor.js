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

class ChangeInfor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <SafeAreaView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});

export default ChangeInfor;
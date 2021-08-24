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

// import {

// } from '../contants';

class Setting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <Text>Setting</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

})

export default Setting;
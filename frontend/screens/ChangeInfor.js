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
        this.state = {
            changeStatus: 1
        }
    }

    getStatusChange() {
        this.setState({
            changeStatus: this.props.route.params.status
        });
    }

    renderHeader() {
        let titleHeader = 'Change email';
        if(this.state.changeStatus === 1) {
            titleHeader = 'Change first_name';
        }
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
                <Text style = {styles.nameWrapper}>{titleHeader}</Text>
            </View>
        );
    }

    componentDidMount() {
        this.getStatusChange();
    }

    render() {
        return(
            <SafeAreaView>
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
        left: 140,
        fontSize: 22,
        color: '#000'
    },
    backIcon: {
        width: 25,
        height: 25
    },
});

export default ChangeInfor;
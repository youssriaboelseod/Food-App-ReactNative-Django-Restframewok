import React, {  Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    SafeAreaView
} from "react-native";

// import CheckBox from '@react-native-community/checkbox';
import {
    backIcon,
    miXao,
    backIconLight,
    ipAddress
} from '../contants';

class Favorite extends Component {
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
                        source = {backIconLight}
                        resizeMode = 'contain'
                        style = {styles.backIcon}
                    ></Image>
                </TouchableOpacity>
                <Text style = {styles.nameWrapper}>Like</Text>
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
        flex: 1,
        backgroundColor: '#F0F0F0'
    },  
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff7733',
        height: 65
    },  
    nameWrapper: {
        left: 160,
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
});

export default Favorite
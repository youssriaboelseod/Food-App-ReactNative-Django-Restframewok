import React, {  Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated
} from "react-native";
import {
    backIcon
} from '../contants';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item
        }
    }

    renderHeader() {
        return(
            <View style = {{flexDirection: 'row'}}>
                <TouchableOpacity
                    style = {styles.iconBackWrapper}
                >
                    <Image
                        source = {backIcon}
                        resizeMode = 'contain'
                        style = {styles.backIcon}
                    ></Image>
                </TouchableOpacity>
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
        backgroundColor: '#e6e6e6'
    },
    iconBackWrapper: {
        width: 50,
        paddingLeft: 20,
        marginTop: 20,
        justifyContent: 'center'
    },
    backIcon: {
        width: 30,
        height: 30
    }
});

export default Product;
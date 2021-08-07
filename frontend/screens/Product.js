import React, {  Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated,
    ImageStore
} from "react-native";
import {
    backIcon,
    miXao
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
                    onPress={() => this.props.navigation.goBack()}
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

    renderFoodInfor() {
        return(
            <View>
                <View style = {styles.foodInforWrapper}>
                    <Image 
                        style = {styles.foodImage}
                        source = {miXao}

                    ></Image>
                </View>
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderFoodInfor()}
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
        paddingLeft: 10,
        marginTop: 20,
        justifyContent: 'center'
    },
    backIcon: {
        width: 30,
        height: 30
    },
    foodInforWrapper: {
        marginTop: 10,
        alignItems: 'center',
        height: 100
    },
    foodImage: {
    }
});

export default Product;
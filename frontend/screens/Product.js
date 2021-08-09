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
            item: this.props.route.params.item,
            quantity: 1
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
                    <View style = {styles.quantityWrapper}>
                        <TouchableOpacity style = {styles.decreaseButton}>
                            <Text style = {styles.quantityText}>-</Text>
                        </TouchableOpacity>
                        <View style = {styles.quantityNumber}>
                            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>1</Text>
                        </View>
                        <TouchableOpacity style = {styles.increaseButton}>
                            <Text style = {styles.quantityText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.fontNameWrapper}>
                        <Text style = {styles.foodName}>Bún bò - 25 min</Text>
                    </View>
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
        justifyContent: 'center',
        height: 30
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
        height: 240
    },
    quantityWrapper: {
        position: 'absolute',
        bottom: - 165,
        height: 50,
        width: 150,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    decreaseButton: {
        width: 50,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    quantityText: {
        fontSize: 25,
    },
    quantityNumber: {
        width: 50,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    increaseButton: {
        width: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },
    fontNameWrapper: {
        alignItems: 'center',
        marginTop: 30,
        // flex: 1
    },
    foodName: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Product;
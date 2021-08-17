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


    changeQuantity = (status) => {
        if(status === 1) {
            this.setState({
                quantity: this.state.quantity + 1
            });
        }
        else {
            if(this.state.quantity > 1) {
                this.setState({
                    quantity: this.state.quantity - 1
                });
            }
        }
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
                    >
                    </Image>
                    <View style = {styles.quantityWrapper}>
                        <TouchableOpacity 
                            style = {styles.decreaseButton}
                            onPress = {() => {
                                this.changeQuantity(0);
                            }}
                        >
                            <Text style = {styles.quantityText}>-</Text>
                        </TouchableOpacity>
                        <View style = {styles.quantityNumber}>
                            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>{this.state.quantity}</Text>
                        </View>
                        <TouchableOpacity 
                            style = {styles.increaseButton}
                            onPress = {() => {
                                this.changeQuantity(1);
                            }}
                        >
                            <Text style = {styles.quantityText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.fontNameWrapper}>
                        <Text style = {styles.foodName}>Bún bò - 25 min</Text>
                    </View>
                    <View style = {styles.discriptionWrapper}>
                        <Text style = {styles.discriptionText}>Discription</Text>
                    </View>
                    <View style = {styles.orderWrapper}>
                        <Text style = {styles.priceNumber}>20.000đ</Text>
                        <TouchableOpacity style = {styles.orderButton}>
                            <Text style = {{fontSize: 18, fontWeight: 'bold'}}>Order</Text>
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
                {this.renderFoodInfor()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    headerWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 25
    },  
    iconBackWrapper: {
        width: 50,
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
        backgroundColor: '#f2f2f2',
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
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    increaseButton: {
        width: 50,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },
    fontNameWrapper: {
        flexDirection: 'row',
        marginTop: 30,
        // flex: 1
    },
    foodName: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    discriptionWrapper: {
        alignItems: 'center',
        marginTop: 5
    },
    discriptionText: {
        fontSize: 18
    },
    orderWrapper: {
        flexDirection: 'row',
        marginTop: 210,
        width: '100%',
        height: 70,
        borderTopColor: '#f2f2f2',
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    priceNumber: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold'
    },
    orderButton: {
        marginRight: 10,
        padding: 10,
        width: 250,
        height: 50,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        borderRadius: 10
    }
});

export default Product;
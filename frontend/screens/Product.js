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
    Alert
} from "react-native";
import {
    backIcon,
    miXao,
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

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            quantity: 1,
            itemName: null
        }
    }

    getItem = async () => {
        const itemName = await AsyncStorage.getItem('item-selected');
        if(itemName != null) {
            axios.get(`${ipAddress}/api/detail-category-product?name=${itemName}`)
                .then((response) => {
                    // console.log(response);
                    this.setState({
                        item: response.data
                    });
                })
                .catch((error) => {
                    displayAlert(error);
                });
        }
    }

    componentDidMount () {
        this.getItem();
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

    orderButtonPressedHandler = () => {
        
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
            <SafeAreaView>
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
                        <Text style = {styles.foodName}>{this.state.item.name} - {this.state.item.duration}m</Text>
                    </View>
                    <View style = {styles.discriptionWrapper}>
                        <Text style = {styles.discriptionText}>{this.state.item.description}</Text>
                    </View>
                    <View style = {styles.orderWrapper}>
                        <Text style = {styles.priceNumber}>20.000đ</Text>
                        <TouchableOpacity 
                            style = {styles.orderButton}
                            onPress = {() => {
                                this.orderButtonPressedHandler();
                            }}
                        >
                            <Text style = {{fontSize: 18, fontWeight: 'bold'}}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
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
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
    backIconLight,
    heartIcon1,
    heartIcon2,
    ipAddress
} from '../contants';
// import Heart from "react-animated-heart";

const displayAlert = (message) => {
    Alert.alert(
        "Notification",
        message,
        [
            {
            text: "Cancel",
            
            style: "cancel"
            },
            { text: "OK"}
        ])
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            quantity: 1,
            itemName: null,
            isClick: true
        }
    }

    getItem = async () => {
        const itemName = await AsyncStorage.getItem('item-selected');
        this.setState({
            itemName: itemName
        });
        if(itemName != null) {
            axios.get(`${ipAddress}/api/detail-category-product?name=${itemName}`)
                .then((response) => {
                    this.setState({
                        item: response.data
                    });
                })
                .catch((error) => {
                    displayAlert(error);
                });
        } else {
            this.props.navigation.navigate('Home', {});
        }
    }

    async getProductLikeStatus() {
        const itemName = await AsyncStorage.getItem('item-selected');
        const token = await AsyncStorage.getItem('token');
        if(itemName != null) {
            axios.get(`${ipAddress}/api/favorite?product-name=${itemName}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    this.setState({
                        isClick: response.data.isLiked
                    });
                    console.log(this.state.isClick)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    componentDidMount () {
        this.getItem();
        this.getProductLikeStatus();
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

    async orderButtonPressedHandler() {
        const tokenTmp = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/order/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenTmp}`
            }
        })
            .then((response) => {
                this.setState({
                    quantity: 1
                })
                // console.log(response.data.order_id);
                axios.post(`${ipAddress}/api/order-detail/`, {
                    product_name: this.state.itemName,
                    order_id: response.data.order_id,
                    quantity: this.state.quantity
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${tokenTmp}`
                    }, 
                })
                .then((response) => {
                    displayAlert('Added')
                })
                .catch((error) => {
                    displayAlert('We have some problems!')
                });
            })
            .catch((error) => {
                displayAlert('Please sign in before ordering!');
            })
    }

    async heartButtonPressedHandler() {
        const itemName = await AsyncStorage.getItem('item-selected');
        const token = await AsyncStorage.getItem('token');
        if(this.state.isClick === true) {
            this.setState({
                isClick: false
            });
        }else {
            this.setState({
                isClick: true
            });
        }
        console.log(this.state.isClick)
        axios.post(`${ipAddress}/api/favorite/`, {
            'status': this.state.isClick,
            'product-name': itemName
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log('ok')
        })
        .catch((error) => {
            displayAlert('Please sign in !');
        });
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
                <Text style = {styles.nameWrapper}>Product information</Text>
            </View>
        );
    }

    renderFoodInfor() {
        let heartIcon = heartIcon2
        if(this.state.isClick === true) {
            heartIcon = heartIcon1
        }
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
                        <TouchableOpacity 
                            style = {styles.heartButton}
                            onPress = {() => {
                                this.heartButtonPressedHandler()
                            }}
                        >
                            <Image
                                source = {heartIcon}
                                style = {styles.heartIcon}
                            ></Image>
                        </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff7733',
        height: 50
    },  
    iconBackWrapper: {
        width: 50,
        
    },
    nameWrapper: {
        left: 50,
        fontSize: 25,
        color: '#FFF'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    foodInforWrapper: {
        // marginTop: 10,
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
        marginTop: 265,
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
    },
    heartIcon: {
        height: 25,
        width: 25,
    },
    heartButton: {
        padding: 10,
        paddingLeft: 20
    }
});

export default Product;
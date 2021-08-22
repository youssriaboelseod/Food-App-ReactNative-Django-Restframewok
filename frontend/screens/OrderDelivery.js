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

class OrderDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderProducts: [
                {
                    name: 'mi'
                },
                {
                    name: 'bun'
                },
                {
                    name: 'bun'
                },
                {
                    name: 'bun'
                }
            ]
        }
    }

    componentDidMount() {

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
                <Text style = {styles.nameWrapper}>Shopping cart</Text>
                <TouchableOpacity style = {styles.editButtomWrapper}>
                    <Text style = {styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderCheckOut() {
        return(
            <View style = {styles.checkOutWrapper}>
                <View style={styles.checkboxContainer}>
                    {/* <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                    /> */}
                    <Text style={styles.label}>Do you like React Native?</Text>
                </View>
            </View>
        );
    }

    renderOrder() {
        const renderItem = ({item}) => (
            <View style = {styles.orderDetailWrapper}>
                <Text>{item.name}</Text>
            </View>
        )

        return(
            <View style = {styles.orderWrapper}>
                <FlatList
                    data = {this.state.orderProducts}
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id}
                    renderItem = {renderItem}
                    extraData = {this.state.selectedId}
                    // contentContainerStyle = {{padding: 10}}
                ></FlatList>
            </View>
        );

    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderOrder()}
                {this.renderCheckOut()}
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
        left: 105,
        fontSize: 25,
        color: '#FFF'
    },
    backIcon: {
        width: 25,
        height: 25
    },
    orderWrapper: {
        marginTop: 5,
        flex: 1
    },
    editText: {
        fontSize: 18,
        color: '#FFF'
    },
    editButtomWrapper: {
        left: 180
    },
    orderDetailWrapper: {
        backgroundColor: '#FFF',
        marginBottom: 15,
        height: 200
    },
    checkOutWrapper: {
        height: 70,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#F0F0F0'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
});

export default OrderDelivery;
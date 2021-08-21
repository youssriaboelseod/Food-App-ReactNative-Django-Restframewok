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
            orderProducts: []
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

    renderItem() {
        return(
            <View>
                
            </View>
        );
    }

    renderOrder() {
        return(
            <View style = {styles.orderWrapper}>
                <FlatList
                    data = {this.state.orderProducts}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id}
                    renderItem = {renderItem}
                    extraData = {this.state.selectedId}
                    contentContainerStyle = {{padding: 10, marginTop: 15}}
                ></FlatList>
            </View>
        );

    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderOrder()}
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
        marginTop: 50,
        width: '100%',
        flexDirection: 'column'
    },
    editText: {
        fontSize: 18,
        color: '#FFF'
    },
    editButtomWrapper: {
        left: 180
    }
});

export default OrderDelivery;
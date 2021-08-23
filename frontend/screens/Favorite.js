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

// import CheckBox from '@react-native-community/checkbox';
import {
    backIcon,
    miXao,
    backIconLight,
    storeIcon,
    ipAddress
} from '../contants';

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


class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            haveFavoriteProducts: false,
            favoriteProducts: []
        }
    }

    getFavoriteProducts = async () => {
        console.log('here')
        const token = await AsyncStorage.getItem('token');
        axios.get(`${ipAddress}/api/favorites/`, {
            headers: {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                haveFavoriteProducts: true
            });
            console.log(data);
        })
        .catch((error) => {
            displayAlert('Please sign in!');
        });
    }

    componentDidMount() {
        this.getFavoriteProducts();
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
                <Text style = {styles.nameWrapper}>Likes</Text>
            </View>
        );
    }

    renderEmptyFavoriteProducts() {
        return(
            <View style = {styles.emptyStoreWrapper}>
                <Image
                    source = {storeIcon}
                    style = {styles.storeIcon}
                ></Image>
                <Text
                    style = {{
                        marginTop: 20,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                >Give some love!</Text>
                <Text
                    style = {{
                        marginTop: 15,
                        fontSize: 15,
                    }}
                >Tap on the hearts to save your favorite products</Text>
            </View>
        );
    }

    renderFavoritProducts() {
        const renderItem = () => {
            return(
                <View>
                </View>
            );
        }
        return(
            <FlatList
                data = {this.state.favoriteProducts}
                showsHorizontalScrollIndicator = {false}
                keyExtractor = {(item) => item.id}
                renderItem = {renderItem}
                extraData = {this.state.selectedId}
                // contentContainerStyle = {{padding: 10}}
            ></FlatList>
        );

    }

    renderMainView() {
        console.log(this.state.favoriteProducts.length)
        if(this.state.haveFavoriteProducts === true) {
            return (
                this.renderFavoritProducts()
            );
        } else {
            return (
                this.renderEmptyFavoriteProducts()
            );
        }
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderMainView()}
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
    storeIcon: {
        height: 70,
        width: 70,
        // alignSelf: 'center'
    },
    emptyStoreWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    }
});

export default Favorite
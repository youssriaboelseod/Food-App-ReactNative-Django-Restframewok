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
    heartIcon1,
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
            selectedId: '',
            haveFavoriteProducts: false,
            isFetching: false,
            favoriteProducts: [],
        }
    }

    getFavoriteProducts = async () => {
        const token = await AsyncStorage.getItem('token');
        if(token != null) {
            axios.get(`${ipAddress}/api/favorites/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                this.setState({
                    favoriteProducts: [...response.data],
                    isFetching: false
                });
                console.log(this.state.favoriteProducts);
            })
            .catch((error) => {
                displayAlert('Please sign in!');
                this.setState({
                    isFetching: false
                })
            });
        }
    }

    onRefresh = () => {
        this.setState({
            isFetching: true
        }, () => {
            this.getFavoriteProducts();
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
        const renderEmptyFavoriteProducts = () => {
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
        const renderItem = ({item}) => {
            return(
                <View style = {styles.favoriteProduct}>
                    <View style = {styles.imageFavoProductWrapper}>
                        <Image
                            source = {miXao}
                            style = {styles.favoProductImage}
                        ></Image>
                    </View>
                    <View style = {styles.inforWrapper}>
                        <Text style = {styles.inforText}>{item.name} - {item.duration}m</Text>
                        <Text style = {styles.descriptionText}>{item.description}</Text>
                    </View>
                    <View style = {styles.heartIconWrapper}>
                        <Image
                            source = {heartIcon1}
                            style = {styles.heartIcon}
                        ></Image>
                    </View>
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
                ListEmptyComponent = {renderEmptyFavoriteProducts}
                onRefresh = {() => {
                    this.onRefresh()
                }}
                refreshing = {this.state.isFetching}
            ></FlatList>
        );

    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderFavoritProducts()}
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
        left: 155,
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
    }, 
    favoriteProduct: {
        width: '100%',
        backgroundColor: '#FFF',
        height: 120,
        marginTop: 10,
        flexDirection: 'row'
    },
    imageFavoProductWrapper: {

    },
    favoProductImage: {
        height: '100%',
        width: 120
    },
    inforWrapper: {
        marginLeft: 20,
        marginTop: 5,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    inforText: {
        fontSize: 18
    },
    descriptionText: {
        fontSize: 15
    },
    heartIconWrapper: {
        justifyContent: 'flex-end',
        left: 80
    },
    heartIcon: {
        height: 30,
        width: 30
    }
});

export default Favorite
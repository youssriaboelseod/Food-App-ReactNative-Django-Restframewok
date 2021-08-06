import axios from 'axios';
import React, {  Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import {
    miXao,
    miXaoGion,
    ipAddress,
    locationIcon,
    cartIcon,
    miQuang
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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            products: [
                {
                    'id': 1,
                    'name': 'Mì xào',
                    'duration': 25,
                    'url': miXao
                },
                {
                    'id': 2,
                    'name': 'Mì xào giòn',
                    'duration': 30,
                    'url': miXaoGion
                },
                {
                    'id': 3,
                    'name': 'Mì quản',
                    'duration': 40,
                    'url': miQuang
                },
            ],
            selectedId: '',
        }
    }

    componentDidMount() {
        axios.get( ipAddress + `list-categories/`)
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        categories: [...response.data]
                    })
                }else {
                    displayAlert('There are problems with our server. Please try later !');
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    renderHeader() {
        return(
            <View 
                style = {{
                    flexDirection: 'row',
                    height: 50,
                }}
            >
                <TouchableOpacity
                    style = {styles.locateButton}
                >
                    <Image 
                        source = { locationIcon }
                        style = { styles.imgLocation }
                    />
                </TouchableOpacity>

                <View
                    style = {{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 15
                    }}
                >
                    <View
                        style = { styles.searchBox }
                    >
                        <Text
                            style = {{
                                fontSize: 20
                            }}
                        >Location</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style = {styles.locateButton}
                >
                    <Image 
                        source = { cartIcon }
                        style = { styles.imgLocation }
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderRestaurantList() {
        const renderItems = ({item}) => (
            <TouchableOpacity
                style = {{
                    marginBottom: 20,
                    marginRight: 15,
                    marginLeft: 15
                }}
            >
                <View
                    style = {{
                        margin: 7,
                        marginTop: 0
                    }}
                >
                    <Image
                        source = {item.url}
                        resizeMode = 'cover'
                        style = {{
                            width: '100%',
                            height: 120,
                            borderRadius: 30
                        }}
                    ></Image>
                    <View style = {styles.productDuration}>
                        <Text style = {{
                            fontWeight: 'bold',
                            
                        }}>{item.duration} min</Text>
                    </View>
                </View>
                {/* <Text>{item.id}</Text> */}
            </TouchableOpacity>
        );
        return(
            <View style = {{
                flex: 1
            }}>
                <FlatList
                    // horizontal
                    data = {this.state.products}
                    showsHorizontalScrollIndicator = {false}
                    renderItem = {renderItems}
                    keyExtractor = {(item) => item.id}
                    // contentContainerStyle = {{padding: 10, paddingBottom: 500}}
                >
                </FlatList>
            </View>
            
        );
    }

    renderMainCategories() {
        const renderItem = ({item}) => {
            backgroundColor = item.id === this.state.selectedId ? "#ff7733" : "#FFF";    
            if (this.state.selectedId === '') {
                backgroundColor = "#ff7733";
            }        
            return (
                <TouchableOpacity 
                    onPress = {() => {
                        console.log(this.state.selectedId);
                        this.setState({
                            selectedId: item.id
                        });
                    }}
                    style = {{
                        padding: 15,
                        paddingBottom: 30,
                        backgroundColor: backgroundColor,
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 15
                    }}
                >
                    <View style = {styles.categoriesImage}>
                        <Image
                            source = {locationIcon}
                            resizeMode = 'contain'
                            style = {{
                                height: 25,
                                width: 25
                            }}
                        ></Image>
                    </View>
                    <Text style = {{
                        marginTop: 10,
                        color: "#000",
                        fontSize: 15,
                        paddingBottom: 0
                    }}>{item.name}</Text>
                </TouchableOpacity>
            );
        }

        return(
            <View style = {styles.categoriesWrapper}>
                <Text style = {styles.textCategories}>Main</Text>
                <Text style = {styles.textCategories}>Categories</Text>
                <FlatList 
                    data = {this.state.categories}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor = {(item) => item.id}
                    renderItem = {renderItem}
                    extraData = {this.state.selectedId}
                    contentContainerStyle = {{padding: 10, marginTop: 15}}
                />
            </View>
        );
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
                {this.renderMainCategories()}
                {this.renderRestaurantList()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5ef"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
    },
    locateButton: {
        width: 50,
        paddingLeft: 15,
        paddingTop: 15,
        justifyContent: 'center'
    },
    imgLocation: {
        width: 30,
        height: 30
    },
    searchBox: {
        width: '80%',
        height: '100%',
        backgroundColor: '#e0e0d1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    categoriesWrapper: {
        padding: 10,
        margin: 10
    },
    textCategories: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    categoriesImage: {
        height: 58,
        width: 55,
        borderRadius: 25,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    productDuration: {
        position: 'absolute',
        bottom: 0,
        height: 40,
        width: 90,
        backgroundColor: '#FFF',
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Home;
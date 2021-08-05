import axios from 'axios';
import React, {  Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import {
    locationIcon,
    cartIcon
} from '../contants';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedId: '',
        }
    }

    componentDidMount() {
        axios.get(`http://192.168.1.3:8000/api/list-categories/`)
            .then((response) => {
                if(response.status === 200) {
                    this.setState({
                        categories: [...response.data]
                    })
                    console.log(this.state.categories);
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
    }
});

export default Home;
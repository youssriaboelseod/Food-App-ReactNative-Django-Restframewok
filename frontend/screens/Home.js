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
            categories: ['Mì', 'Cơm', '', '', '', '', '', '', '']
        }
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
        const renderItem = () => {
            return(
                <TouchableOpacity style = {styles.catgoryItems}>
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
                        color: "#FFF",
                        fontSize: 15,
                        paddingBottom: 0
                    }}>Category</Text>
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
                    keyExtractor = {item => `${item.id}`}
                    renderItem = {renderItem}
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
    catgoryItems: {
        padding: 15,
        paddingBottom: 30,
        backgroundColor: '#ff7733',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
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
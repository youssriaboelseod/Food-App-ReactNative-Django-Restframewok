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

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                {this.renderHeader()}
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
    }
});

export default Home;
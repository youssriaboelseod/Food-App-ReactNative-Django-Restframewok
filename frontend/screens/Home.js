import React, {  Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from "react-native";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    renderHeader = () => {
        <View 
            style = {{
                flexDirection: 'row',
                height: 50
            }}
        >
            <TouchableOpacity
                style = {styles.locateButton}
            >
                
                    
                </Image>
            </TouchableOpacity>
        </View>
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
        paddingLeft: 10,
        justifyContent: 'center'
    }

});

export default Home;
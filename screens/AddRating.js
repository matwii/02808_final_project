import React from 'react';
import { StyleSheet, Image, View, Dimensions, Text, AsyncStorage, TextInput } from 'react-native';
import { Card, ListItem, Button, ButtonGroup } from 'react-native-elements'
import { connect } from "react-redux";
import * as actions from "../actions";
import { ConnectAlert } from '../components/alert';
import { FontAwesome } from '@expo/vector-icons';
import moment from "moment/moment";

const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height
};

class AddRating extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            exercises: {}
        }
    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('exercises');
            if (value !== null){
                // We have data!!
                this.setState({exercises: JSON.parse(value)});
            }
        } catch (error) {
            console.log(error);
        }
    };

     render() {

        return (
            <View style={styles.container}>
                <FontAwesome
                    name={"frown-o"}
                    size={80}
                    color='#1e88e5'
                />
                <FontAwesome
                    name={"smile-o"}
                    size={80}
                    color='#1e88e5'
                />
                <FontAwesome
                    name={"meh-o"}
                    size={80}
                    color='#1e88e5'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingLeft: 30,
        paddingRight: 30
    },
    container2: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'stretch'
    },
    addWaterButtonStyle: {
        borderColor: '#1e88e5', backgroundColor: 'white', borderWidth: 1
    }
});

function mapStateToProps({ objects }) {
    return { objects };
}

export default connect(mapStateToProps, actions)(ConnectAlert(AddRating));
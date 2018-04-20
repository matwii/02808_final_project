import React from 'react';
import { StyleSheet, Image, View, Dimensions, Text, AsyncStorage } from 'react-native';
import { Card, ListItem, Button, ButtonGroup } from 'react-native-elements'
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from "moment/moment";

const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height
};

class AddHydration extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0
        };
    }

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
    };

    onPress = () => {

    };


    render() {
        const buttons = ['Water', 'Energy Drink']
        const { selectedIndex } = this.state

        return (
            <View style={styles.container}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 30}}
                    buttonStyle={{backgroundColor: 'white'}}
                    selectedButtonStyle={{ backgroundColor: '#1e88e5' }}
                    selectedTextStyle={{ color: 'white' }}
                />
                <View>
                    <Text>Test</Text>
                    <Text>Test</Text>
                </View>
                <Button
                    title='Save'
                    rounded
                    backgroundColor='#1e88e5'
                    onPress={() => this.onPress()}
                    containerViewStyle={{alignSelf: 'stretch', paddingRight: 10, paddingLeft: 10, marginBottom: 20}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    container2: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'stretch'
    },
});

function mapStateToProps({ objects }) {
    return { objects };
}

export default connect(mapStateToProps, actions)(AddHydration);
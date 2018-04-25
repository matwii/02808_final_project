import React from 'react';
import { StyleSheet, Image, View, Dimensions, Text, AsyncStorage, TextInput } from 'react-native';
import { Card, ListItem, Button, ButtonGroup } from 'react-native-elements'
import { connect } from "react-redux";
import * as actions from "../actions";
import { ConnectAlert } from '../components/alert';
import moment from "moment/moment";

const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height
};

class AddHydration extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0,
            text: 0,
            exercises: {}
        };
    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('hydration');
            console.log(value)
            if (value !== null){
                // We have data!!
                this.setState({exercises: JSON.parse(value)});
            }
        } catch (error) {
            console.log(error);
        }
    };

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
    };

    onPress = (value) => {
        let tempValue = this.state.text += value;
        console.log('tmpvalue:' + tempValue);
        this.setState({text: tempValue});
    };

    onSave = () => {
        if (this.state.text !== 0){
            const { exercises, text } = this.state;
            if (!exercises[this.timeToString(new Date())]){
                exercises[this.timeToString(new Date())] = [{hydration: text}];
                return AsyncStorage.setItem('hydration', JSON.stringify(exercises))
                    .then(this.props.alertWithType("success", "Exercise added", "Exercise successfully added to your schedule"))
                    .then(this.props.getHydration())
                    .then(this.props.navigation.goBack())
                    .catch(error => console.log('error!'));
            } else {
                exercises[this.timeToString(new Date())].push({hydration: text});
                return AsyncStorage.setItem('hydration', JSON.stringify(exercises))
                    .then(this.props.alertWithType("success", "Exercise added", "Exercise successfully added to your schedule"))
                    .then(this.props.getHydration())
                    .then(this.props.navigation.goBack())
                    .catch(error => console.log('error!'));
            }
        } else {
            return this.props.alertWithType("error", "Need a value", "Value can't be zero")
        }

    };

    timeToString(date) {
        let string = moment(date).format();
        return string.split('T')[0];
    }

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
                <View style={{alignItems: 'center'}}>
                    <TextInput
                        keyboardType='numeric'
                        style={{height: 40, width: 70, borderBottomWidth : 1, borderBottomColor: '#1e88e5', margin: 5}}
                        onChangeText={(text) => text ? this.setState({text: parseInt(text)}) : this.setState({text: 0})}
                        value={this.state.text.toString()}
                    />
                    <View style={{flexDirection: 'row', margin: 5}}>
                        <Button
                            fontSize={10}
                            buttonStyle={styles.addWaterButtonStyle}
                            color='black'
                            onPress={() => this.onPress(250)}
                            title='+250 ml' />
                        <Button
                            fontSize={10}
                            buttonStyle={styles.addWaterButtonStyle}
                            color='black'
                            onPress={() => this.onPress(500)}
                            title='+500 ml' />
                        <Button
                            fontSize={10}
                            buttonStyle={styles.addWaterButtonStyle}
                            color='black'
                            onPress={() => this.onPress(1000)}
                            title='+1000 ml' />
                    </View>
                </View>
                <Button
                    title='Save'
                    rounded
                    backgroundColor='#1e88e5'
                    onPress={() => this.onSave()}
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
    addWaterButtonStyle: {
        borderColor: '#1e88e5', backgroundColor: 'white', borderWidth: 1
    }
});

function mapStateToProps({ hydration }) {
    return { hydration };
}

export default connect(mapStateToProps, actions)(ConnectAlert(AddHydration));
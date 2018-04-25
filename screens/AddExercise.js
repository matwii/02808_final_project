import React from "react";
import { StyleSheet, Button, ScrollView, AsyncStorage } from 'react-native';
import t from 'tcomb-form-native';
import moment from 'moment';
import { ConnectAlert } from '../components/alert';
import {connect} from "react-redux";
import * as actions from "../actions";

const Form = t.form.Form;

Form.stylesheet.dateValue.normal.borderColor = '#d0d2d3';
Form.stylesheet.dateValue.normal.backgroundColor = 'white';
Form.stylesheet.dateValue.normal.borderWidth = 1;

const User = t.struct({
    activityName: t.String,
    date: t.Date,
    startTime: t.Date,
    endTime: t.Date,
    repeatEachWeek: t.Boolean,
    rating: t.maybe(t.String)
});

class AddExercise extends React.Component {
    constructor(props) {
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

    handleSubmit = () => {
        let value = this._form.getValue(); // use that ref to get the form value
        console.log(value);
        if (value !== null){
            const { exercises } = this.state;
            if (!exercises[this.timeToString(value.date)]){
                exercises[this.timeToString(value.date)] = [value];
                return AsyncStorage.setItem('exercises', JSON.stringify(exercises))
                    .then(this.props.alertWithType("success", "Exercise added", "Exercise successfully added to your schedule"))
                    .then(this.props.getObjects())
                    .then(this.props.navigation.goBack())
                    .catch(error => console.log('error!'));
            } else {
                exercises[this.timeToString(value.date)].push(value);
                return AsyncStorage.setItem('exercises', JSON.stringify(exercises))
                    .then(this.props.alertWithType("success", "Exercise added", "Exercise successfully added to your schedule"))
                    .then(this.props.getObjects())
                    .then(this.props.navigation.goBack())
                    .catch(error => console.log('error!'));
            }
        }
    };

    timeToString(date) {
        let string = moment(date).format();
        return string.split('T')[0];
    }

    render(){
        console.log(moment.locale());

        return(
            <ScrollView style={styles.container}>
                <Form
                    type={User}
                    value={{rating: null}}
                    options={createOptions}
                    ref={c => this._form = c} // assign a ref
                />
                <Button
                    title="Save!"
                    onPress={this.handleSubmit}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        flex: 1
    },
});

let myFormatFunction = (format,date) =>{
    return moment(date).format(format);
};

/*
 * Configuration for the form fields
 */
const createOptions = {
    fields: {
        activityName: {
            error: 'This field needs to be filled.'
        },
        date: {
            mode: 'date',
            config:{
                format: (date) => myFormatFunction("DD MMM YYYY",date)
            }
        },
        startTime: {
            mode: 'time',
            config:{
                format: (date) => myFormatFunction('LT',date)
            }
        },
        endTime: {
            mode: 'time',
            config:{
                format: (date) => myFormatFunction('LT',date)
            }
        },
        repeatEachWeek: {
            label: 'Repeat each week?',
        },
        rating: {
            hidden: true
        }
    }
};

export default connect(null, actions)(ConnectAlert(AddExercise));
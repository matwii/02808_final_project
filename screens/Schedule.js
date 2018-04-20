import React from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Ionicons} from '@expo/vector-icons';
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from 'moment'

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        }
    }

    async componentWillMount() {
        await this.props.getObjects();
        this.props.objects ? this.setState({ items: this.props.objects }) : null
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigate: this.onPress,
        });
    }

    componentWillReceiveProps(nextProps){
        console.log('RECIEVEPROPS')
        nextProps.objects ? this.setState({ items: nextProps.objects }) : null
    }

    static navigationOptions = ({navigation, state}) => ({
        headerRight: (
            <Ionicons.Button
                name={"ios-add"}
                size={42}
                onPress={() => navigation.state.params.navigate()}
                backgroundColor={'transparent'}
                color={'black'}
            />)
    });

    onPress = () => {
        const {navigate} = this.props.navigation;
        navigate('addExerciseScreen')
    };

    render() {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = 0;
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: Math.max(50, 50)}]}><Text>
                {item.activityName}{"\n"}
                {moment(item.startTime).format('LT')} - {moment(item.endTime).format('LT')}

                </Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});

function mapStateToProps({ objects }) {
    return { objects };
}

export default connect(mapStateToProps, actions)(Schedule);
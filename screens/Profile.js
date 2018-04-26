import React from 'react';
import {StyleSheet, Image, View, Dimensions, Text} from 'react-native';
import {Card, ListItem, Button} from 'react-native-elements'
import {connect} from "react-redux";
import * as actions from "../actions";
import moment from 'moment'
import Carousel, {Pagination} from 'react-native-snap-carousel';

const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height
};

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todayExercises: [],
            todaysHydration: {}
        }
    }

    async componentWillMount() {
        await this.props.getObjects();
        await this.props.getHydration();
        const dateString = this.timeToString(new Date())
        if (this.props.objects) {
            if (this.props.objects[dateString]) {
                this.setState({todayExercises: this.props.objects[dateString]});
            }
        }
        if (this.props.hydration) {
            if (this.props.hydration[dateString]) {
                this.setState({todaysHydration: this.props.hydration[dateString]});
            }
        } else {
            console.log('no objects')
        }
    }

    async componentWillReceiveProps(nextProps) {
        const dateString = this.timeToString(new Date())
        if (nextProps.objects) {
            if (nextProps.objects[dateString]) {
                this.setState({todayExercises: nextProps.objects[dateString]});
            }
        }
        if (nextProps.hydration) {
            if (nextProps.hydration[dateString]) {
                console.log('nextProps' + nextProps.hydration[dateString]);
                await this.setState({todaysHydration: nextProps.hydration[dateString]});
                this.renderAmountOfWater();
            }
        }
    }

    renderAmountOfWater = () => {
        const {todaysHydration} = this.state;
        if (JSON.stringify(todaysHydration) !== '{}') {
            let total = 0;
            for (let i = 0; i < todaysHydration.length; i++) {
                total += todaysHydration[i].hydration;
            }
            console.log('total' + total);
            return <Text style={{fontSize: 18}}>{total}</Text>
        }
        return <Text style={{fontSize: 18}}>0</Text>
    };

    timeToString(date) {
        let string = moment(date).format();
        return string.split('T')[0];
    }

    _renderItem({item, index}) {
        return (
            <Card
                containerStyle={styles.container3}
                title="Today's Goal ">
                <Text>Inser value here</Text>
            </Card>
        )
    }

    _renderCarousel(){
        const { todayExercises } = this.state;
        if (todayExercises.length === 0){
            return (
                <Card
                    containerStyle={styles.container2}
                    title="Today's Goal ">
                    <Text style={{fontSize: 18, alignSelf: 'center'}}>No Exercise Today</Text>
                </Card>
            )
        }
        if (todayExercises.length === 1){
            const start = moment(todayExercises[0].startTime);
            const end = moment(todayExercises[0].endTime);
            const diffMin = end.diff(start, 'minutes');
            return (
                <Card
                    containerStyle={styles.container2}
                    wrapperStyle={{justifyContent: 'space-between'}}
                    title="Today's Goal ">
                    <View style={{justifyContent: 'space-between',}}>
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>{todayExercises[0].activityName}</Text>
                        <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 10}}>
                            <Text style={{fontSize: 16, alignSelf: 'center'}}>{diffMin + 1}</Text>
                            <Text style={{marginTop: 4}}> mins</Text>
                        </View>
                        <Text style={{alignSelf: 'center'}}>Starts from:</Text>
                        <Text style={{fontSize: 16, alignSelf: 'center', marginBottom: 10}}>{moment(todayExercises[0].startTime).format('LT')}</Text>
                        <Button
                            title='+ Rate session'
                            rounded
                            backgroundColor='#1e88e5'
                            onPress={() => this.props.navigation.navigate('addRatingScreen', {index: 0})}
                        />
                    </View>
                </Card>
            )
        }
        return (
            <Carousel
                ref={(c) => {
                    this._carousel = c;
                }}
                data={todayExercises}
                renderItem={this._renderItem}
                sliderWidth={DIMENSIONS.WIDTH}
                itemWidth={DIMENSIONS.WIDTH / 1.2}
                layout={'default'}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderCarousel()}
                <Card
                    containerStyle={styles.container2}
                    title="Hydration Condition ">
                    <Text style={{alignSelf: 'center',}}>Recommended hydration per day: 1700 ml</Text>
                    <Image
                        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4YOurL1Y-wG8XLzYvK7rU9udriaDIhTTmWw11fNdJ7igewb--g'}}
                        resizeMode="cover"
                        style={{
                            width: DIMENSIONS.WIDTH / 8,
                            height: DIMENSIONS.HEIGHT / 8,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                    />
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        {this.renderAmountOfWater()}
                        <Text style={{marginTop: 4}}> ml</Text>
                    </View>
                    <Button
                        title='+ Add'
                        rounded
                        backgroundColor='#1e88e5'
                        onPress={() => this.props.navigation.navigate('addHydrationScreen')}
                    />
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f6'
    },
    container2: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'center',
        width: DIMENSIONS.WIDTH / 1.1
    },
    container3: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'center',
        width: DIMENSIONS.WIDTH / 1.2
    },
});

function mapStateToProps({objects, hydration}) {
    return {objects, hydration};
}

export default connect(mapStateToProps, actions)(Profile);
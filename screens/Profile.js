import React from 'react';
import { StyleSheet, Image, View, Dimensions, Text } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from 'moment'

const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height
};

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            today: {}
        }
    }

    async componentWillMount() {
        await this.props.getObjects();
        const dateString = this.timeToString(new Date())
        if (this.props.objects){
           if (this.props.objects[dateString]){
               this.setState({ today: this.props.objects[dateString] });
           }
        } else {
            console.log('no objects')
        }
    }

    componentWillReceiveProps(nextProps){
        const dateString = this.timeToString(new Date())
        if (this.props.objects[dateString]){
            this.setState({ today: nextProps.objects[dateString] });
        }
    }

    renderAmountOfWater = () => {
        if (this.props.objects){
            if (this.state.today.hydration){
                return <Text style={{fontSize: 18 }}>{this.props.objects.hydration}</Text>
            }
        }
        return  <Text style={{fontSize: 18 }}>0</Text>
    };

    timeToString(date) {
        let string = moment(date).format();
        return string.split('T')[0];
    }

    render() {
        return (
            <View style={styles.container}>
                <Card
                    containerStyle={styles.container2}
                    title="Today's Goal ">
                </Card>
                <Card
                    containerStyle={styles.container2}
                    title="Hydration Condition ">
                    <Text style={{alignSelf: 'center', }}>Recommended hydration per day: 170 ml</Text>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4YOurL1Y-wG8XLzYvK7rU9udriaDIhTTmWw11fNdJ7igewb--g'}}
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
        alignSelf: 'stretch'
    },
});

function mapStateToProps({ objects }) {
    return { objects };
}

export default connect(mapStateToProps, actions)(Profile);
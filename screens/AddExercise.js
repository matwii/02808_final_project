import React from "react";
import { StyleSheet, Text, View } from 'react-native';

class AddExercise extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>This is the addExercise page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddExercise;
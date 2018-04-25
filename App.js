import React from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {AlertProvider} from './components/alert';
import {MainNavigator} from "./config/Routes";
import moment from 'moment';
import 'moment/locale/en-gb'
import {Provider} from "react-redux";
import store from "./store";
import {Permissions, Notifications} from 'expo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }


    getPushNotification = async () => {

        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        console.log(token);
    }

    render() {
        this.getPushNotification();
        this.notificationSubscription = Notifications.addListener(this.getPushNotification);
        AsyncStorage.clear();
        moment.locale('en-gb');
        return (
            <Provider store={store}>
                <AlertProvider>
                    <MainNavigator/>
                </AlertProvider>
            </Provider>
        );
    }
}

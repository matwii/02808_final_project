import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainNavigator} from "./config/Routes";

export default class App extends React.Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}

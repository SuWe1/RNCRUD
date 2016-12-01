/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AddInput from './App/AddInput';
import TaskList from './App/TaskList';
export default class CRUD extends Component {
  render() {
    return (
      <View style={styles.App}>
        <AddInput/>
        <TaskList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: '#EEE',
    paddingTop: 22,
    paddingLeft: 10,
    paddingRight: 10
  },
});

AppRegistry.registerComponent('CRUD', () => CRUD);

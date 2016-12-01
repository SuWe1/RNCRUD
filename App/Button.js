import React, { Component, PropTypes } from 'react';
import { TouchableOpacity,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Button extends Component{
    render(){
        const {onPress,name,color} =this.props;
        return(
          <TouchableOpacity onPress={onPress} style={styles.Button}>
            <Icon name={name} size={22} color={color}/>
          </TouchableOpacity>  
        );
    }
}
const styles=StyleSheet.create({
    Button :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height :50,
        borderRadius:5,
    }
});
import React, { Component } from 'react';
import { View, TextInput,StyleSheet,TouchableOpacity,Text,Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';
import dismissKeyboard from 'dismissKeyboard';
export default class AddInput extends Component{
    constructor(props){
        super(props);
        this.state={ 
            no : '',
            name : '',
            msg : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
         fetch('http://localhost:3000/users/addUser',{
         method : 'post',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             }, 
         body : JSON.stringify({
             no : this.state.no,
             name :this.state.name,
         })
     })
     .then((response) => response.json())
     .then((responseData) => {
         this.setState({ msg : responseData.code});
     })
     if(msg=200){
         Alert.alert('添加成功!');
     }else if(msg=1){
         Alert.alert('添加失败,已经存在!');
     }
}
    render(){
        return (
            <View style={styles.AddInput}>
               <View style={styles.AddInput_Icon}>
               <Icon name="person" size={22} color="#FFF" />
               </View>
               
               <View style={styles.AddInput_TextInputContainer}>
                 <TextInput
                 placeholder='input num'
                 autoCapitalize='none'
                 placeholderTextColor='#DCDCDC'
                 underlineColorAndroid="#4A90E2"
                 keyboardType='numeric'
                 style={styles.AddInput_no}
                 value={this.state.text}
                 onChangeText={(text) => this.setState({ no:text})}
                 />
                 <TextInput
                 placeholder='input name'
                 autoCapitalize='none'
                 placeholderTextColor='#DCDCDC'
                 underlineColorAndroid="#4A90E2"
                 style={styles.AddInput_name}
                 value={this.state.text}
                 onChangeText={(text) => this.setState({ name : text})}
                 />
                 <Button onPress={this.handleSubmit} name='add' color={'#FFFAFA'}/>
               </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    AddInput :{
     backgroundColor: '#4A90E2',
     height: 50,
     borderRadius: 5,
     flexDirection: 'row',
     justifyContent : 'center',
     alignItems: 'center',
     marginTop: 0,
     marginBottom: 10
    },
    AddInput_Icon :{
        flex: 1,
        height :50,
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    AddInput_TextInputContainer : {
        flex : 7,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#FFF',
        fontSize: 18,
        height: 50,
        borderRadius: 5
    },
    AddInput_no :{
        flex :3,
        height: 30,
        borderRadius :5,
        marginTop : 10,
        fontSize: 12,
        backgroundColor: '#ffffff',
        marginRight: 5,
    },
    AddInput_name :{
        flex :3,
        height: 30,
        borderRadius :5,
        marginTop : 10,
        fontSize: 12,
        backgroundColor: '#ffffff',
        marginRight: 5,
    },
    AddInput_TextInput :{
        flex :1,
        height: 30,
        borderRadius :5,
        marginTop : 5,
        backgroundColor: '#ffffff',
    }
});
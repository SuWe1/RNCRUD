import React, { Component } from 'react';
import { View, StyleSheet,Text ,TextInput,Alert} from 'react-native';

import Button from './Button';

export default class TaskListItem extends Component{
    
    constructor(){
        super();
        this.state={
            checked : false,
            no : '',
            name : '',
            msg_delete : '',
            msg_update : ''
        };
        this.commit = this.commit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //     no : this.refs.textinputno.value,
        // });
    }
    

    commit(){
        const {task} =this.props;
        let number=task.no;
        fetch('http://localhost:3000/users/updateUser',{
            method : 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             }, 
             body : JSON.stringify({
             no : number,
             name :this.state.name,
             })
        })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({ msg_update : responseData.code});
          if(this.state.msg_update==200){
            Alert.alert('更改成功!');
          }else if(this.state.msg_update==1){
            Alert.alert('更改失败,请重试!');
          }
            console.log(responseData)
            console.log(number)
        })
        
        // this.setState({checked : false});
    }

    delete(){
        const {task} =this.props;
        let number=task.no;
        fetch('http://localhost:3000/users/deleteUser',{
            method :'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             }, 
             body : JSON.stringify({
                no : number,
             })
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({ msg_delete : responseData.code});
            if(this.state.msg_delete==200){
                 Alert.alert('删除成功!');
            }else if(this.state.msg_delete==1){
                 Alert.alert('删除失败!');
            }
            console.log(responseData)
            console.log(number)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    render(){
        const {task}=this.props;
        // const {checked} =this.state;

        // let RightButton;
        // if(task.checked){
        //     RightButton=(
        //        <Button onPress={this.update} name={'settings'} color={'#d0011b'} />
        //     );
        // }else{
        //     RightButton=(
        //         <Button onPress={this.commit} name={'done'} color={'#9b9b9b'} />
        //     );
        // }
        return(
            <View style={styles.TaskListItem}>
               
               <View style={styles.TaskListItem_TextContainer}> 
                 <TextInput 
                 editable={false}
                 ref='textinputno'
                 style={styles.TaskListItem_Text}
                 placeholder={task.no}
                 value={task.no}
                 onChangeText={(text) => this.setState({ no:text})}/>
                 <TextInput
                 ref='textinput'
                 style={styles.TaskListItem_Text}
                 autoCapitalize='none'
                 placeholder={task.name}
                 value={this.state.text}
                 onChangeText={(text) => this.setState({ name : text})}/>
               </View>
               <Button onPress={this.commit} name='settings'/>
               <Button onPress={this.delete} name='delete'/>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    TaskListItem : {
        backgroundColor : '#fff',
        borderRadius : 5,
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 4,
        marginBottom : 4,
    },
    TaskListItem_TextContainer: {
        justifyContent :'center',
        flex: 6,
    },
    TaskListItem_Text: {
        flex: 1,
        color: '#4A4A4A',
        fontSize: 16,
    },
});
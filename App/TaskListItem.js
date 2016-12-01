import React, { Component } from 'react';
import { View, StyleSheet,Text ,TextInput} from 'react-native';

import Button from './Button';

export default class TaskListItem extends Component{
    constructor(){
        super();
    }

    render(){
        const {task}=this.props;

        let RightButton;
        // if(task.checked){

        // }
        return(
            <View style={styles.TaskListItem}>
               
               <View style={styles.TaskListItem_TextContainer}> 
                 <TextInput 
                 style={styles.TaskListItem_Text}
                 placeholder={task.no}/>
                 <TextInput
                 style={styles.TaskListItem_Text}
                 placeholder={task.name}/>
               </View>
               <Button name='update'/>
               <Button name='delete'/>
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
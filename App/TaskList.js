import React, { Component } from 'react';
import { ListView, View, Text,StyleSheet,RefreshControl, } from 'react-native';
import TaskListItem from './TaskListItem';


const ds=new ListView.DataSource({rowHasChanged : (r1,r2) => r1!==r2});
export default class TaskList extends Component{
    constructor(){
        super();
        this.state={
            tasks : [],
            tasksLoading : true,
            isRefreshing: false,
        };
        this.fetchData = this.fetchData.bind(this); 
    }
    componentDidMount() {
        this.fetchData();
    }
    
    //加载数据
    fetchData(){
        fetch('http://localhost:3000/users/queryAll')
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                tasks : responseData,
                tasksLoading : false,
                isRefreshing : false,
            });
        })
        .catch((err) => {
            console.log(err);
        })
        .done();
    }

    _onRefresh(){
        this.setState({isRefreshing : false});
    }

    renderTasks(){
        const {tasks}=this.state;
        const sortedTasks = tasks.sort((a, b) => {
           return (b.starred > a.starred) ? 1 : (b.starred < a.starred) ? -1 : 0;
         }).sort((a, b) => {
           return (b.checked > a.checked) ? -1 : (b.checked < a.checked) ? 1 : 0;
         });
        return(
            <ListView 
            dataSource={ds.cloneWithRows(sortedTasks)}//数据填入初始化的数据源去
            renderRow={(task) => <TaskListItem  key={task.key} task={task}/>}
            refreshControl={
                <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.fetchData}
                colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                progressBackgroundColor="#ffffff"
                />
            }
            >
            </ListView>
        )
    }

    render(){
        const { tasks,tasksLoading }=this.state;//命名要相同
        let taskList;
        if(tasksLoading){
            taskList=(
            <View style={styles.TaskList_Empty}>
              <Text style={styles.TaskList_EmptyText}>Loading...</Text>
            </View>
            );
        }else if(tasks.length){
            taskList=(this.renderTasks());
        }else{
            taskList=(
            <View style={styles.TaskList_Empty}>
              <Text style={styles.TaskList_EmptyText}>No student</Text>
            </View>
            );
        }
        return taskList;
    }
}
const styles=StyleSheet.create({
    TaskList_Empty:{
        alignItems : 'center',
        justifyContent: 'center',
        height : 100
    },
    TaskList_EmptyText : {
        fontSize :24,
        color : '#ddd',
    },
});
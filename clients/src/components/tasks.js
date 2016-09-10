import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Segment,
    ScrollView,
    TouchableHighlight
} from 'react-native';

import Cards from './cards';
import Header from './task/Header';
import NewTask from './newtask';
const Moment = require('moment');
const Style = require('../styles');

const NoList = ()=> {
    <View style={styles.nolist}>
        <Text style={styles.nolistText}>No Data, Add to get started</Text>
    </View>
}

const DefaultList = (props)=> {
    let sc = props._convertData(props.store.tasks.slice());
    let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
    })

    const source = ds.cloneWithRows(sc);
    return (
        <ListView
            style={{flex:1}}
            dataSource={source}
            renderRow={props._renderRow}
            enableEmptySections={true}
        />
    )
}

@observer
class TaskView extends Component {
    constructor() {
        super();

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        let mapper = this._convertData();

        this.state = {
            dataSource: ds.cloneWithRows(mapper),
            date: Moment().format('LLL')
        }
    }

    _addNew() {
        this.props.navigator.push({
            component: NewTask,
            type: 'Modal',
            passProps: {
                store: this.props.store
            }
        })
    }

    _convertData(data) {
        let taskMap = {};
        if (data) {
            data.forEach( item => {
                if (! taskMap[item.id]) {
                    taskMap[item.id] = [];
                }

                taskMap[item.id].push(item)
            })
        }

        return taskMap;
    }

    _renderRow(d, id) {
        const data = d[0];
        return (
            <TouchableHighlight style={{flex: 1, height: 50, backgroundColor: 'powderblue'}} key={id} onPress={()=> this._pressRow(data)}>
                <View style={{padding: 5}}>
                    <Text>{data.label}</Text>
                    <Text>{data.description}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    _pressRow(data) {
        return alert(data.label);
    }

    render() {
        const { store } = this.props;
        const CardList = store.tasks.map( (item, key) => {
            return (
                <View key={key}>
                    <Cards data={item} {...this.props}/>
                </View>
            )
        });

        return (
            <View style={{flex: 1}}>
                <Header
                    title="Payment Reminder"
                    buttonAction={this._addNew.bind(this)}>
                    <Icon name="ios-add-outline" size={24} color="#FFFFFF" />
                </Header>
                <View style={styles.container}>
                    <View style={styles.col}>
                        <Text style={styles.rowtext}>MYR {store.payable}</Text>
                        <Text style={styles.rowtextSmall}>{this.state.date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.coltext}><Text>Total:</Text> MYR {store.total}</Text>
                        <Text style={styles.coltext}><Text>Completed:</Text> {store.completed}/{store.tasks.length}</Text>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    { CardList }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 140,
        flexDirection: 'column',
        backgroundColor: '#81c04d'
    },

    item: {
        flex: 1
    },

    nolist:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    nolistText: {
        fontSize: 25,
        color: 'red'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    rowtext: {
        fontSize: 30,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        flexDirection: 'row'
    },
    rowtextSmall: {
        fontSize: 14,
        fontWeight: '100',
        color: '#FFFFFF',
        textAlign: 'center',
        flexDirection: 'row'
    },
    coltext: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '200',
        flexDirection: 'column',
        flex: 1
    }
})

export default TaskView;

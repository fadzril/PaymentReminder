import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

import {
    MKCheckbox,
    MKIconToggle,
    MKSwitch,
    MKColor
} from 'react-native-material-kit';

import Header from './task/Header';
const moment = require('moment');

@observer
class TaskDetailView extends Component {
    constructor() {
        super();
        this.state = { total: 0, payable: 0, checkin: 0}
    }

    componentWillMount() {
        let _checkin = 0;
        let _payable = 0;
        this.props.data.sessions.forEach(item => {
            if (item.checkin) {
                _checkin++;
                _payable += item.price;
            }
        });

        this.setState({
            checkin: _checkin,
            payable: _payable.toFixed(2)
        })
    }

    addPayment(){
        if (!this.props.data.paid) {
            this.props.data.paid = !this.props.data.paid;
            return this.props.store._pay(this.props.data.id, this.close.bind(this))
        }
    }

    addCheckin(session, e) {
        if (this.props.data.paid) return;

        let { id, price } = session;
        let tid = this.props.data.id;
        let type = (e.checked) ? 1 : 0;

        this.props.data.sessions.filter( item => {
            if (item.id == id) item.checkin = e.checked
        })

        return this.props.store._checkin({tid, id, type}, ()=> {
            let _payable = (e.checked) ? parseFloat(this.state.payable, 10)+price : parseFloat(this.state.payable, 10)-price;
            this.setState({
                checkin: (e.checked) ? this.state.checkin+1 : this.state.checkin-1,
                payable: _payable.toFixed(2)
            })
            this.props.store._setPayable();
        })
    }

    close() {
        this.props.store._setPayable();
        this.props.navigator.pop();
    }

    render() {
        const { data } = this.props;
        const history = this.props.data.sessions.map( (item, key) => {
            let time = moment(item.date).format("llll");
            let checked = (item.checkin) ? true : false;
            return (
                <View key={key} style={styles.list}>
                    <View style={styles.col}>
                        <Text style={styles.listText}>{time}</Text>
                        <Text style={styles.listTextSmall}>Price: MYR {item.price}</Text>
                    </View>
                    <MKSwitch
                        checked={checked}
                        trackLength={52}
                        height={30}
                        disabled={(data.paid)?true:false}
                        onColor="rgba(129, 192, 77,.3)"
                        thumbOnColor="rgba(129, 192, 77,1)"
                        rippleColor="rgba(129, 192, 77,.2)"
                        onCheckedChange={(e) => this.addCheckin(item, e)}
                        />
                </View>
            );
        })

        return(
            <View style={{flex:1, backgroundColor: '#FFFFFF'}}>
                <Header
                    title={this.props.data.description}
                    buttonAction={this.close.bind(this)}>
                    <Icon name="ios-close-outline" size={24} color="#FFFFFF" />
                </Header>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.headerText}>MYR {this.state.payable}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.headerCol}>
                            <Text style={styles.colTextHeader}>MYR {this.props.data.amount.toFixed(2)}</Text>
                            <Text style={styles.colText}>Total Amount</Text>
                        </View>
                        <View style={styles.headerColAlt}>
                            <Text style={styles.colTextHeader}>{this.state.checkin}/{this.props.data.sessions.length}</Text>
                            <Text style={styles.colText}>Checkin</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    { history }
                </ScrollView>
                <TouchableOpacity style={(!data.paid) ? styles.button : styles.buttonDisabled} onPress={this.addPayment.bind(this)}>
                    <Text style={styles.buttonText}><Icon name="ios-checkmark-circle-outline" size={20} color="#FFFFFF" /> PAY NOW</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 110,
        backgroundColor: '#81c04d'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    col: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    headerCol: {
        alignItems: 'center',
        flexDirection: 'column',
        flex:1,
        justifyContent: 'center'
    },
    headerColAlt: {
        alignItems: 'center',
        flexDirection: 'column',
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.1)'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FFFFFF'
    },
    colTextHeader: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 10
    },
    colText: {
        color: '#FFFFFF',
        fontSize: 12,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    },
    text: {
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#81c04d',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDisabled: {
        backgroundColor: '#DDDDDD',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        flex: 1,
        flexDirection: 'column',
        fontWeight: '600',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF'
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF'
    },
    listText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5
    },
    listTextSmall: {
        fontSize: 12,
        fontWeight: '100',
        color: '#666666'
    }
})

export default TaskDetailView;

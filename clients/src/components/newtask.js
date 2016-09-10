const moment = require('moment');
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './task/Header';
import {
    DatePickerIOS,
    View,
    ScrollView,
    PixelRatio,
    Text,
    TouchableOpacity
} from 'react-native';

import {
    MKTextField,
    MKButton,
    MKColor,
    mdl
} from 'react-native-material-kit';

const styles = require('../styles');
const InputLabel = MKTextField.textfieldWithFloatingLabel()
    .withPlaceholder('Label...')
    .withStyle(styles.textfieldWithFloatingLabel)
    .build();

const InputDescription = MKTextField.textfieldWithFloatingLabel()
    .withPlaceholder('Description...')
    .withStyle(styles.textfieldWithFloatingLabel)
    .build();

const InputAmount = MKTextField.textfieldWithFloatingLabel()
    .withPlaceholder('Amount...')
    .withStyle(styles.textfieldWithFloatingLabel)
    .withKeyboardType('numeric')
    .build();

const InputSessionDate = MKTextField.textfieldWithFloatingLabel()
    .withPlaceholder('Date')
    .withStyle(styles.textfieldWithFloatingLabel)
    .build();

const InputSessionCount = MKTextField.textfieldWithFloatingLabel()
    .withPlaceholder('Sessions...')
    .withStyle(styles.textfieldWithFloatingLabel)
    .withKeyboardType('numeric')
    .build();

const SaveButton = MKButton.coloredButton()
    .withText('SAVE')
    .withStyle(styles.addbutton)
    .withBackgroundColor('#81c04d')
    .withTextStyle({
        color: '#FFFFFF',
        fontWeight: '600'
    })
    .build();

const CancelButton = MKButton.button()
    .withText('CANCEL')
    .withStyle(styles.addbutton)
    .build();

const AddSession = MKButton.button()
    .withText('ADD SESSION')
    .build();

class NewTask extends Component {
    constructor() {
        super();
        this.state = {
            label: '',
            description: '',
            amount: 0,
            sessions: [],
            date: new Date(),
            showDatePicker: false
        }
    }

    componentWillMount() {
        setTimeout((() => {
            this.refs.label.focus();
        }), 1000)
    }

    _setSessions(date) {
        this.setState({date: date});
    }

    _saveSessionDate() {
        let range = this.state.sessions.filter(item => item.date==this.state.date)
        if (!range.length) {
            this.state.sessions.push({
                date: moment(this.state.date).toISOString()
            });
        }
        this.setState({showDatePicker: true});
    }

    _showPicker() {
        return this.setState({ showDatePicker: !this.state.showDatePicker});
    }

    _removeItem(id) {
        this.state.sessions.splice(id, 1);
        this.setState({showDatePicker: true});
    }

    _save() {
        this.props.store._save({...this.state}, _this.close);
    }

    _close() {
        this.props.navigator.pop()
    }

    render() {
        let today = new Date();
        let nextMonth = new Date(moment().add(1, 'month'));
        let sessionComponent = this.state.sessions.map((item, id)=> {
            let date = moment(item.date).format("DD-MM-YYYY")
            return (
                    <TouchableOpacity style={styles.rowlistContainer} key={id} onPress={()=>this._removeItem(id)}>
                        <View style={styles.rowlist} >
                            <Text style={styles.rowlistText}>{ date }</Text>
                            <Icon name="ios-close-circle" size={20} color="#81c04d" />
                        </View>
                    </TouchableOpacity>
            )
        })
        return (
            <View style={styles.container}>
                <Header
                    title="Please fill out required inputs"
                    buttonAction={this._close.bind(this)}>
                    <Icon name="ios-close-outline" size={24} color="#FFFFFF" />
                </Header>
                <View style={styles.rows}>
                    <View style={styles.rows2}>
                        <InputLabel ref="label" onChangeText={(label)=>this.setState({label})}/>
                        <InputDescription ref="description" onChangeText={(description)=>this.setState({description})}/>
                        <InputAmount ref="amount" onChangeText={(amount)=>this.setState({amount})} />
                        <Text style={styles.label}>
                            Sessions Date
                            <Text style={styles.labelSub}> (*Max 8 sessions)</Text>
                        </Text>
                        <View style={styles.list}>{ sessionComponent }</View>
                    </View>
                    <View style={styles.rows1}>
                        <DatePickerIOS
                        style={styles.picker}
                        mode="date"
                        date={this.state.date}
                        minimumDate={today}
                        maximumDate={nextMonth}
                        onDateChange={(date) => this._setSessions(date)} />
                    </View>
                </View>
                <View style={styles.row}>
                    <AddSession style={styles.col} onPress={this._saveSessionDate.bind(this)} />
                    <SaveButton style={styles.col} onPress={this._save.bind(this)} />
                </View>
            </View>
        )
    }
}

export default observer(NewTask);

import React, { Component, PropTypes } from 'react';
import TaskDetailView from './viewtask';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {
    getTheme,
    mdl,
    MKButton,
    MKColor,
    MKIconToggle
} from 'react-native-material-kit';

const moment = require('moment');

class Cards extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }

    constructor() {
        super();
    }

    show(item) {
        this.props.navigator.push({
            component: TaskDetailView,
            passProps: {
                store: this.props.store,
                data: item
            }
        })
    }

    render() {
        const {label, description, paid, amount, sessions} = this.props.data;
        let checkin = sessions.filter(item => item.checkin==true);

        let completed = (this.props.data.paid)
            ? <Text style={styles.colSmallText}>MYR {amount}</Text>
            : <Text style={styles.colSmallTextCompleted}>MYR {amount}</Text>

        return(
            <TouchableOpacity  style={styles.container} onPress={(id)=>this.show(this.props.data)}>
                <View style={styles.colMedium}>
                    <View style={styles.row}><Text style={styles.colMediumText}>{description}</Text></View>
                    <View style={styles.row}><Text style={styles.colMediumSubText}>{label}</Text></View>
                <View style={styles.row}><Text style={styles.colSmallSubText}>Sessions: {checkin.length}/{sessions.length}</Text></View>
                </View>
                <View style={styles.colSmall}>
                    <View style={styles.row}>
                        <Text style={(!this.props.data.paid) ? styles.colSmallText : styles.colSmallTextCompleted}>MYR {amount}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        height: 80
    },
    row: {
        flexDirection: 'row',
    },
    colMedium: {
        flex: 2,
        flexDirection: 'column',
    },
    colSmall: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    colMediumText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5
    },
    colMediumSubText: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 5
    },
    colSmallText: {
        fontSize: 24,
        fontWeight: '300',
        marginTop: 15,
        textAlign: 'right',
        color: '#81c04d',
        letterSpacing: -1
    },
    colSmallTextCompleted: {
        fontSize: 24,
        fontWeight: '300',
        marginTop: 15,
        letterSpacing: -1,
        textAlign: 'right',
        textDecorationLine: 'line-through',
        textDecorationColor: '#CCCCCC',
        color: '#999999',
    },
    colSmallSubText: {
        fontSize: 10,
        color: '#999999'
    }
})

export default Cards;

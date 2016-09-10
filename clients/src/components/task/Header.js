import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    toolbar: {
        backgroundColor:'#81c04d',
        paddingTop: 30,
        paddingBottom: 20,
        flexDirection: 'row'
    },
    toolbarTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '100',
        textAlign: 'center',
        flex: 1,
        lineHeight: 22
    },
    toolbarSpacer: {
        width: 50,
        textAlign: 'center'
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: '#DEDEDE'
    },
    label: {
        fontWeight: '600',
        textAlign: 'center'
    },
    description: {
        fontWeight: '200',
        fontSize: 12,
        textAlign: 'center'
    }
});

const Spacer = (props)=> {
    return (
        <Text style={styles.toolbarSpacer} onPress={()=>props.action()}>
            {props.children}
        </Text>
    )
}

class Header extends Component {
    static propTypes = {
        buttonAction: React.PropTypes.func.isRequired
    }
    constructor() {
        super();
    }
    close() {
        this.props.navigator.pop()
    }
    render() {
        const {data} = this.props
        return (
            <View style={styles.toolbar}>
                <Spacer/>
                    <Text style={styles.toolbarTitle}> {this.props.title} </Text>
                <Spacer text={this.props.buttonText} action={this.props.buttonAction.bind(this)}>
                    {this.props.children}
                </Spacer>
            </View>
        )
    }
}

export default Header;

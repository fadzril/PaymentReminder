import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';

import { TaskStore } from './src/stores/tasks';
import TaskView from './src/components/tasks';

const store = new TaskStore();

class SP extends Component {
    static initialRoute = {
        component: TaskView,
        passProps: { store: store }
    }

    renderScene(route, navigator) {
        return <route.component {...route.passProps} navigator={navigator}/>
    }

    configureScene(route, routeStack) {
        if (route.type === 'Modal')
            return Navigator.SceneConfigs.FloatFromBottom;
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                initialRoute={{
                    component: TaskView,
                    passProps: { store: store }
                }}
            />
        )
    }
}
AppRegistry.registerComponent('SP', ()=> SP);

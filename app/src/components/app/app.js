//'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicatorIOS,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

console.disableYellowBox = true;

import Login from './login';
import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingAuth: false,
            showProgress: false,
            isLoggedIn: false
        };

        //var deviceURI = 'https://dev1-proxy1.wdtest1.com:9443/53f76651-1f9c-4083-85f0-dbf7f5e95326';
        //deviceURI: 'https://qa1-proxy1.wdtest2.com:9443/9ebfcfef-ed18-4c24-8499-44723bfa8560',

        auth0 = {
            id_token: '',
            deviceURI: 'https://qa1-proxy1.wdtest2.com:9443/',
            getFilesURI: '/sdk/v2/filesSearch/parents?ids=',
            //getFilesURI: '/sdk/v2/filesSearch/parents?ids=root&limit=1000',
            rootID: 'root',
            parentID: 'root'
        };
    }

    render() {
        if (this.state.checkingAuth) {
            return (
                <View style={styles.container}>
                    <ActivityIndicatorIOS
                        animating={true}
                        size="large"
                        style={styles.loader}/>
                </View>
            )
        }

        if (this.state.isLoggedIn) {
            return (
                <AppContainer onLogOut={this.onLogOut.bind(this)}/>
            )
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            )
        }
    }

    onLogin() {
        console.log('onLogin');
        this.setState({
            isLoggedIn: true
        });
    }

    onLogOut() {
        console.log('onLogOut');
        this.setState({
            isLoggedIn: false
        });
    }
}

export default App;

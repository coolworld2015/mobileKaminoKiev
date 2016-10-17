'use strict';

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
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            test: auth0.id_token,
            username: 'kamino.web.team@gmail.com',
            password: 'Kamino1234'
        }
    }

    getUser() {
        if (this.state.username == undefined ||
            this.state.password == undefined) {
            this.setState({
                badCredentials: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch('https://wdc-qa1.auth0.com/oauth/ro', {
            method: 'POST',
            body: JSON.stringify({
                client_id: 'gpQeYeZGke7da9ag6bYpyJIZcaXIJxF2',
                connection: 'Username-Password-Authentication',
                device: '123456789',
                grant_type: 'password',
                scope: 'openid offline_access',
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {

                auth0.access_token = responseData.access_token;
                auth0.id_token = responseData.id_token;

                console.log(auth0);

                fetch('https://wdc-qa1.auth0.com/userinfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + auth0.access_token
                    }
                })
                    .then((response)=> response.json())
                    .then((responseData)=> {
                        auth0.user_id = responseData.user_id;

                        console.log('user_id - ' + auth0.user_id);

                        fetch('https://qa1-device.remotewd1.com/device/v1/user/' + auth0.user_id, {
                            method: 'GET',
                            headers: {
                                'Authorization': 'Bearer ' + auth0.id_token
                            }
                        })
                            .then((response)=> response.json())
                            .then((responseData)=> {
                                auth0.deviceId = responseData.data[0].deviceId;
                                console.log('deviceId - ' + auth0.deviceId);
                                this.props.onLogin().bind(this);

                            })
                            .catch((error)=> {
                                this.setState({
                                    badCredentials: true,
                                    showProgress: false
                                });
                            });


                    })
                    .catch((error)=> {
                        this.setState({
                            badCredentials: true,
                            showProgress: false
                        });
                    });


            })
            .catch((error)=> {
                this.setState({
                    badCredentials: true,
                    showProgress: false
                });
            });
    }

    render() {
        var errorCtrl = <View />;

        if (!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        if (!this.state.success && this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    {/*<Text style={styles.heading}>My Cloud</Text>*/}
                    <Image style={styles.logo}
                           source={require('../../../logo.png')}
                    />

                    <TextInput
                        onChangeText={(text)=> this.setState({
                            username: text,
                            badCredentials: false
                        })}
                        style={styles.loginInput}
                        value={this.state.username}
                        placeholder="Login">
                    </TextInput>
                    <TextInput
                        onChangeText={(text)=> this.setState({
                            password: text,
                            badCredentials: false
                        })}
                        style={styles.loginInput}
                        value={this.state.password}
                        placeholder="Password" secureTextEntry={true}>
                    </TextInput>
                    <TouchableHighlight
                        //onPress={this.onLoginPressed.bind(this)}
                        onPress={()=> this.getUser()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                    />
                </View>
            </ScrollView>
        )
    }

    onLoginPressed() {
        this.props.onLogin();
    }
}

const styles = StyleSheet.create({
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    container: {
        //backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        marginTop: 30,
        marginBottom: 30
    },
    heading: {
        fontSize: 25,
        marginTop: 20,
        marginBottom: 20
    },
    loginInput1: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 0,
        color: 'black'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Login;

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

class CollectionDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pushEvent: props.pushEvent
        };
    }
   // this.state.pushEvent
    getThumbnailURI(item, size = 400) {
        console.log(item);
        var deviceURI = 'https://dev1-proxy1.wdtest1.com:9443/53f76651-1f9c-4083-85f0-dbf7f5e95326';
        var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJUVkJOalJDUVRBNFFqTTNNRU00UkRWQlJESTVRVEJHTmtVeFF6SXlRVGt6T0RjNE5EVkZOQSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtZGV2MS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTdmODMxM2MzYzAyZmRlNTRlNDdmNTZlIiwiYXVkIjoiclVmNElqUHY3VnA1dVhIRjdEaUR4azNGWjNBMVlmN20iLCJleHAiOjE0NzYxMjYzMTMsImlhdCI6MTQ3NjA5MDMxM30.g3n6yJFEAvQSo8LXCQAZYeZaebmqrJVz348qiPvo4c42VhjRyGcwv4udpLDDRq7YmRoHyU2b3Vx029S_JnGvd4hCtHM_bL78rTQRft_Ulvc0XPpeCjn33W4xrVz6aF8U7ST8NffDwxW8kuU7-MM7_gXqjoE0Je7x-Xg3FJE3NBF_cFks51mp4y-dWpMNHl6f4Z_basDfeN9bng__6tlfNnetezA0tmObep3ZdxEd5kYlGQdBtV3MXrx1ERlMvp7baD6l84VHyXrVoePNMfc0I8bc2cJ60qFa7k0DpUBp0gg2mi50YDAsFuCbjr2LvPYGzvXfowBxb_VaYy9M39239Q';

        var fileId = item.id;
        var uri;


        uri = deviceURI +
            '/sdk/v2/files/' + fileId +
            '/content?width=' + size +
            '&height=' + size +
            '&access_token=' + access_token;
        console.log(uri);
        return uri;
    }

    render() {
        var pic;
        if (!this.state.pushEvent.extension || this.state.pushEvent.extension == '.txt') {
            pic = <Image
                source={require('../../../no-img.png')}
                resizeMode='stretch'
                style={styles.img}
            />
        } else {
            pic = <Image
                source={{uri: this.getThumbnailURI(this.state.pushEvent)}}
                resizeMode='stretch'
                style={styles.img}
            />
        }

        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingTop: 20,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>

                    {pic}

                    <Text style={styles.welcome}>
                        {this.state.pushEvent.name}
                    </Text>

                    <Text style={styles.welcome}>
                        {(this.state.pushEvent.size / 1024).toFixed(2)} Kb
                    </Text>

                    <Text style={styles.welcome}>
                        {this.state.pushEvent.mTime.split(':')[0]}
                    </Text>

                    <Text style={styles.welcome}>
                        ID: {this.state.pushEvent.id}
                    </Text>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 300,
        width: 270,
        borderRadius: 20,
        margin: 0
    },
    AppContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height: 65
    },
    heading: {
        fontSize: 30,
        margin: 10,
        marginBottom: 20
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 0,
        color: '#48BBEC'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
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
        paddingTop: 10
    }
});

export default CollectionDetails;

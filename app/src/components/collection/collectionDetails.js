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

    getThumbnailURI(item) {
        var size = 400;
        var deviceURI = auth0.deviceURI + auth0.deviceId;
        var fileId = item.id;
        var uri;

        uri = deviceURI +
            '/sdk/v2/files/' + fileId +
            '/content?minWidth=' + size +
            '&minHeight=' + size +
            '&access_token=' + auth0.id_token;
        return uri;
    }

    render() {
        var pic, extension;

        extension = this.state.pushEvent.extension;

        if (extension) {
            extension = extension.toLowerCase()
        }

        if (!extension || extension != '.jpg' && extension != '.jpeg' && extension != '.png'
            && extension != '.mov' && extension != '.mp4' && extension != '.m4v'
            && extension != '.avi' && extension != '.wmv' && extension != '.mkv') {
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
                        {this.state.pushEvent.mimeType}
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

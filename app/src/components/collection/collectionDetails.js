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
        //var deviceURI = 'https://dev1-proxy1.wdtest1.com:9443/53f76651-1f9c-4083-85f0-dbf7f5e95326';
        var deviceURI = 'https://qa1-proxy1.wdtest2.com:9443/9ebfcfef-ed18-4c24-8499-44723bfa8560';

        //var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJUVkJOalJDUVRBNFFqTTNNRU00UkRWQlJESTVRVEJHTmtVeFF6SXlRVGt6T0RjNE5EVkZOQSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtZGV2MS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTdmODMxM2MzYzAyZmRlNTRlNDdmNTZlIiwiYXVkIjoiclVmNElqUHY3VnA1dVhIRjdEaUR4azNGWjNBMVlmN20iLCJleHAiOjE0NzYxMjYzMTMsImlhdCI6MTQ3NjA5MDMxM30.g3n6yJFEAvQSo8LXCQAZYeZaebmqrJVz348qiPvo4c42VhjRyGcwv4udpLDDRq7YmRoHyU2b3Vx029S_JnGvd4hCtHM_bL78rTQRft_Ulvc0XPpeCjn33W4xrVz6aF8U7ST8NffDwxW8kuU7-MM7_gXqjoE0Je7x-Xg3FJE3NBF_cFks51mp4y-dWpMNHl6f4Z_basDfeN9bng__6tlfNnetezA0tmObep3ZdxEd5kYlGQdBtV3MXrx1ERlMvp7baD6l84VHyXrVoePNMfc0I8bc2cJ60qFa7k0DpUBp0gg2mi50YDAsFuCbjr2LvPYGzvXfowBxb_VaYy9M39239Q';
        //var access_token = 	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWkdNVEJFTVRsQk56Z3hNVEF4UmtKRVFUVkdOMEZHTkVVNE1EUTJNVE15TUVORE9VSkNOUSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtcWExLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1N2ZjMmM0NGY5ZTkzNGU3NTA5MDQ5OTIiLCJhdWQiOiJncFFlWWVaR2tlN2RhOWFnNmJZcHlKSVpjYVhJSnhGMiIsImV4cCI6MTQ3NjE3OTcwNSwiaWF0IjoxNDc2MTc2MTA1fQ.0PvVAKs2KWH8sqfjbQBd_gRmBZ5vazALD-mevhsavnhMo4ES9uZy7IGFRBdkNTZF8pDReWqdWm6JFQRlFED01Vdq7cePeMw2QXNFlNHbXj82v0kaDFnXdPYlccqCAuzf1d3wZVwOec_mhqDHt_KafK19oAIaMJ-pvbuYRq-ed4flhDJeLdtSckUR701Asqqym3B2j8oTTsX27gotofkQlswHvIi5m7SrnlMUaSF0QD7UBKqm0SzN0gvdY2Ug4xsMurK1hI0THXp8AUh7u8pQ_uZnJTKJvQz6YpnhgKgaq-tIRnihZkz1_uYLtZw4R2VocXbxESyK28P0AuNm-u-f5g';
        //var access_token = 	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWkdNVEJFTVRsQk56Z3hNVEF4UmtKRVFUVkdOMEZHTkVVNE1EUTJNVE15TUVORE9VSkNOUSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtcWExLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1N2ZjMmM0NGY5ZTkzNGU3NTA5MDQ5OTIiLCJhdWQiOiJncFFlWWVaR2tlN2RhOWFnNmJZcHlKSVpjYVhJSnhGMiIsImV4cCI6MTQ3NjE4MzM5MywiaWF0IjoxNDc2MTc5NzkzfQ.qECZxnBS1j3cc2g4rDF9kw203EHCuvA5m3sFvlYLvmBZx5p9W5nsXjx7QeA7nANXvHkNGYmvj0xKGvHBXyhfyp5uAyVy_RHCpPrsIZnze1iqXD2I1mxjtURvGBKya8EEIQzJU1ALVAxVIU056FhgGS0PzB0_VUF2Ft9RFWcOVabnAEK2FONnkem5a2FOag7eMKTssE1SANpEsuvC4eRuo0szpef9B6xXlvuiNJaeKW8JBz7H3916rPtLIFPdu1VM2Eg3oFocC7agiNkLVvJplmeZrS2Bm-573yqk5Hx8jZPvlYUQv_nwJEKdxfnxGKdfYluCbVxi-6V9czqfpMMVDw';
        var access_token = auth0.id_token;

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

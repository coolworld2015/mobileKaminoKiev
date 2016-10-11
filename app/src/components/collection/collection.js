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

import CollectionDetails from './collectionDetails';

class Collection extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            searchQuery: props.searchQuery,
            showProgress: true,
            resultsCount: 0
        };

        this.getCollection();
    }

    getCollection() {
        //var deviceURI = 'https://dev1-proxy1.wdtest1.com:9443/53f76651-1f9c-4083-85f0-dbf7f5e95326';
        var deviceURI = 'https://qa1-proxy1.wdtest2.com:9443/9ebfcfef-ed18-4c24-8499-44723bfa8560';

        var getFilesURI = '/sdk/v2/filesSearch/parents?ids=root&limit=28';

        //var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJUVkJOalJDUVRBNFFqTTNNRU00UkRWQlJESTVRVEJHTmtVeFF6SXlRVGt6T0RjNE5EVkZOQSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtZGV2MS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTdmODMxM2MzYzAyZmRlNTRlNDdmNTZlIiwiYXVkIjoiclVmNElqUHY3VnA1dVhIRjdEaUR4azNGWjNBMVlmN20iLCJleHAiOjE0NzYxMjYzMTMsImlhdCI6MTQ3NjA5MDMxM30.g3n6yJFEAvQSo8LXCQAZYeZaebmqrJVz348qiPvo4c42VhjRyGcwv4udpLDDRq7YmRoHyU2b3Vx029S_JnGvd4hCtHM_bL78rTQRft_Ulvc0XPpeCjn33W4xrVz6aF8U7ST8NffDwxW8kuU7-MM7_gXqjoE0Je7x-Xg3FJE3NBF_cFks51mp4y-dWpMNHl6f4Z_basDfeN9bng__6tlfNnetezA0tmObep3ZdxEd5kYlGQdBtV3MXrx1ERlMvp7baD6l84VHyXrVoePNMfc0I8bc2cJ60qFa7k0DpUBp0gg2mi50YDAsFuCbjr2LvPYGzvXfowBxb_VaYy9M39239Q';
        //var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWkdNVEJFTVRsQk56Z3hNVEF4UmtKRVFUVkdOMEZHTkVVNE1EUTJNVE15TUVORE9VSkNOUSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtcWExLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1N2ZjMmM0NGY5ZTkzNGU3NTA5MDQ5OTIiLCJhdWQiOiJncFFlWWVaR2tlN2RhOWFnNmJZcHlKSVpjYVhJSnhGMiIsImV4cCI6MTQ3NjE3OTcwNSwiaWF0IjoxNDc2MTc2MTA1fQ.0PvVAKs2KWH8sqfjbQBd_gRmBZ5vazALD-mevhsavnhMo4ES9uZy7IGFRBdkNTZF8pDReWqdWm6JFQRlFED01Vdq7cePeMw2QXNFlNHbXj82v0kaDFnXdPYlccqCAuzf1d3wZVwOec_mhqDHt_KafK19oAIaMJ-pvbuYRq-ed4flhDJeLdtSckUR701Asqqym3B2j8oTTsX27gotofkQlswHvIi5m7SrnlMUaSF0QD7UBKqm0SzN0gvdY2Ug4xsMurK1hI0THXp8AUh7u8pQ_uZnJTKJvQz6YpnhgKgaq-tIRnihZkz1_uYLtZw4R2VocXbxESyK28P0AuNm-u-f5g';
        var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWkdNVEJFTVRsQk56Z3hNVEF4UmtKRVFUVkdOMEZHTkVVNE1EUTJNVE15TUVORE9VSkNOUSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtcWExLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1N2ZjMmM0NGY5ZTkzNGU3NTA5MDQ5OTIiLCJhdWQiOiJncFFlWWVaR2tlN2RhOWFnNmJZcHlKSVpjYVhJSnhGMiIsImV4cCI6MTQ3NjE4MzM5MywiaWF0IjoxNDc2MTc5NzkzfQ.qECZxnBS1j3cc2g4rDF9kw203EHCuvA5m3sFvlYLvmBZx5p9W5nsXjx7QeA7nANXvHkNGYmvj0xKGvHBXyhfyp5uAyVy_RHCpPrsIZnze1iqXD2I1mxjtURvGBKya8EEIQzJU1ALVAxVIU056FhgGS0PzB0_VUF2Ft9RFWcOVabnAEK2FONnkem5a2FOag7eMKTssE1SANpEsuvC4eRuo0szpef9B6xXlvuiNJaeKW8JBz7H3916rPtLIFPdu1VM2Eg3oFocC7agiNkLVvJplmeZrS2Bm-573yqk5Hx8jZPvlYUQv_nwJEKdxfnxGKdfYluCbVxi-6V9czqfpMMVDw';

        fetch(deviceURI + getFilesURI, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                console.log(responseData.files);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.files.slice(3, 100)),
                    resultsCount: responseData.files.slice(3, 100).length,
                    responseData: responseData.files.slice(3, 100)
                });

            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            })
            .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
    }

    pressRow(rowData) {
        this.props.navigator.push({
            title: rowData.name,
            component: CollectionDetails,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    getThumbnailURI(item, size = 400) {
        //var deviceURI = 'https://dev1-proxy1.wdtest1.com:9443/53f76651-1f9c-4083-85f0-dbf7f5e95326';
        var deviceURI = 'https://qa1-proxy1.wdtest2.com:9443/9ebfcfef-ed18-4c24-8499-44723bfa8560';
        //var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJUVkJOalJDUVRBNFFqTTNNRU00UkRWQlJESTVRVEJHTmtVeFF6SXlRVGt6T0RjNE5EVkZOQSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtZGV2MS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTdmODMxM2MzYzAyZmRlNTRlNDdmNTZlIiwiYXVkIjoiclVmNElqUHY3VnA1dVhIRjdEaUR4azNGWjNBMVlmN20iLCJleHAiOjE0NzYxMjYzMTMsImlhdCI6MTQ3NjA5MDMxM30.g3n6yJFEAvQSo8LXCQAZYeZaebmqrJVz348qiPvo4c42VhjRyGcwv4udpLDDRq7YmRoHyU2b3Vx029S_JnGvd4hCtHM_bL78rTQRft_Ulvc0XPpeCjn33W4xrVz6aF8U7ST8NffDwxW8kuU7-MM7_gXqjoE0Je7x-Xg3FJE3NBF_cFks51mp4y-dWpMNHl6f4Z_basDfeN9bng__6tlfNnetezA0tmObep3ZdxEd5kYlGQdBtV3MXrx1ERlMvp7baD6l84VHyXrVoePNMfc0I8bc2cJ60qFa7k0DpUBp0gg2mi50YDAsFuCbjr2LvPYGzvXfowBxb_VaYy9M39239Q';
        //var access_token = 	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWkdNVEJFTVRsQk56Z3hNVEF4UmtKRVFUVkdOMEZHTkVVNE1EUTJNVE15TUVORE9VSkNOUSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtcWExLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1N2ZjMmM0NGY5ZTkzNGU3NTA5MDQ5OTIiLCJhdWQiOiJncFFlWWVaR2tlN2RhOWFnNmJZcHlKSVpjYVhJSnhGMiIsImV4cCI6MTQ3NjE3OTcwNSwiaWF0IjoxNDc2MTc2MTA1fQ.0PvVAKs2KWH8sqfjbQBd_gRmBZ5vazALD-mevhsavnhMo4ES9uZy7IGFRBdkNTZF8pDReWqdWm6JFQRlFED01Vdq7cePeMw2QXNFlNHbXj82v0kaDFnXdPYlccqCAuzf1d3wZVwOec_mhqDHt_KafK19oAIaMJ-pvbuYRq-ed4flhDJeLdtSckUR701Asqqym3B2j8oTTsX27gotofkQlswHvIi5m7SrnlMUaSF0QD7UBKqm0SzN0gvdY2Ug4xsMurK1hI0THXp8AUh7u8pQ_uZnJTKJvQz6YpnhgKgaq-tIRnihZkz1_uYLtZw4R2VocXbxESyK28P0AuNm-u-f5g';
        var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VWkdNVEJFTVRsQk56Z3hNVEF4UmtKRVFUVkdOMEZHTkVVNE1EUTJNVE15TUVORE9VSkNOUSJ9.eyJzY29wZSI6InJlYWQtb25seSByZWFkLXdyaXRlIG5hc19yZWFkX29ubHkgbmFzX3JlYWRfd3JpdGUgbmFzX29mZmxpbmVfYWNjZXNzIiwiaXNzIjoiaHR0cHM6Ly93ZGMtcWExLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1N2ZjMmM0NGY5ZTkzNGU3NTA5MDQ5OTIiLCJhdWQiOiJncFFlWWVaR2tlN2RhOWFnNmJZcHlKSVpjYVhJSnhGMiIsImV4cCI6MTQ3NjE4MzM5MywiaWF0IjoxNDc2MTc5NzkzfQ.qECZxnBS1j3cc2g4rDF9kw203EHCuvA5m3sFvlYLvmBZx5p9W5nsXjx7QeA7nANXvHkNGYmvj0xKGvHBXyhfyp5uAyVy_RHCpPrsIZnze1iqXD2I1mxjtURvGBKya8EEIQzJU1ALVAxVIU056FhgGS0PzB0_VUF2Ft9RFWcOVabnAEK2FONnkem5a2FOag7eMKTssE1SANpEsuvC4eRuo0szpef9B6xXlvuiNJaeKW8JBz7H3916rPtLIFPdu1VM2Eg3oFocC7agiNkLVvJplmeZrS2Bm-573yqk5Hx8jZPvlYUQv_nwJEKdxfnxGKdfYluCbVxi-6V9czqfpMMVDw';
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

    renderRow(rowData) {
        var pic;
        if (!rowData.extension || rowData.extension == '.txt') {
            pic = <Image
                source={require('../../../no-img.png')}
                resizeMode='stretch'
                style={styles.img1}
            />
        } else {
            pic = <Image
                source={{uri: this.getThumbnailURI(rowData)}}
                resizeMode='stretch'
                style={styles.img}
            />
        }

        return (
            <TouchableHighlight
                onPress={()=> this.pressRow(rowData)}
                underlayColor='#ddd'>

                <View style={styles.imgsList}>

                    {pic}

                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{fontWeight: 'bold', margin: 5}}>{rowData.name}</Text>
                        <Text style={{margin: 5}}>{rowData.mTime.split(':')[0]}</Text>
                        <Text style={{margin: 5}}>{(rowData.size / 1024).toFixed(2)} Kb.</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (event.nativeEvent.contentOffset.y <= -100) {

            this.setState({
                showProgress: true,
                resultsCount: event.nativeEvent.contentOffset.y
            });
            setTimeout(() => {
                this.getCollection()
            }, 300);
        }
    }

    render() {
        var errorCtrl = <View />;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator
                        size="large"
                        animating={true}/>
                </View>
            );
        }
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginTop: 60}}>
                    <TextInput style={{
                        height: 45,
                        marginTop: 4,
                        padding: 5,
                        backgroundColor: 'white',
                        borderWidth: 3,
                        borderColor: 'lightgray',
                        borderRadius: 0,
                    }}
                               onChangeText={(text)=> {
                                   var arr = [].concat(this.state.responseData);
                                   var items = arr.filter((el) => el.name.indexOf(text) != -1);
                                   this.setState({
                                       dataSource: this.state.dataSource.cloneWithRows(items),
                                       resultsCount: items.length,
                                   })
                               }}
                               placeholder="Search">
                    </TextInput>

                    {errorCtrl}

                </View>

                <ScrollView
                    onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}
                    style={{marginTop: 0, marginBottom: 0}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View style={{marginBottom: 49}}>
                    <Text style={styles.countFooter}>
                        {this.state.resultsCount} entries were found.
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'whitesmoke'
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 20,
        margin: 15
    },
    img1: {
        height: 100,
        width: 100,
        borderRadius: 5,
        margin: 15
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Collection;

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
        var deviceURI = auth0.deviceURI;
        var getFilesURI = auth0.getFilesURI;
        var access_token = auth0.id_token;

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
                    dataSource: this.state.dataSource.cloneWithRows(responseData.files.slice(3, 1000)),
                    resultsCount: responseData.files.slice(3, 1000).length,
                    responseData: responseData.files.slice(3, 1000)
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
        var deviceURI = auth0.deviceURI;
        var access_token = auth0.id_token;
        var fileId = item.id;
        var uri;

        uri = deviceURI +
            '/sdk/v2/files/' + fileId +
            '/content?width=' + size +
            '&height=' + size +
            '&access_token=' + access_token;

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

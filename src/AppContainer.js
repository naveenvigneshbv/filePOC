import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as RNFS from 'react-native-fs'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: '#541243'
    }
});

class AppContainer extends Component {
    state = {  
        data: '',
        isCreated: false,
    }

    componentDidMount() {
        this.fetchJSONData();
    }

    fetchJSONData() {
        fetch('http://api.jsonbin.io/b/5a94409273fb541c61a57ede')
        .then((response) => response.json())
        .then((responseJSON)=>{
            this.setState({
                data: responseJSON.data
            });
            this.createFileStructure(responseJSON);
        })
        .catch((err)=>console.log(err));
    }

    createFileStructure(obj) {
        var path = RNFS.ExternalStorageDirectoryPath +'/'+ obj.name + '.txt';
        RNFS.writeFile(path, obj.data, 'utf8')
        .then((success) => {
            console.log('File Written !!!');
            this.state.isCreated = true;
        })
        .catch((err) => console.log(err.message));
    }

    render() {
        return (
           <View style={styles.container}>
              <Text style={styles.text}>{this.state.data}</Text>
           </View> 
        );
    }
}

export default AppContainer;
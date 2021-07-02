import React, { Component } from 'react';
import {  StyleSheet, Text, View   } from 'react-native';
//import NetInfo from '@react-native-community/netinfo'
import Snackbar from 'react-native-snackbar';
import NetworkState, { Settings } from 'react-native-network-state'

export default class NetInfoComp extends Component {

  constructor() {
    super();
    this.state = {
      connection_Status: ""
    }
  }

  componentDidMount() {
    
  }

  

showSnackBar=(status)=>{
   
        Snackbar.show({
            text: 'You are '+status,

            backgroundColor:status=='Online'?'#00A300':'#fc0040',
            duration: Snackbar.LENGTH_SHORT,
          });
    
}



  render() {
    return (
      <View style={styles.container}>
        <NetworkState
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          onConnected={() =>{}}
           onDisconnected={() => this.showSnackBar('Offline')}

            // onDisconnected={() => {
            //     this.showSnackBar('Offline')
            //     Settings.openWifi()}}

         />
        {/* {this.showSnackBar()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});


import React,{Component} from 'react';
import {View,ActivityIndicator} from 'react-native';

export default class Loader extends Component{

    render(){
        return(
           this.props.isLoad?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color='#00BFFF'/>
            </View>
            :
            null
        )
    }
}
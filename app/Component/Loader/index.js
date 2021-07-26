import React,{Component} from 'react';
import {View,ActivityIndicator,Text} from 'react-native';
import {themeColor} from '../config'
import _get from 'lodash/get';

export default class Loader extends Component{

    render(){
        return(
           this.props.isLoad?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color={themeColor}/>
            <Text style={{fontWeight:'bold',color:themeColor}}>{_get(this.props,'text',' ')}</Text>
            </View>
            :
            null
        )
    }
}
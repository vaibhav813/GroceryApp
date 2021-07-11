
import {getData} from '../Component/Storage'
import Login from '../Screens/Login/Login'
import Home from '../Screens/Home'
import SplashScreen from 'react-native-splash-screen'
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  UNSAFE_componentWillMount(){
     
      this.checkAuth()
  }

  
   checkAuth=()=>{
        
   
    SplashScreen.hide()


     getData('token').then(res=>{
        console.log('**********************TOKEN***************',res)
             // setToken(res)
             if(res==null){
              this.props.navigation.navigate('Login')
             }
         else{
             this.props.navigation.navigate('tabHome')
         }
       
        
        })
      

 }


  render() {
    return null;
  }
}

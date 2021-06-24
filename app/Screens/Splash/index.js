import React, { Component } from 'react'; 
import {View,Text} from 'react-native'; 
import SplashScreen from 'react-native-splash-screen'
 
export default class WelcomePage extends Component {
 
    componentDidMount() {
        console.log('Splash Screen Here')
        SplashScreen.hide();
        this.props.navigation.navigate('Register');
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
// setTimeout(()=>{
//     SplashScreen.hide();
//     this.props.navigation.navigate('Register');
// },2000)
      
    }
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Hello Splash</Text>
            </View>
        )
    }
}
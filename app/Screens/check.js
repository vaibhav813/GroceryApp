import React,{Component} from 'react';
import  {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// import RdServices from "react-native-rd-services";

 

export default class MyOrder extends Component{

componentDidMount(){
  SplashScreen.hide();
  // console.log('RNMantraFingerPrint Obj ',RdServices)
  // this.rdServices()
}

//https://libraries.io/npm/react-native-rd-services
// rdServices=()=>{

//   RdServices.getFingerPrint("Mantra").then(result=>{


    
//       console.log('result', result);
//       const { status, message } = JSON.parse(result);
//       console.log('Status', status);
//       console.log('Status', message);

      
  

//   }
  
// );

// }

    render(){
      return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Check Screen</Text>
    </View>

      )



  
      
    }
  }
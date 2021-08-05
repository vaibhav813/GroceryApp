import React from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';
import {navigate} from '../RootNavigation'

const TabBar = ({
    props,
}) => {
    

    const navigateToFirstScreen=()=>{
        console.log('Props we have****** ',props)
        navigate('Home') ;
      }
   
      const navigateToSecondScreen=()=>{
       navigate('CartScreen') ;
     }
   
     const navigateToThirdScreen=()=>{
       navigate('MyOrderScreen') ;
     }
     const navigateToForthScreen=()=>{
        navigate('MyAccountScreen') ;
      }


    return(
    <View style={styles.TabBarMainContainer} >
  
    <TouchableOpacity onPress={navigateToFirstScreen} activeOpacity={0.6} style={styles.button} >
    
      <Text style={styles.TextStyle} > SCREEN 1 </Text>

    </TouchableOpacity>

    <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

    <TouchableOpacity onPress={navigateToSecondScreen} activeOpacity={0.6} style={styles.button} >
    
      <Text style={styles.TextStyle}> SCREEN 2 </Text>

    </TouchableOpacity>

    <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

    <TouchableOpacity onPress={navigateToThirdScreen} activeOpacity={0.6} style={styles.button} >
    
      <Text style={styles.TextStyle}> SCREEN 3 </Text>

    </TouchableOpacity>

    <View style={{height: 50, backgroundColor: '#fff', width: 2}} />

<TouchableOpacity onPress={navigateToForthScreen} activeOpacity={0.6} style={styles.button} >

  <Text style={styles.TextStyle}> SCREEN 4 </Text>

</TouchableOpacity>

</View>
);
    }

    const styles = StyleSheet.create({
 
        TabBarMainContainer :{
          justifyContent: 'space-around', 
          height: 50, 
          flexDirection: 'row',
          width: '100%',
        },
         
        button: {
          height: 50,
          paddingTop:5,
          paddingBottom:5,
          backgroundColor: '#00BCD4',
          justifyContent: 'center', 
          alignItems: 'center', 
          flexGrow: 1
        },
         
        TextStyle:{
            color:'#fff',
            textAlign:'center',
            fontSize: 20
        }
         
        });

export default TabBar;


import React,{Component} from 'react';
import  {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import MyOrdersComp from '../../Component/Orders/index';

export default class Cancelled extends Component{
constructor(props){
super(props)

}


render(){
    return(
<View style={styles.container}>
  
    {/* <MyOrdersComp type="Delivered" /> */}
    <MyOrdersComp type="Cancelled"/>
    {/* <MyOrdersComp type="Cancelled"/> */}
</View>
    )
}
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'center',
        alignItems:'center',
        padding:5
    },
   
})
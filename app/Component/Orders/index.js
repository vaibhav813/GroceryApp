import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import {themeColor} from '../../Component/config';

export default class MyOrdersComp extends Component{

render(){
    return(
        <TouchableOpacity style={styles.orderView}>
<View style={styles.orderView1}>
    <View style={{height:25,width:80,borderRadius:5,justifyContent:'center',alignItems:'center',backgroundColor:this.props.type=="Delivered"?themeColor:this.props.type=="Processing"?'#FFA500':"orangered"}}>
    <Text style={{color:'#fff'}}>{this.props.type}</Text>

    </View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'25%'}}>
        <Image style={{height:12,width:12}} source={require('../../assets/images/time.png')}/>
    <Text style={{color:'#808080'}}>15/06/2021</Text>
    </View>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
    <Text>Transaction ID </Text>
    <Text>Delivered To </Text>
    <Text>Total Payment </Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
    <Text style={{fontWeight:'700'}}>#3D4590</Text>
    <Text style={{fontWeight:'700'}}>Vaibhav Gupta </Text>
    <Text style={{fontWeight:'700'}}>$2000 </Text>
</View>
<View></View>
</TouchableOpacity>
    )
}

}
const styles = StyleSheet.create({
    orderView:{
        height:100,
        width:'100%',
        
        borderRadius:5,
        backgroundColor:'#fff',
        padding:10,
        marginTop:10
        
            },
            orderView1:{
                flexDirection:'row',
                justifyContent:'space-between',
               // borderWidth:1
        
            }
})
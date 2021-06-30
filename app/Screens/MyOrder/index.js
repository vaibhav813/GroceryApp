import React,{Component} from 'react';
import  {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import MyOrdersComp from '../../Component/Orders/index';

export default class MyOrder extends Component{
constructor(props){
super(props)

}

// orderView=()=>{
//     return(
// <TouchableOpacity style={styles.orderView}>
// <View style={styles.orderView1}>
//     <View style={{height:25,width:80,borderRadius:5,justifyContent:'center',alignItems:'center',backgroundColor:themeColor}}>
// <Text style={{color:'#fff'}}>Delivered</Text>

//     </View>
//     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'25%'}}>
//         <Image style={{height:12,width:12}} source={require('../../assets/images/time.png')}/>
//     <Text style={{color:'#808080'}}>15/06/2021</Text>
//     </View>
// </View>
// <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
//     <Text>Transaction ID </Text>
//     <Text>Delivered To </Text>
//     <Text>Total Payment </Text>
// </View>

// <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
//     <Text style={{fontWeight:'700'}}>#3D4590</Text>
//     <Text style={{fontWeight:'700'}}>Vaibhav Gupta </Text>
//     <Text style={{fontWeight:'700'}}>$2000 </Text>
// </View>
// <View></View>
// </TouchableOpacity>


//     )
// }

render(){
    return(
<View style={styles.container}>
   {/* {this.orderView()}
    {this.orderView()} */}
    <MyOrdersComp type="Delivered" />
    <MyOrdersComp type="Processing"/>
    <MyOrdersComp type="Cancelled"/>
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
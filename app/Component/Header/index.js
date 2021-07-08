import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,Platform,StatusBar } from 'react-native';
import {themeColor} from '../../Component/config';
import NetworkInfo from '../../Component/NetInfo/index'
import _get from 'lodash/get';
import * as RootNavigation from '../../Component/RootNavigation'

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

componentDidMount(){
    console.log('Header Props--- ',_get(this.props,'count',0))
}

renderCartView=()=>{
    return(
        <View>
        <TouchableOpacity style={styles.badge}>
            <Text style={{color:'#fff',fontSize:9,fontWeight:'900',fontFamily:'../../assets/fonts/BlackberryJamPersonalUse-rXOB.ttf'}}>{_get(this.props,'count',0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:50}} onPress={()=>{this.moveToCart()}}>
        
        <Image source={require('../../assets/images/user/white_cart.png')} style={styles.image}/>
        </TouchableOpacity>
        </View>
    )
}
moveToCart=()=>{
  console.log('Move to screen Cart')
  RootNavigation.navigate('ConfirmCartScreen',{})
}

  render() {
    return (
     
    <View>
    <StatusBar barStyle="light-content" backgroundColor={themeColor} />
    <NetworkInfo/>
      <View style={styles.headerView}>
      <View style={styles.view1}>
      <TouchableOpacity style={{height:35,width:50}} onPress={()=>{this.props.props.navigation.pop()}} >
      <Image source={require('../../assets/images/user/back_white.png')} style={[styles.image,{height:'100%'}]}/>
      </TouchableOpacity>
       
        </View>
        <View style={styles.midView}>
        <Text style={{color:'#fff',fontWeight:'700',fontSize:20,fontFamily:'../../assets/fonts/BlackberryJamPersonalUse-rXOB.ttf'}}> {this.props.title}{" "}</Text>
        </View>
        <View style={styles.view2}>
        {this.props.right?
            this.renderCartView():
            null
        }
       
        </View>
      </View>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
    headerView:{
        flexDirection:'row',
        padding:10,
        paddingTop:Platform.OS=='ios'?35:0,
        justifyContent:'space-between',
        backgroundColor:themeColor,
       //marginTop:Platform.OS=='ios'?15:5,
       width:'100%',
       height:Platform.OS=='ios'?100:60,
       //borderRadius:10
    },
    image:{
        height:30,
        width:30
    },
    view1:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5,
      //  borderWidth:1,
        paddingRight:0
    },
    midView:{
      flex:0.8,
      justifyContent:'center',
      alignItems:'center',
    },
    view2:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        padding:5,
       // borderWidth:1
    },
    badge:{
        width:20,height:20,
        borderRadius:15,backgroundColor:'#00A300',
        alignItems:'center',justifyContent:'center',
        right:'10%',top:'-15%',position:'absolute'
    }
})
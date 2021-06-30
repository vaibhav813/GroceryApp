import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,FlatList,Button } from 'react-native';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Snackbar from 'react-native-snackbar';
import {themeColor} from '../../Component/config';


export default class Home extends Component {
    constructor(props) {
        super(props)
this.state={
    list:[{"id":1,"name":"Bread","discount":"5%","before":1.20,"now":0.98,"count":1,"itemLeft":7},
    {"id":2,"name":"Bread","discount":"5%","before":1.20,"now":0.91,"count":1,"itemLeft":4},
    {"id":3,"name":"Bread","discount":"5%","before":1.20,"now":0.93,"count":1,"itemLeft":5}]
}
    }

componentDidMount(){

 //console.log('Get item here ',this.props.route.params.items)

    this.state.list.map(item=>{
        Object.assign(item,{itemPrice:0})
    })
   
}

     cartView = (item) => {
        console.log('Item in cart View ',item)
         let value=_get(item,'item',{});
       // let value = _get(this.props,'route.params.items',[])
        // let itemPrice = Number(_get(item,'item.count',1))*Number(_get(item,'item.now',0))
        let itemPrice = Number(_get(item,'item.count',1))*Number(_get(item,'item.price',0))
        return (
            <View style={styles.cartView}>
                <View style={styles.first}>
                    <View style={styles.percent}>
                        <Text style={{ color: 'orangered' }}>{_get(item,'item.discount','1%')}</Text>
                    </View>
                    <Image style={{ height: 55, width: 80, alignSelf: 'center' }} source={{uri:item.item.img}} />

                </View>
                <View style={styles.second}>
                    <Text style={{ fontWeight: '600', fontSize: 20, marginTop:5}}>{_get(item,'item.name','')}</Text>
                    <Text style={{ color: themeColor, marginTop: 10}}>${_get(item,'item.before','100')}/kg  <Text style={{ color: '#808080', }}> ${_get(item,'item.price','')}/kg</Text></Text>
                    <View style={{ backgroundColor: themeColor, width: 50, height: 1, top: '-9%' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 5 }}>
                        <Text style={{ fontWeight: '600', alignItems: 'center', marginTop: 10 }}>${itemPrice.toFixed(2)}</Text>

                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.button} onPress={()=>{this.increase(_get(item,'item',{}))}}><Text>+</Text></TouchableOpacity>
                            <Text style={{ alignSelf: 'center'}}>{_get(item,'item.count',0)}</Text>
                            <TouchableOpacity style={styles.button} onPress={()=>{this.decrease(_get(item,'item',{}))}}><Text>-</Text></TouchableOpacity>
                        </View>

                    </View>
                </View>
</View>

                
        )

        {/* <View style={styles.second}>
                    <Text style={{ fontWeight: '600', fontSize: 20, marginTop:5}}>{_get(item,'item.name','')}</Text>
                    <Text style={{ color: themeColor, marginTop: 10}}>${_get(item,'item.before','')}/kg  <Text style={{ color: '#808080', }}> ${_get(item,'item.now','')}/kg</Text></Text>
                    <View style={{ backgroundColor: themeColor, width: 50, height: 1, top: '-9%' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 5 }}>
                        <Text style={{ fontWeight: '600', alignItems: 'center', marginTop: 10 }}>${itemPrice.toFixed(2)}</Text>

                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.button} onPress={()=>{this.increase(_get(item,'item',{}))}}><Text>+</Text></TouchableOpacity>
                            <Text style={{ alignSelf: 'center'}}>{_get(item,'item.count',0)}</Text>
                            <TouchableOpacity style={styles.button} onPress={()=>{this.decrease(_get(item,'item',{}))}}><Text>-</Text></TouchableOpacity>
                        </View>

                    </View>
                </View>

            </View> */}
    }

    increase=(item)=>{
        let arr=[];
        if(!_isEmpty(item)){
        this.state.list.map(itemList=>{
       if(itemList.id==item.id){
      if(item.itemLeft==item.count){
       
         this.snackBar('Only '+item.itemLeft+' item available in stock.');
      }
      else{
        Object.assign(item,{count:item.count+1})
          
      }
      Object.assign(item,{itemPrice:item.count*item.now})
       arr.push(item)
       }
       else{
           arr.push(item)
       }
       
            

        })
        
        this.setState({itemList:arr})
            
        }
            }


    decrease=(item)=>{
if(!_isEmpty(item)){
    let arr=[];
    if(!_isEmpty(item)){
    this.state.list.map(itemList=>{
   if(itemList.id==item.id){
       if(item.count>1){
        Object.assign(item,{count:item.count-1})
       }
       else
       {
         Object.assign(item,{count:1})
       }
       Object.assign(item,{itemPrice:item.count*item.now})
       arr.push(item)
   }
   else{
       arr.push(item)
   }
   
        

    })
   
    this.setState({itemList:arr})
        
    }

}
    }


snackBar=(text)=>{
    Snackbar.show({
        text:text,
        duration: Snackbar.LENGTH_SHORT,
      });
}

    toAddress=()=>{
        this.props.navigation.navigate('AddressScreen')
    }

    subTotalView = () => {
        let itemArr = _get(this.state,'list',[]);
        let totalAmt=0;

        if(itemArr.length>0){
          itemArr.map(item=>{
              totalAmt=totalAmt+item.itemPrice;
              console.log('total Amt ',totalAmt)
          })
        }
        console.log('total Amt 2 ',totalAmt)

        return (
            <TouchableOpacity style={styles.subTotal} onPress={()=>{this.toAddress()}}>
                <View style={{ flex: 0.8}}>
                    <Text style={{fontSize:15,fontWeight:'600',color:'#fff'}}>Subtotal ₹ {isNaN(totalAmt)?0:totalAmt.toFixed(2)||0}</Text>
                    <Text style={{color:'#fff'}}>Proceed to checkout</Text>
                </View>
                <TouchableOpacity style={{ flex: 0.1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../assets/images/user/next_white.png')} style={{height:20,width:10}}/>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }


flatListView=()=>{
    return(
<FlatList 
style={{ width: '100%', borderWidth:0,height:10 }}
data={_get(this.props,'route.params.items',[])}
//data={this.state.list}
renderItem={item=>this.cartView(item)}
keyExtractor={item => item.id}
/>
    )
}


    render() {
        return (
            <View style={styles.container}>
                {this.flatListView()}
                {this.subTotalView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  justifyContent:'center',
        alignItems: 'center',
        padding: 5
    },
    cartTitle: {
        fontWeight: '700',
        fontSize: 20
    },
    cartView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 5,
        borderWidth: 0.5,
        borderColor: '#ccc',
        width: '100%',
        borderWidth:1,
        borderRadius:5,
        marginTop:5

    },
    first: {
        flex: 0.3,
        // borderWidth:1,
        height: '100%'
    },
    second: {
        flex: 0.7,
        // borderWidth:1,
        height: '100%'
    },
    percent: {
        height: 25, width: 40, borderRadius: 5, backgroundColor: '#ffe6e6', alignItems: 'center', justifyContent: 'center'
    },
    subTotal: {
        height: 50,
        width: '100%',
        backgroundColor:themeColor,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius:10,
        padding:10,
        marginTop:20,
        
    },
    button:{ height: 35, width: 35, borderRadius: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    buttonView:{ width: '40%', backgroundColor: '#ccc', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', padding: 2 }
})
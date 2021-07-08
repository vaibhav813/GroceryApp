import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native';
import Header from '../../Component/Header/index'
import { connect } from "react-redux";
import {themeColor,dangerRed} from '../../Component/config'
import _get from 'lodash/get';
import {getDataSaveList} from '../../action/commonAction'


 class ConfirmCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoad:false
    };
  }
  componentDidMount(){

      console.log('We Have Address ',this.props.savedAddress)
      console.log('We Have cart Items ',this.props.cartItems)
    //console.log('We Have Address Component did mount')
  }
  venderInfoCartItem=(item)=>{
      console.log('Get Item ion cart----',item)
      return(
          <View style={styles.venderInfoView}>
        <View style={styles.venderImageItem}>
        <View style={{flex:0.3,borderWidth:0}}>
            <Image style={{height:100,width:100,resizeMode:'center'}}  source={{uri:'https://i.ibb.co/LQmZb1D/muton.jpg'}}/>
            <TouchableOpacity style={styles.remove} onPress={()=>{this.removeItem(item)}}>
            <Image source={require('../../assets/images/user/delete.png')} style={{height:15,width:15,resizeMode:'contain'}}/>
                <Text> Remove</Text>
            </TouchableOpacity>
            </View>

            <View style={{flex:0.7,borderWidth:0,borderWidth:0,paddingLeft:10}}>
           
            <View style={{borderWidth:0,paddingBottom:0}} >
                <Text style={styles.titleName}>{_get(item,'Name','--')}</Text>
                <Text style={styles.blackText}>MRP ₹ <Text style={{textDecorationLine:'line-through',color:'#808080'}}>{_get(item,'MaxRate','--')}</Text> <Text style={{color:'#00A300'}}>{_get(item,'MinRate','--')}</Text></Text>
            </View>  


            <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:0}} >
                <Text style={styles.blackText}>Discount:</Text>
                <View style={styles.discountValue}>
                <Text style={{fontSize:10,fontWeight:'bold',color:'#fff'}}>50%</Text>
                </View>
            </View>  

            <View style={{flexDirection:'row',justifyContent:'flex-start',borderWidth:0,marginTop:0}} >
                <Text style={styles.blackText}>Count:</Text>
                <Text>{_get(item,'count',0)}</Text>
            </View>

            </View>

                       
        </View>
          </View>
      )
  }


  removeItem=(item)=>{
      let arr=[];
      console.log('Item to be delete ',item)

      this.props.cartItems.map(listItem=>{
      if(listItem.Id!=item.Id){
        arr.push(listItem)
      }
      })

      const key = "cartItems";
      const identifier = "SAVE_CART_ITEMS";
   
     this.props.getCartSaveList(
       arr,
       identifier,
       key,
     );


// console.log('removeItem from list ',arr)

  }
getTotalItems=()=>{
    let totalItems=0;
    this.props.cartItems.map(item=>{
     totalItems= totalItems + item.count;

    })
console.log('Get total Items ',totalItems)
return totalItems;
}

  calculateItems=()=>{
    let minPrice=0;
   if(this.props.cartItems && this.props.cartItems.length>0){
    this.props.cartItems.map(item=>{
        minPrice = minPrice + (item.MinRate*item.count);
    })
    console.log('Total Price of array ',minPrice)
   }
     
      return minPrice;
  }

gap=()=>{
    return(
        <View style={{height:10}}/>
    )
}

  orderSummery=()=>{
      return(
          <View style={styles.venderInfoView}>
          <Text style={{fontSize:20,fontWeight:'bold',color:themeColor}}> Order Summry</Text>
          {this.gap()}
         {this.rowTextView('','Total Items',this.getTotalItems())}
          {this.gap()}
          {this.rowTextView('','Total Price',this.calculateItems())}

          </View>
      )
  }

  rowTextView=(image,textTitle,text)=>{
      return(
          <View style={{width:'100%',flexDirection:'row'}}>
        <View style={{flex:0.5,flexDirection:'row',justifyContent:'flex-start'}}>
        <Image style={{height:20,width:20,resizeMode:'contain'}} source={require('../../assets/images/icons/orders.png')}/>
        <Text style={styles.bigText}>{textTitle}</Text>
        </View>
        <View style={{flex:0.5,alignItems:'flex-end',borderWidth:0}}>
        <Text>{text}</Text>
        </View>

          </View>
      )
  }

  deliveryAddress=()=>{
      let deliveryAddr='';
     // console.log('Address array *********** ',this.props.savedAddress)
 this.props.savedAddress && this.props.savedAddress.map(item=>{
   
 if(item.isSelect=="true"){
     deliveryAddr=item
     return;
 }
 })
return deliveryAddr.details;
  }


bottomView=()=>{

    
    return(
        <View style={{width:'100%',backgroundColor:'#fff',padding:10}}>
        <View style={{flexDirection:'row',}}>
        <View style={{flex:0.22,justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.bigText}>Deliver To:</Text>
        </View>
        <View  style={{flex:0.6,justifyContent:'center',alignItems:'center'}}>
         <Text numberOfLines={1}>{this.deliveryAddress()}</Text>
         </View>
         <View style={{flex:0.18,justifyContent:'center',alignItems:'center'}}>
         <Text style={{color:themeColor,size:15}} onPress={()=>this.props.navigation.navigate('AddressScreen')}>Change</Text>
         </View>
         </View>
         {this.gap()}
         <View style={{flexDirection:'row',justifyContent:'space-around'}}>

         <TouchableOpacity style={{borderColor:themeColor,borderWidth:1,alignItems:'center',justifyContent:'center',padding:10,width:'45%',borderRadius:10}}><Text style={{color:themeColor,fontWeight:'bold'}}>Continue Shopping</Text></TouchableOpacity>
         <TouchableOpacity style={{borderColor:themeColor,borderWidth:1,alignItems:'center',justifyContent:'center',padding:10,width:'45%',borderRadius:10}}><Text style={{color:themeColor,fontWeight:'bold'}} onPress={()=>{this.itemAllInfo()}}>Proceed To Pay</Text></TouchableOpacity>
         </View>

        </View>
    )
}



itemAllInfo=()=>{
    console.log('-------------------------------------------------------------------------------------------------------------------')
    console.log('Delivered on this address--- ',this.deliveryAddress())

    console.log('Get Items Details arr ',this.props.cartItems)

    console.log('Total Amount to Pay ',this.calculateItems())
    console.log('-------------------------------------------------------------------------------------------------------------------')
}


emptyView=()=>{
    return(
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

<Text style={{color:'red',fontWeight:'bold',fontSize:20}}>No Item In Cart</Text>
<TouchableOpacity style={{justifyContent:'center',alignItems:'center',padding:15,borderRadius:10,backgroundColor:themeColor,marginTop:20}} onPress={()=>{this.props.navigation.navigate('HomeScreen')}}>
    <Text style={{color:'#fff',fontWeight:'bold'}}>Countinue Shopping</Text>
</TouchableOpacity>
</View>

    )
}

renderView=()=>{
    return(
        <ScrollView contentContainerStyle={{flex:1,padding:10,paddingBottom:100}}>
      
      <View style={[styles.container,{paddingBottom:250}]}>
       <View style={{width:'100%',padding:0,borderWidth:0}}>
        {this.props.cartItems.map(item=>{
            return(
                this.venderInfoCartItem(item) 
            )
            })
            }
            </View>
           
            
            <View style={{width:'100%',marginBottom:50}}/>
            
             
         </View>    
        
        </ScrollView>
       
    )
  
}

  render() {
      console.log("this.props.cartItems ",this.props.cartItems)
    return (



    
     
  
      this.props.cartItems && this.props.cartItems.length>0?
        <View style={styles.container}>
        <Header title="Confirm Cart" props={this.props} right={false}/>
          {this.renderView()}
          {this.orderSummery()  }
            {this.bottomView() } 
            </View>
          :
          <View style={styles.container}>
          <Header title="Confirm Cart" props={this.props} right={false}/>
           {this.emptyView()}
          </View>
          
       

     
    
      
            
     
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
        
    },
    venderInfoView:{
        padding:10,
        width:'100%',
        borderWidth:0,
        backgroundColor:'#fff',
      marginTop:10,
      shadowOpacity:0.8,shadowColor:'#ccc',
      shadowOffset:{width:10,height:10},
      shadowRadius:10,
      elevation:5,
      borderRadius:10

        
    },
    venderImageItem:{
        flexDirection:'row',
        width:'100%',
        borderWidth:0
    },
    titleName:{
        fontSize:18,
        fontWeight:'700'
    },
    blackText:{fontWeight:'bold'},
   discountValue:{padding:5,backgroundColor:'#00A300',
   justifyContent:'center',alignItems:'center',
   width:80, borderRadius:5},
   bigText:{fontSize:15,fontWeight:'600'},
   remove:{padding:5,borderWidth:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',borderRadius:5,borderColor:dangerRed}
})




const mapStateToProps = (state) => ({
    //promoList: state.commonReducer.promoList,
    savedAddress: state.commonReducer.savedAddress,
    cartItems: state.commonReducer.cartItems,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getCartSaveList: (data,  identifier, key) =>
    dispatch(getDataSaveList(data,  identifier, key)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCart);
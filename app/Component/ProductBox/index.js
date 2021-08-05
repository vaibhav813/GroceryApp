import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';
import {themeColor,imageBaseUrl} from '../../Component/config'
import {connect} from 'react-redux'
import {navigate} from '../../Component/RootNavigation'
import {
    getDataSaveList,
    commonActionPost,
    getCommonDataAction,
  } from "../../action/commonAction";
  import _get from 'lodash/get'
//   import SnackBar from '../../Component/SnackBar'

class ProductBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message:''
    };
  }



  getVarientList =  (item) => {
//       console.log('Get iotem in varient list***** ',item.Id)
//     const url = "/ProductVariantList";

//     const constant = {
//       init: "VARIENT_LIST_INIT",
//       success: "VARIENT_LIST_SUCCESS",
//       error: "VARIENT_LIST_ERROR",
//     };
//     const identifier = "VARIENT_LIST";
//     const key = "varientList";
//     const type = "?ProductId=" + item.Id;

//     this.props.getCommonDataAction(
//       url,
//       constant,
//       identifier,
//       key,
//       type
//     );
//    //   console.log('Get varient List****** ',data)
//     // let Id = _get(this.props, "varientList[0].Id", 0);
//     console.log("*****VARIENT LIST********", this.props.varientList);
    //this.setState({ variantId: Id });
    // this.goToDetails(item,this.props.varientList)
    this.goToDetails(item)

    
  };



//   addToCart = (id) => {
//     //  console.log('User id--',this.props.loginData.Id,' Product Id ',this.state.productId,' Variant Id ',this.state.variantId)
//     let uId = _get(this.props.loginData,'Id',2);
//     console.log(
//       "Varient list when click AddTocart-----",
//       this.props.varientList
//     );
//     console.log('ADD TO CART***********',uId,' AND LIST*****',this.props.varientList)
//     const obj = {
//       UserId: uId,
//       ProductId: id,
//     //  VariantId: this.state.variantId,
//       VariantId:this.props.varientList[0].Id,
//       CartType: 1,
//       Qty: 1,
//     };
//     let url = "";
//     let constant = {};
//     let identifier = "";
//     let key = "";

//     //if(cart==1){

//     url = "/addtocart";
//     constant = {
//       init: "ADD_TO_CART_INIT",
//       success: "ADD_TO_CART_SUCCESS",
//       error: "ADD_TO_CART_ERROR",
//     };
//     identifier = "ADD_TO_CART";
//     key = "addtocart";

//     this.props.commonActionPost(obj, url, constant, identifier, key);
//    // console.log('ADD TO CART******** ',this.props.addtocart)
//     if(this.props.addtocart && this.props.addtocart.Msg){
//        this.handleSubmit(this.props.addtocart.Msg)
      
//     }
   // this.props.addtocart.Msg!=""
//   navigate("CartScreen",{});
//}

// renderSnackBar=()=>{
//     // return(
//     //     <SnackBar text={text}/>
//     // )
//     return(
//         this.state.message?
//         <SnackBar text={this.state.message}/>
//         :
//         null
//     )
   
//}

// handleSubmit=(text)=> {
//     this.props.handleInput(text);
//   }


goToDetails=(item)=>{
  //  console.log('Item value-- ',item)
    // navigate("DetailScreen",{item:item,vList:list})
    navigate("ProductDetailScreen",{item:item})

}


  renderView=()=>{
      {/* <TouchableOpacity style={styles.add} onPress={()=>this.getVarientList(item)}><Text style={{ color: "#fff",fontWeight:'900' }} */}
      let item = this.props.item;
     
    //  console.log('In product Box ',item)
      return(
        <TouchableOpacity style={styles.boxView} activeOpacity={0.9}  onPress={()=>{this.getVarientList(item)}} >
    
        <View style={{ height: 25, width: 40, borderRadius: 5, backgroundColor: '#ffe6e6', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: themeColor }}>5%</Text>
        </View>
        {/* <Image style={{ height: 90, width: 90, alignSelf: 'center' }} source={require('../../assets/images/green/g5.png')} /> */}
        <Image style={{ height: 90, width: 90, alignSelf: 'center' }} source={{uri:imageBaseUrl+item.Image}} />

   <View>
        <View style={{ width: '100%',  marginTop:10}}>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.Name}</Text>
            <Text style={{ color:'#ccc' }}>(in {item.CategoryName})</Text>
        </View>
 
        <View style={styles.priceAndAdd}>
            {/* <Text style={{  color: "green",flex:0.35,borderWidth:1 }}>₹{item.MaxRate}</Text> */}
            <Text style={{  color: themeColor,flex:0.4,borderWidth:0  }}>₹{item.MinRate}</Text>
            <TouchableOpacity style={styles.add} onPress={()=>this.getVarientList(item)}><Text style={{ color: "#fff",fontWeight:'900' }}
           
            >Add</Text></TouchableOpacity>
        </View>
        </View>
     
    </TouchableOpacity>


      )

    
  }

  render() {
    //  console.log("Add To CART@@@@@@@@ ****** ",this.props.addtocart.Msg)
    return (
        
      this.renderView()
     
    
       
    );
  }
}
const styles = StyleSheet.create({
    boxView: {
        // height: 200,
         width: '48%',
         borderRadius: 10,
         backgroundColor: '#fff',
         shadowOffset: {
             width: 5,
             height: 5
         },
         shadowOpacity: 0.1,
         elevation: 5,
         shadowColor: '#808080',
         padding: 10,
         marginTop: 6,
         marginLeft:6
     },
     priceAndAdd:
     {
         flexDirection: 'row',
         width: '100%',
        // padding: 5,
         justifyContent: 'space-between',
         alignItems: 'center',borderWidth:0,
         marginTop:10
        
         
     },
     add: {
        // height: 30,
        // width: 50,
        padding:5,
        flex:0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 8,
        backgroundColor: themeColor,
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.8,
        shadowColor: '#ccc'
         
    },
 
})

const mapStateToProps = (state) => ({
    //promoList: state.commonReducer.promoList,
    cartItems: state.commonReducer.cartItems || [],
    productDetails: state.commonReducer.productDetails,
    varientList: state.commonReducer.varientList,
    loginData: state.commonReducer.loginData,
    
    isLoad: state.commonReducer.isLoad,
    addtocart: state.commonReducer.addtocart,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getCartSaveList: (data, identifier, key) =>
      dispatch(getDataSaveList(data, identifier, key)),
    commonActionPost: (obj, url, constant, identifier, key) => {
      dispatch(commonActionPost(obj, url, constant, identifier, key));
    },
    getCommonDataAction: (url, constants, identifier, key, type) => {
      dispatch(getCommonDataAction(url, constants, identifier, key, type));
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProductBox);
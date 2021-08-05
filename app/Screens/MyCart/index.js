import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Button,
} from "react-native";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Snackbar from "react-native-snackbar";
import { imageBaseUrl, themeColor } from "../../Component/config";
import Header from "../../Component/Header/index";
import { connect } from "react-redux";
import { removeItemFromArr, addItemFromArr } from "../../Component/utils";
import {
  getDataSaveList,
  getCommonDataAction,
  commonActionGet,
  commonActionPost,
  
} from "../../action/commonAction";

import Loader from "../../Component/Loader";
import SnackBar from "../../Component/SnackBar";
import Toast from 'react-native-simple-toast';



class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
     

      cartItems: [],
      isLoad:false,
      snackBarVisible:true
    };
  }

  componentDidMount() {
    //  this.setState({ cartItems: this.props.cartItems });
  //  console.log('Get Cart List from Detail page******* ',this.props.route)
    const unsubscribed = this.props.navigation.addListener('focus', () => {
      this.callInitialsMethods();
   
   
    });
  //  this.callInitialsMethods();
  }

callInitialsMethods=()=>{
   this.getCartList(1);
  //   console.log(
  //     "In get Cart List********** ",
  //     this.props.getcartlist,
  //     " Cart Item ",
  //     this.props.cartItems
  //   );
  //   // this.props.getcartlist.map(item=>{
  //   //   Object.assign(item,{count:item.Qty,itemPrice:item.Qty*item.Rate})
  //   // })
     //this.setState({ cartItems: this.props.getcartlist });
    //  console.log('In get Cart List 1234 ',this.props.updateCart)
    //  console.log('In get Cart List 1234 ',this.props.updateCart.CList)
    
   // this.saveCartListLocally(this.props.updateCart.CList)
   
   this.setState({cartItems:this.props.getcartlist.CList},()=>{
    this.saveCartListLocally(this.props.getcartlist.CList)
  })
}



setListInState=()=>{
//  console.log('Set List In State----####### ',this.props.updateCart.CList)
this.setState({cartItems:this.props.updateCart.CList},()=>{
  this.saveCartListLocally(this.props.updateCart.CList)
})
  // this.setState({isLoad:true},()=>{ 
  //  this.setState({cartItems:this.props.updateCart.CList})
  // })
  this.saveCartListLocally(this.props.updateCart.CList)
}


  getCartList = (cart) => {
   // console.log("login Props are ", this.props.loginData);

    let Id = this.props.loginData.Id || 2;

    const url = "/getcartlist";
    const constant = {
      init: "CART_LIST_INIT",
      success: "CART_LIST_SUCCESS",
      error: "CART_LIST_ERROR",
    };

    const identifier = "CART_LIST";
    // const key = "getcartlist";
    const key = "updateCart";

    const type = "?UserId=" + Id + "&CartType=" + cart;
    this.setState({ isLoad:false })
    const data = this.props.getCommonDataAction(
      url,
      constant,
      identifier,
      key,
      type
    );
   
 
    
  };

  removeItemFromCart = (itemId) => {
this.setState({ isLoad:true })
    console.log("Remove Item Id------ ", itemId);
    const url = "/removecart";
    const constant = {
      init: "REMOVE_CART_ITEM_INIT",
      success: "REMOVE_CART_ITEM_SUCCESS",
      error: "REMOVE_CART_ITEM_ERROR",
    };
    const identifier = "REMOVE_CART_ITEM";
    //const key = "removeCartItem";updateCart
    const key = "updateCart";
    const obj = { Id: itemId };
    // const type = "?Id=" + itemId;

    this.props.commonActionPost(obj, url, constant, identifier, key);
    this.setListInState()
   // this.getCartList(1);
  };

  cartView = (item) => {
    console.log("Item in cart View ", item);
    let value = _get(item, "item", {});
    // let value = _get(this.props,'route.params.items',[])
    // let itemPrice = Number(_get(item,'item.count',1))*Number(_get(item,'item.now',0))
    let itemPrice =
      Number(_get(item, "item.Qty", 1)) * Number(_get(item, "item.Rate", 0));
    let discount = (_get(item, "item.MRP", 0)-_get(item, "item.Rate", 0))*100/_get(item, "item.MRP", 0)
//console.log('We have price discount per item ',discount)

    return (
      <View style={styles.cartView}>
        <View style={styles.first}>
          <View style={styles.percent}>
            <Text style={{ color: "orangered" }}>
              {/* {_get(item, "item.discount", "1%")} */}
              {discount}%
            </Text>
          </View>
          <View style={{height: 100, width: 90,marginTop:10}}>
          <Image style={{ height:'100%',width:'100%',resizeMode:'contain' }} source={{uri:imageBaseUrl+item.item.Image1}} />
          </View>
          {/* <Image
            style={{ height: 55, width: 80, alignSelf: "center" }}
            source={require("../../assets/images/cart/g3.png")}
          /> */}
        </View>
        <View style={styles.second}>
          <Text style={{ fontWeight: "600", fontSize: 20, marginTop: 5 }}>
            {_get(item, "item.Name", "")}{" "}
          </Text>
          <Text style={{ fontSize: 15, marginTop: 5, color: "#ccc" }}>
            in {_get(item, "item.ProductName", "")}{" "}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Text
              style={{ color: themeColor, textDecorationLine: "line-through" }}
            >
              ₹{_get(item, "item.MRP", "100")}{" "}
            </Text>
            <Text style={{ color: "#808080", marginLeft: 5 }}>
              ₹{_get(item, "item.Rate", "")}{" "}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 5,
            }}
          >
            <Text
              style={{ fontWeight: "600", alignItems: "center", marginTop: 10 }}
            >
              ₹ {itemPrice.toFixed(2)}
            </Text>

            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  //this.increaseCount(item.item);
                  this.updateCartItems(2,item.item.Id)
                }}
              >
                <Text>+</Text>
              </TouchableOpacity>
              <Text style={{ alignSelf: "center" }}>
                {_get(item, "item.Qty", 1)}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                 // this.decrease(item.item);
                 this.updateCartItems(1,item.item.Id)
                }}
              >
                <Text>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );

    {
    }
  };


  updateCartItems=async(type,id)=>{

    let Id = this.props.loginData.Id || 2;

    const url = "/updatecart";
    const constant = {
      init: "UPDATE_CART_VALUE_INIT",
      success: "UPDATE_CART_VALUE_SUCCESS",
      error: "UPDATE_CART_VALUE_ERROR",
    };

    const identifier = "UPDATE_CART_VALUE";
    const key = "updateCart";
    const obj={
      Id:id,
      UpdateType:type,
      CartType:1,
      UserId:Id
    }
    let data = await this.props.commonActionPost(obj, url, constant, identifier, key)
    // console.log('Get Cart data Response $$$$$$$ ',this.props.updateCart)
    this.setState({snackBarVisible:true})
    setTimeout(()=>{
      this.setState({snackBarVisible:false})
    },1000)
    
    this.setListInState()

    // this.callInitialsMethods()
    
   // setTimeout(()=>{
    //   console.log('Get Cart data Response $$$$$$$ ',this.props.updateCart)
    //   this.callInitialsMethods()
    // },1000)
   
  


  }


  increaseCount = (item) => {
    let arr = [];
    console.log("this.props.cartItems Increase ", item);
  //  Object.assign(item,{Qty:item.Qty+1})
  //  console.log('Items we have ',item)
  if ( this.props.getcartlist.length>0) {
   this.props.getcartlist.map((itemList) => {
        if (itemList.Id == item.Id) {
          console.log("In If Increse---", itemList.Id, "==", item.Id);
          Object.assign(item, { Qty: item.Qty + 1 });
          arr.push(item);
        } else {
          arr.push(item);
        }
      });
      console.log("Increse Arr ", arr);

      // this.setState({ cartItems: arr });
      // this.setState({ cartList: arr });
    }

    this.saveCartListLocally(arr);
  };

  decrease = (item) => {
    // console.log("Decrese Count ", item);
    // if (!_isEmpty(item)) {
    let arr = [];
    if ( this.props.getcartlist.length>0) {
      this.props.getcartlist.map((itemList) => {
        if (itemList.Id == item.Id) {
          if (item.Qty > 1) {
            Object.assign(item, { Qty: item.Qty - 1 });
          } else if (item.Qty == 1 || item.Qty <= 0) {
            //this.removeItemsFromCartList(item);
            //  removeItemFromArr(this.props.getcartlist, item);
              this.removeItemFromCart(item.Id)
            Object.assign(item, { Qty: 0 });
            //Object.assign(item.item, { Qty: item.item.Qty + 1 });
          } else {
            Object.assign(item, { Qty: item.Qty - 1 });
          }
          // Object.assign(item, {
          //   itemPrice: item.count * item.Rate,
          // });
          //  arr.push(item);
        } else {
          arr.push(item);
        }
      });
      console.log("Dec Arr--- ", arr);
    }

    this.saveCartListLocally(arr);
    // }
  };

  removeItemsFromCartList = (item) => {
    console.log(
      "Get array after Remove item ************ 1 ",
      this.props.getcartlist
    );
    let arr = removeItemFromArr(this.props.getcartlist, item);
    console.log("Get array after Remove item ************ ", arr);
    this.saveCartListLocally(arr);
  };

  
  saveCartListLocally = (arr) => {
    console.log(
      "*********************Saved Array Locally Successfully*********************",
      arr
    );
     this.setState({ cartList: arr });

    const key = "commonCartList";
    const identifier = "COMMON_CART_LIST";

    this.props.getCartSaveList(arr, identifier, key);
  };


  snackBar = (text) => {
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  toAddress = () => {
    this.props.savedAddress.length > 0
      ? 
      //this.props.navigation.navigate("ConfirmCartScreen")
      this.props.navigation.navigate("ConfirmCartScreen")
      : 
     // this.props.navigation.navigate("AddressScreen")
      this.props.navigation.navigate("ConfirmCartScreen")
      ;


  };

  subTotalView = () => {
    console.log("In subTotalView ");
    // let itemArr = _get(this.props, "getcartlist", []);
    let itemArr = _get(this.props, "updateCart.CList", []);
    let totalAmt = 0;
    console.log(
      "In subTotalView **************",
      _get(this.props, "getcartlist", [])
    );

    if (itemArr.length > 0) {
      itemArr.map((item) => {
        console.log("In subTotalView If Arr", item);
        totalAmt = totalAmt + item.Rate * item.Qty;
        console.log("total Amt ", totalAmt);
      });
    }

    console.log("In subTotalView Arr######", itemArr);
    return (
      <TouchableOpacity
        style={styles.subTotal}
        onPress={() => {
          this.toAddress();
        }}
      >
        <View style={{ flex: 0.8 }}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>
            Subtotal ₹ {isNaN(totalAmt) ? 0 : totalAmt.toFixed(2) || 0}{" "}
          </Text>
          <Text style={{ color: "#fff" }}>Proceed to checkout{" "}</Text>
        </View>
        <TouchableOpacity
          style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/images/user/next_white.png")}
            style={{ height: 20, width: 10 }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  flatListView = () => {
    //console.log("flatListView %%%%%%%%% ------------ ",this.state.cartItems);
   
    return (
      <FlatList
        style={{ width: "100%", borderWidth: 0, height: 10 }}
         data={_get(this.props.updateCart,'CList',[])}
        //data={list}
        renderItem={(item) => this.cartView(item)}
     //   ListFooterComponent={()=>this.subTotalView()}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
     //   ListEmptyComponent={()=> this.emptyView()}
      />
    );
  };

  emptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
          No Item In Cart{" "}
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            borderRadius: 10,
            backgroundColor: themeColor,
            marginTop: 20,
          }}
          onPress={() => {
            this.props.navigation.navigate("HomeScreen");
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Countinue Shopping{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };



  render() {
   console.log('In My Cart Response Props ',this.props)
    
    return (
      <View style={styles.container}>
        <Header title="My Cart" props={this.props} right={false} />
        { this.props.isLoad || this.state.isLoad? (
          <Loader isLoad={this.props.isLoad} text="Loading..." />
        ) : 
      //  _get(this.props.updateCart,'CList',[]) && _get(this.props.updateCart,'CList.length',[])>0?
   
          <View style={{ flex: 1, padding: 10 }}>
            {this.flatListView()}
            {/* <FlatList
            style={{ width: "100%", borderWidth: 1, height: 10 }}
             data={_get(this.props.updateCart,'CList',[])}
           // data={this.props.commonCartList}
            renderItem={(item) => this.cartView(item)}
        //   ListFooterComponent={()=>this.subTotalView()}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
        //   ListEmptyComponent={()=> this.emptyView()}
          /> */}
          {/* <SnackBar text={this.props.updateCart.Msg}/>  */}
            {this.subTotalView()} 
            
           {/* { this.state.snackBarVisible && _get(this.props.updateCart,'Msg','')?
    
           <SnackBar text={this.props.updateCart.Msg+" In My Cart"+this.state.snackBarVisible}/>
           
            :
            null} */}
          </View>
        
         
         }
      </View>
    );
  }

  componentWillUnmount(){
    console.log('*******************************My Cart component Will Unmount*******************************')
  }

      //  {/* <SnackBar text={this.props.updateCart.Msg+" My Cart"}/> */}
  // render() {
  //   console.log('Get Cart data Response $$$$$$$ ',this.props.updateCart.Msg)
  //   return (
  //     <View style={styles.container}>
  //       <Header title="My Cart" props={this.props} right={false} />
  //       { this.props.isLoad || this.state.isLoad? (
  //         <Loader isLoad={this.props.isLoad} text="Loading..." />
  //       ) : this.props.getcartlist &&
  //         _get(this.props, "getcartlist.length", []) > 0 ? (
  //         <View style={{ flex: 1, padding: 10 }}>
  //           {this.flatListView()}
  //           {this.subTotalView()} 
  //          { this.props.updateCart && this.props.updateCart.Msg ?
  //           <SnackBar text={this.props.updateCart.Msg}/>
  //           :
  //           null}
  //         </View>
  //       ) : (
  //         this.emptyView()
  //       )}
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent:'center',
    //  alignItems: 'center',
    // padding: 5
  },
  cartTitle: {
    fontWeight: "700",
    fontSize: 20,
  },
  cartView: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 5,
    borderWidth: 0.5,
    borderColor: "#ccc",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  first: {
    flex: 0.3,
    // borderWidth:1,
    height: "100%",
  },
  second: {
    flex: 0.7,
    // borderWidth:1,
    height: "100%",
  },
  percent: {
    height: 25,
    width: 40,
    borderRadius: 5,
    backgroundColor: "#ffe6e6",
    alignItems: "center",
    justifyContent: "center",
  },
  subTotal: {
    height: 50,
    width: "100%",
    backgroundColor: themeColor,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  button: {
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    width: "40%",
    backgroundColor: "#ccc",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
});

const mapStateToProps = (state) => ({
  //promoList: state.commonReducer.promoList,
  cartItems: state.commonReducer.cartItems,
  savedAddress: state.commonReducer.savedAddress || [],
  loginData: state.commonReducer.loginData,
  getcartlist: state.commonReducer.getcartlist || [],
  isLoad: state.commonReducer.isLoad || false,
  updateCart:state.commonReducer.updateCart||{},
  commonCartList:state.commonReducer.commonCartList,
});

const mapDispatchToProps = (dispatch) => ({
  getCartSaveList: (data, identifier, key) =>
    dispatch(getDataSaveList(data, identifier, key)),

  commonActionGet: (obj, url, constant, identifier, key) => {
    dispatch(commonActionGet(obj, url, constant, identifier, key));
  },
  commonActionPost: (obj, url, constant, identifier, key) => {
    dispatch(commonActionPost(obj, url, constant, identifier, key));
  },
  getCommonDataAction: (url, constants, identifier, key, type) => {
    dispatch(getCommonDataAction(url, constants, identifier, key, type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);




// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

// export default class index extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     console.log('Call My Cart Render Method*********************')
//     return (
//       <View>
//         <Text> index </Text>
//       </View>
//     );
//   }
// }


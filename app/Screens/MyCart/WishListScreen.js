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
import { themeColor, dangerRed } from "../../Component/config";
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

class WishListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          name: "Bread",
          discount: "5%",
          before: 1.2,
          now: 0.98,
          count: 1,
          itemLeft: 7,
        },
        {
          id: 2,
          name: "Bread",
          discount: "5%",
          before: 1.2,
          now: 0.91,
          count: 1,
          itemLeft: 4,
        },
        {
          id: 3,
          name: "Bread",
          discount: "5%",
          before: 1.2,
          now: 0.93,
          count: 1,
          itemLeft: 5,
        },
      ],

      cartItems: [],
    };
  }

  componentDidMount() {
    //  this.setState({ cartItems: this.props.cartItems });
    this.getWishList(2);

    // this.props.getcartlist.map(item=>{
    //   Object.assign(item,{count:item.Qty,itemPrice:item.Qty*item.Rate})
    // })
    // this.setState({ cartItems: this.props.getcartlist });

    console.log("All Items in Cart---- ", this.props.getcartlist);
  }

  getWishList = (cart) => {
    let Id = this.props.loginData.Id || 2;
    let url = "";
    let constant = {};
    let identifier = "";
    let key = "";
    let type = "";

    url = "/getcartlist";
    constant = {
      init: "WISH_LIST_INIT",
      success: "WISH_LIST_SUCCESS",
      error: "WISH_LIST_ERROR",
    };
    identifier = "WISH_LIST";
    key = "getwishlist";
    type = "?UserId=" + Id + "&CartType=" + cart;

    let data = this.props.getCommonDataAction(
      url,
      constant,
      identifier,
      key,
      type
    );

    // console.log('Gert List @@@@@@@ **** ',data)
  };

  removeItem = (item) => {
     console.log("Remove Item Id------ ", item);
    const url = "/removecart";
    const constant = {
      init: "REMOVE_WISHLIST_ITEM_INIT",
      success: "REMOVE_WISHLIST_ITEM_SUCCESS",
      error: "REMOVE_WISHLIST_ITEM_ERROR",
    };
    const identifier = "REMOVE_WISHLIST_ITEM_ITEM";
    const key = "removeWishListItem";
    const obj = { Id: item.Id };
    
    
    this.props.commonActionPost(obj, url, constant, identifier, key);
  };
  removeItemFromList=(item)=>{
  this.removeItem(item)
  this.setState({isLoad:true},()=>{
    console.log('Get Remove programe from list---- ',this.props)
  })
setTimeout(()=>{
    this.getWishList(2);
},1000)

  }

  cartView = (item) => {
    console.log("Item in cart View ", item);
    let value = _get(item, "item", {});
    // let value = _get(this.props,'route.params.items',[])
    // let itemPrice = Number(_get(item,'item.count',1))*Number(_get(item,'item.now',0))
    let itemPrice =
      Number(_get(item, "item.count", 1)) * Number(_get(item, "item.Rate", 0));
    let diff =
      Number(_get(item, "item.MRP", 0)) - Number(_get(item, "item.Rate", 0));
    let discount = (diff / Number(_get(item, "item.MRP", 0))) * 100;

    return (
      <View style={styles.cartMainView}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.percent}>
            <Text style={{ color: "orangered" }}>
              {isNaN(discount) ? 0 : discount.toFixed(0)}%
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cross}
            onPress={() => this.removeItemFromList(item.item)}
          >
            <Text style={{ color: dangerRed }}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cartView}>
          <View style={styles.first}>
            {/* <Image style={{ height: 55, width: 80, alignSelf: 'center' }} source={{uri:item.item.Image1}} /> */}
            <Image
              style={{
                height: 80,
                width: 80,
                borderWidth: 0,
                resizeMode: "contain",
              }}
              source={require("../../assets/images/cart/g3.png")}
            />
          </View>
          <View style={styles.second}>
            <Text
              style={{ fontWeight: "600", fontSize: 20, marginTop: 5 }}
              numberOfLines={1}
            >
              {_get(item, "item.Name", "")}{" "}
            </Text>
            <Text style={{ fontSize: 15, marginTop: 5, color: "#ccc" }}>
              in {_get(item, "item.ProductName", "")}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: themeColor,
                  textDecorationLine: "line-through",
                }}
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
                style={{
                  fontWeight: "600",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                ₹ {itemPrice.toFixed(2)}
              </Text>

              <TouchableOpacity style={styles.buttonView}>
                <Text style={{ color: "#fff" }}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );

    {
    }
  };

  increaseCount = (item) => {
    let arr = [];
    console.log("this.props.cartItems Increase ", item);
    // console.log('************this.props.cartItems arr ',this.props.cartItems,' and Item-- ',item)
    if (!_isEmpty(item)) {
      this.state.cartItems.map((itemList) => {
        if (itemList.Id == item.Id) {
          console.log("In If Increse---", itemList.Id, "==", item.Id);

          Object.assign(item, {
            count: item.count == isNaN(item.count) ? 0 : item.count + 1,
          });
          Object.assign(item, { Qty: item.Qty + 1 });

          // Object.assign(item, {
          //   itemPrice: item.Qty * item.MinRate,
          // });

          Object.assign(item, {
            itemPrice: item.count * item.Rate,
          });
          arr.push(item);
        } else {
          arr.push(item);
        }
      });
      // arr.push(item);
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
    if (!_isEmpty(item)) {
      this.state.cartItems.map((itemList) => {
        if (itemList.Id == item.Id) {
          if (item.count > 1) {
            Object.assign(item, { count: item.count - 1, Qty: item.Qty - 1 });
          } else if (item.count == 1 || item.count <= 0) {
            // addItemFromArr(this.props.cartItems,item.item)
            removeItemFromArr(this.state.cartItems, item);
            Object.assign(item, { count: 0, Qty: 0 });
            //Object.assign(item.item, { Qty: item.item.Qty + 1 });
          } else {
            Object.assign(item, { count: item.count - 1, Qty: item.Qty - 1 });
          }
          Object.assign(item, {
            itemPrice: item.count * item.Rate,
          });
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

  saveCartListLocally = (arr) => {
    // this.setState({ cartList: arr });
    this.setState({ isLoad: true });
    // const key = "cartItems";
    //    const identifier = "SAVE_CART_ITEMS";

    //   this.props.getCartSaveList(
    //     arr,
    //     identifier,
    //     key,
    //   );
  };

  snackBar = (text) => {
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  toAddress = () => {
    this.props.savedAddress.length > 0
      ? this.props.navigation.navigate("ConfirmCartScreen")
      : this.props.navigation.navigate("AddressScreen");
  };

  subTotalView = () => {
    console.log("In subTotalView ");
    let itemArr = _get(this.props, "cartItems", []);
    let totalAmt = 0;
    console.log(
      "In subTotalView **************",
      _get(this.props, "cartItems", [])
    );

    if (itemArr.length > 0) {
      itemArr.map((item) => {
        console.log("In subTotalView If Arr", item);
        totalAmt = totalAmt + item.itemPrice;
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
          <Text style={{ color: "#fff" }}>Proceed to checkout </Text>
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
    // let arr=[];
    // _get(this.state, "cartItems", []).map(item=>{
    //     // Object.assign(item, { itemPrice: item.MinRate, Qty: 1 });
    //     Object.assign(item, { itemPrice: item.MinRate, count: 1 });
    //   arr.push(item)
    // })
    //this.setState({cartItems:arr})
    console.log("In Flat List Array------------ ", this.props.getwishlist);
    return (
      <FlatList
        style={{ width: "100%", borderWidth: 0, height: 10 }}
        data={this.props.getwishlist}
        //data={this.state.list}
        renderItem={(item) => this.cartView(item)}
       // ListEmptyComponent={()=>this.emptyView()}
       
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    );
  };

  emptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
          No Item In Cart
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
            Countinue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  loader=()=>{
      return(
        <View style={{ flex: 1, justifyContent:'center',alignItems:'center' }}>
        <Loader isLoad={this.props.isLoad} text="Loading..." />
        <Text>Loading...</Text>
        </View>
      )
  }

  render() {
      console.log('Is Load----- ',this.props.isLoad)
    return (
      <View style={styles.container}>
        <Header title="Wishlist" props={this.props} right={false} />
        {
            this.props.isLoad?
            this.loader()
            :
            this.props.getwishlist && this.props.getwishlist.length>0?
            this.flatListView() 
            :
            this.emptyView() 
            }
      
          

      </View>
    );
  }
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
    flexDirection: "row",

    // backgroundColor: "#fff",
    // borderWidth: 0.5,
    // borderColor: "#ccc",
    // borderWidth: 1,
    // borderRadius: 5,

    width: "100%",
  },
  cartMainView: {
    width: "100%",
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  first: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:1,
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
    backgroundColor: themeColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  cross: {
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: dangerRed,
  },
});

const mapStateToProps = (state) => ({
  //promoList: state.commonReducer.promoList,
  cartItems: state.commonReducer.cartItems,
  savedAddress: state.commonReducer.savedAddress || [],
  loginData: state.commonReducer.loginData,
  getwishlist: state.commonReducer.getwishlist || [],
  removeWishListItem:state.commonReducer.removeWishListItem,
  isLoad:state.commonReducer.isLoad,
});

const mapDispatchToProps = (dispatch) => ({
  getCartSaveList: (data, identifier, key) =>
    dispatch(getDataSaveList(data, identifier, key)),

  commonActionGet: (obj, url, constant, identifier, key) => {
    dispatch(commonActionGet(obj, url, constant, identifier, key));
  },
  getCommonDataAction: (url, constants, identifier, key, type) => {
    dispatch(getCommonDataAction(url, constants, identifier, key, type));
  },
  commonActionPost: (obj, url, constant, identifier, key) => {
    dispatch(commonActionPost(obj, url, constant, identifier, key));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListScreen);

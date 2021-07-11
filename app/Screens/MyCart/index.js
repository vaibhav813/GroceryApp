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
import { themeColor } from "../../Component/config";
import Header from "../../Component/Header/index";
import { connect } from "react-redux";
import {removeItemFromArr,addItemFromArr} from '../../Component/utils'
import {getDataSaveList} from '../../action/commonAction'

class MyCart extends Component {
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

      cartItems:[]
    };
  }

  componentDidMount() {
   // console.log("Get item here ", this.props.cartItems);

    // this.props.cartItems &&
    //   this.props.cartItems.map((item) => {
    //     Object.assign(item, { itemPrice: item.MinRate, Qty: 1 });
    //   });
     this.setState({cartItems:this.props.cartItems})
  }

  cartView = (item) => {
    console.log("Item in cart View ", item);
    let value = _get(item, "item", {});
    // let value = _get(this.props,'route.params.items',[])
    // let itemPrice = Number(_get(item,'item.count',1))*Number(_get(item,'item.now',0))
    let itemPrice =
      Number(_get(item, "item.count", 1)) * Number(_get(item, "item.MinRate", 0));
    return (
      <View style={styles.cartView}>
        <View style={styles.first}>
          <View style={styles.percent}>
            <Text style={{ color: "orangered" }}>
              {_get(item, "item.discount", "1%")}
            </Text>
          </View>
          {/* <Image style={{ height: 55, width: 80, alignSelf: 'center' }} source={{uri:item.Image}} /> */}
          <Image
            style={{ height: 55, width: 80, alignSelf: "center" }}
            source={require("../../assets/images/cart/g3.png")}
          />
        </View>
        <View style={styles.second}>
          <Text style={{ fontWeight: "600", fontSize: 20, marginTop: 5 }}>
            {_get(item, "item.Name", "")}{" "}
          </Text>
          <Text style={{ color: themeColor, marginTop: 10 }}>
            ₹ {_get(item, "item.MaxRate", "100")}{" "}
            <Text style={{ color: "#808080" }}>₹ {_get(item, "item.MinRate", "")}{" "}</Text>
          </Text>
          <View
            style={{
              backgroundColor: themeColor,
              width: 50,
              height: 1,
              top: "-9%",
            }}
          />
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
                  this.increaseCount(item.item);
                }}
              >
                <Text>+</Text>
              </TouchableOpacity>
              <Text style={{ alignSelf: "center" }}>
                {_get(item, "item.count", 0)}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.decrease(item.item);
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

  increaseCount = (item) => {
    let arr = [];
  ///  console.log('this.props.cartItems Increase ',item)
   // console.log('************this.props.cartItems arr ',this.props.cartItems,' and Item-- ',item)
    if (!_isEmpty(item)) {
      this.state.cartItems.map((itemList) => {
        if (itemList.Id == item.Id) {
          console.log("In If Increse---",itemList.Id ,'==', item.Id)
          // console.log('itemList.Id == item.item.Id ',itemList.Id, ' == ',item.item.Id)
          //   if(item.itemLeft==item.count){

          //      this.snackBar('Only '+item.itemLeft+' item available in stock.');
          //   }
          //   else{
          //     Object.assign(item,{count:item.count+1})

          //   }
          
         
          Object.assign(item, { count: item.count + 1 });
         // Object.assign(item, { Qty: item.Qty + 1 });
         
       
          // Object.assign(item, {
          //   itemPrice: item.Qty * item.MinRate,
          // });

          Object.assign(item, {
            itemPrice: item.count * item.MinRate,
          });
          arr.push(item);
          
        
        } 
        else {
           
            arr.push(item);
        }
      });
     // arr.push(item);
      console.log('Increse Arr ',arr)

     // this.setState({ cartItems: arr });
     // this.setState({ cartList: arr });
    }

    this.saveCartListLocally(arr)

  };

  decrease = (item) => {
   // console.log("Decrese Count ", item);
    // if (!_isEmpty(item)) {
      let arr = [];
      if (!_isEmpty(item)) {
        this.state.cartItems.map((itemList) => {
          if (itemList.Id == item.Id) {
            if (item.count > 1) {
              Object.assign(item, { count: item.count - 1 });
            } 
            else if (item.count == 1) {
             // addItemFromArr(this.props.cartItems,item.item)
               removeItemFromArr(this.state.cartItems,item)
               Object.assign(item, { count: 0 });
              //Object.assign(item.item, { Qty: item.item.Qty + 1 });
            
            } else {
              Object.assign(item, { count: item.count - 1 });
            }
            Object.assign(item, {
              itemPrice: item.count * item.MinRate,
            });
          //  arr.push(item);
          } 
          else {
            arr.push(item);
          }
        });
        console.log("Dec Arr--- ", arr);
       // this.setState({ cartItems: arr });
      //  this.setState({ cartList: arr });
       
      }

      this.saveCartListLocally(arr)
  // }
  };


 saveCartListLocally=(arr)=>{

  // this.setState({ cartList: arr });
  this.setState({ isLoad: true });
  // const key = "cartItems";
  //    const identifier = "SAVE_CART_ITEMS";
  
  //   this.props.getCartSaveList(
  //     arr,
  //     identifier,
  //     key,
  //   );

 }

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
    console.log("In subTotalView **************", _get(this.props, "cartItems", []));

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
     // let arr=[];
    // _get(this.state, "cartItems", []).map(item=>{
    //     // Object.assign(item, { itemPrice: item.MinRate, Qty: 1 });
    //     Object.assign(item, { itemPrice: item.MinRate, count: 1 });
    //   arr.push(item)
    // })
//this.setState({cartItems:arr})
console.log('In Flat List Array------------ ',this.state.cartItems)
    return (
      <FlatList
        style={{ width: "100%", borderWidth: 0, height: 10 }}
        data={this.state.cartItems}
        //data={this.state.list}
        renderItem={(item) => this.cartView(item)}
        keyExtractor={(item, index) => {
         return  index.toString();
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="My Cart" props={this.props} right={false} />
        {this.props.cartItems &&
        _get(this.props, "cartItems.length", []) > 0 ? (
          <View style={{ flex: 1, padding: 10 }}>
            {this.flatListView()}
            {this.subTotalView()}
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "orangered", fontWeight: "bold" }}>
              No Item in cart
            </Text>
          </View>
        )}
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
});

const mapDispatchToProps = (dispatch) => ({
  getCartSaveList: (data,  identifier, key) =>
  dispatch(getDataSaveList(data,  identifier, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);

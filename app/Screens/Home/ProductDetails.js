import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  getDataSaveList,
  commonActionPost,
  getCommonDataAction,
} from "../../action/commonAction";
import { dangerRed, themeColor,success,BASE_URL } from "../../Component/config";
import { connect } from "react-redux";
import Header from "../../Component/Header/index";
import { imageBaseUrl } from "../../Component/config";
import _get from "lodash/get";
import HTML from "react-native-render-html";
import { DetailTextSkelton, ListItems } from "../../Component/SkeltonRow";
import Loader from "../../Component/Loader";
import SnackBar from '../../Component/SnackBar'
import axios from 'axios';
import ProductBox from '../../Component/ProductBox'


// let images = [
//   {img: 'https://i.ibb.co/LQmZb1D/muton.jpg'},
//   {img: 'https://i.ibb.co/nCc4bTD/watch2.jpg'},
//   {img: 'https://i.ibb.co/nCc4bTD/watch2.jpg'},
// ];

const otherData = [
  {
    name: "Fastrack Watch",
    price: 2000,
    img: "https://i.ibb.co/nCc4bTD/watch2.jpg",
  },
  {
    name: "Fastrack Watch",
    price: 2000,
    img: "https://i.ibb.co/nCc4bTD/watch2.jpg",
  },
  {
    name: "Fastrack Watch",
    price: 2000,
    img: "https://i.ibb.co/nCc4bTD/watch2.jpg",
  },
  {
    name: "Fastrack Watch",
    price: 2000,
    img: "https://i.ibb.co/nCc4bTD/watch2.jpg",
  },
];

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
      item: {},
      productId: 0,
      variantId: 0,
      Images: [],
      showSnackBar:false,
      color:'#808080',
      message:'Something is wrong! Please try again.',
      varientList:[],
      relatedItem:[]
    };
    this.flatListRef = null;
  }
  componentDidMount() {
  
    this.initialCallingMethods(this.props.route.params.item)
    this.getItemDetail(this.props.route.params.item.Id, this.state.variantId);
  }

initialCallingMethods=(item)=>{
    this.setState({ productId: item.Id});
 // this.getVarientList(this.props.route.params.item.Id);
  // this.getItemDetail(this.props.route.params.item.Id, 0);
  
 
  //this.setState({varientListState:this.props.route.params.vList})

  // let Id = _get(this.props, "route.params.vList[0].Id", 0);
  // console.log('Varient list  Id in component did mount********',Id)
  //this.getItemDetail(this.props.route.params.item.Id, 0);
  this.getVarientList(item.Id)
  this.getRelatedProducts();
//   this.getItemDetail(this.props.route.params.item.Id, this.state.variantId);
  this.setState({ item: item });
} 
 

getRelatedProducts=()=>{

    const vendorId=this.props.loginData.Id||2
  const obj={
        VendorId:vendorId, //It will be change
      	ProductId:this.props.route.params.item.Id,
    }
   


    const url = "/relatedproducts";
   const constant = {
      init: "RELATED_PRODUCTS_INIT",
      success: "RELATED_PRODUCTS_SUCCESS",
      error: "RELATED_PRODUCTS_ERROR",
    };
   const identifier = "RELATED_PRODUCTS";
   const key = "relatedProductsList";
   const type="?ProductId="+this.props.route.params.item.Id+"&VendorId="+vendorId;

//    const data =  this.props.getCommonDataAction(
//       url,
//       constant,
//       identifier,
//       key,
//       type
//     );
   // console.log('Get Related Data from Axios******** ',data)

   //let data= await this.props.commonActionPost(obj, url, constant, identifier, key);
console.log('Url---',BASE_URL+url+type)
axios.post(BASE_URL+url+type).then(res=>{
    this.setState({relatedItem:res.data.data})
    console.log('Get Related Products#########',res)
}).catch(err=>{
    console.log('Get Related Products Err #########',err)
})


//     console.log('In get related project---- ',data)
}


  getCartList = (cart) => {
    //   const obj={
    //     UserId:this.props.loginData.Id,
    //   	CartType:cart,
    // }
    // let Id = this.props.loginData.Id || 2;
    // let url = "";
    // let constant = {};
    // let identifier = "";
    // let key = "";
    // let type = "";

    // url = "/getcartlist";
    // constant = {
    //   init: "CART_LIST_INIT",
    //   success: "CART_LIST_SUCCESS",
    //   error: "CART_LIST_ERROR",
    // };
    // identifier = "CART_LIST";
    // key = "getcartlist";
    // type = "?UserId=" + Id + "&CartType=" + cart;

    // const data = this.props.getCommonDataAction(
    //   url,
    //   constant,
    //   identifier,
    //   key,
    //   type
    // );
    // console.log('Add To Cart Data-------  Add to cart props---- ',this.props.addtocart)
    this.setState({showSnackBar:true})
    this.setState({showSnackBar:false})
  //  this.setState({showSnackBar:true})
  // this.setState({showSnackBar:false})

   
   // this.props.navigation.navigate("CartScreen",{itemList:this.props.getcartlist});
  };

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

    const data = this.props.getCommonDataAction(
      url,
      constant,
      identifier,
      key,
      type
    );

  };

  getVarientList = async(PID) => {
    const url = "/ProductVariantList";

    // const constant = {
    //   init: "VARIENT_LIST_INIT",
    //   success: "VARIENT_LIST_SUCCESS",
    //   error: "VARIENT_LIST_ERROR",
    // };
    // const identifier = "VARIENT_LIST";
    // const key = "varientList";
    const type = "?ProductId=" + PID;



    // const data =  this.props.getCommonDataAction(
    //   url,
    //   constant,
    //   identifier,
    //   key,
    //   type
    // );

    // console.log("*****VARIENT LIST********11111", data);
    // setTimeout(()=>{
    //   if(this.props.varientList!=undefined){
    //     let Id = this.props.varientList[0].Id||0;
    //     this.setState({ variantId: Id });
    //    }
    // },1000)

    

  //  console.log('In Varient List Method******** ')
axios.get(BASE_URL+url+type).then(res=>{
    console.log('Get Varient List AXIOS******** ',res)
    let list = res.data.data;
         
         this.setState({varientList:list},()=>{
            this.setState({ variantId: list[0].Id })
         })
    
    //this.getRelatedProducts()
}).catch(err=>{
    console.log('Product Details Err ',err)
})

    
    
  };

  getItemDetail = (PId, VID) => {

   // let Id = _get(this.props, "varientList[0].Id", 0);
    console.log("*****VARIENT LIST********", this.state.varientList);
    console.log("*****VARIENT LIST ID ********", VID);
  //  this.setState({ variantId: VID });


    const url = "/productdetails";
    const constant = {
      init: "PRODUCT_DETAILS_INIT",
      success: "PRODUCT_DETAILS_SUCCESS",
      error: "PRODUCT_DETAILS_ERROR",
    };
    const identifier = "PRODUCT_DETAILS";
    const key = "productDetails";
    const type = "?ProductId=" + PId + "&VariantId=" + VID;

   this.props.getCommonDataAction(
      url,
      constant,
      identifier,
      key,
      type
    );
    this.pushImages();

    
  };

  pushImages = () => {
    // console.log('imageBackgroundScrolls Items ',_get(this.props,'productDetails',{}))
    // let arr=[];
  //  let productImage =_get(this.props.productDetails,'ProductImage',[])
  //   this.setState({ Images: productImage});

  let productImage =_get(this.props.productDetails,'ProductImage',[])
    this.setState({ Images: productImage});
    this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true})
    // console.log('Images in Array########### 1 ',arr)
    // console.log('BackgroundImages imageBackgroundScrolls in Array########### 2 ',this.state.Images)
  };

  addToCart = async(cart) => {
    //  console.log('User id--',this.props.loginData.Id,' Product Id ',this.state.productId,' Variant Id ',this.state.variantId)
    console.log(
      "Varient list when click AddTocart-----",
      this.props.varientList
    );
    const obj = {
      UserId: _get(this.props.loginData,'Id',2),
      ProductId: this.state.productId,
      VariantId: this.state.variantId,
     // VariantId:this.props.varientList[0].Id,
      CartType: cart,
      Qty: 1,
    };
    let url = "";
    let constant = {};
    let identifier = "";
    let key = "";

    //if(cart==1){

    url = "/addtocart";
    constant = {
      init: "ADD_TO_CART_INIT",
      success: "ADD_TO_CART_SUCCESS",
      error: "ADD_TO_CART_ERROR",
    };
    identifier = "ADD_TO_CART";
    key = "addtocart";

    let data= await this.props.commonActionPost(obj, url, constant, identifier, key);
    
    this.getCartList(cart);
    // setTimeout(() => {
    //   this.getCartList(cart);
    // }, 1000);
    
    
    
    //}
    // else{

    //    url="/addtocart"
    //    constant =
    //   {init:"ADD_TO_WISHLIST_INIT",
    //     success:"ADD_TO_WISHLIST_SUCCESS",
    //   error:"ADD_TO_WISHLIST_ERROR"
    //   }
    //    identifier = "ADD_TO_WISHLIST";
    //    key="addtowishlist";

    //    this.props.commonActionPost(obj,url,constant,identifier,key)
    //   this.getCartList(cart);
    //   this.props.navigation.navigate("WishListScreen")

    // }
  };

  addToWishList = (cart) => {
    console.log(
      "ADD TO WISH LIST*******",
      "User id--",
      this.props.loginData.Id,
      " Product Id ",
      this.state.productId,
      " Variant Id ",
      this.state.variantId
    );
    console.log(
      "Varient list when click WishList-----",
      this.props.varientList
    );
    const obj = {
      UserId: this.props.loginData.Id || 2,
      ProductId: this.state.productId,
       VariantId: this.state.variantId,
     // VariantId:this.props.varientList[0].Id,
      CartType: cart,
      Qty: 1,
    };
    const url = "/addtocart";
    const constant = {
      init: "ADD_TO_WISHLIST_INIT",
      success: "ADD_TO_WISHLIST_SUCCESS",
      error: "ADD_TO_WISHLIST_ERROR",
    };
    const identifier = "ADD_TO_WISHLIST";
    const key = "addtowishlist";

    console.log("Add To CART SEND DATA------", "URL--", url, " DATA_____", obj);

    const data = this.props.commonActionPost(
      obj,
      url,
      constant,
      identifier,
      key
    );
  //  this.getWishList(cart);
    this.props.navigation.navigate("WishListScreen");
  };

  imageBackgroundScrolls = (item) => {
  //   console.log('imageBackgroundScrolls Method------- ',item.item);
     let {Images} = item.item;
    return (
      <View style={styles.imageView}>
        <Image
          style={[styles.bigImage, { resizeMode: "cover",marginRight:10 }]}
          source={{ uri: imageBaseUrl + Images }}
        />
      </View>
    );
  };

  imageFlatlist = () => {
    console.log('Background Images to be place ',this.state.Images)

    return (
      <View style={{ height: "20%", width: "100%" }}>
      {this.props.productDetails && this.props.productDetails.ProductImage.length>0?
        <FlatList
          style={{ height: "100%", width: "100%", borderRadius: 10 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // data={images}
         // data={this.state.Images}
          
          data={this.props.productDetails.ProductImage}
          ref={(s) => (this.flatListRef = s)}
          renderItem={(item) => this.imageBackgroundScrolls(item)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
        :
        <Loader isLoad={this.props.isLoad} text="Loading..."/>
      }
      </View>
    );
  };



  smallFlatListView = (item) => {
    return (
      <View
        style={{
          borderRadius: 5,
          marginLeft: 10,
          borderWidth: 2,
          borderColor: this.state.selectedItem == item.index ? "#fff" : null,
          backgroundColor:
            this.state.selectedItem == item.index ? "rgba(0,0,0,0.2)" : null,
          opacity: this.state.selectedItem == item.index ? 1 : 0.5,
        }}
      >
       
        <TouchableOpacity
          style={{ height: "100%", width: "100%" }}
          onPress={() => this.moveToPosition(item.index)}
        >
          <Image
            style={{ height: 50, width: 50, resizeMode: "cover" }}
            // blurRadius={this.state.selectedItem == item.index ? 0 : 3}
            source={{ uri: imageBaseUrl + item.item.Images }}
            // source={{uri: item.item.img}}
          />
        </TouchableOpacity>
       
      </View>
    );
  };
  onPressHandler(id) {
    this.setState({ selectedItem: id });
  }

  smallImageFlatlist = () => {
    return (
      <View
        style={{
          height: 55,
          width: "100%",
          bottom: "82%",
          position: "absolute",
        }}
      >

       <FlatList
          style={{ height: "100%", width: "100%", marginLeft: 20 }}
          horizontal={true}
          // data={images}
         // data={this.state.Images}
         data={_get(this.props.productDetails,"ProductImage",[])}
          renderItem={(item) => this.smallFlatListView(item)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />

{/* {this.props.productDetails && this.props.productDetails.ProductImage.length>0?
        <FlatList
          style={{ height: "100%", width: "100%", marginLeft: 20 }}
          horizontal={true}
          // data={images}
         // data={this.state.Images}
         data={this.props.productDetails.ProductImage}
          renderItem={(item) => this.smallFlatListView(item)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
 :
        <Loader isLoad={this.props.isLoad} text="Loading..."/>
       } */}
      </View>
    );
  };

  moveToPosition = (index) => {
    this.setState({ selectedItem: index });
    this.flatListRef.scrollToIndex({ index: index });
  };

  rateAndItemReview = () => {
   console.log('Item Details Review^^^^^^^^^^ ',this.props.productDetails)

    return (
      <View
        style={{
          padding: 5,
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          borderWidth: 0,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 18 }} numberOfLines={1}>
          {_get(this.props, "productDetails.ProductData.ProcuctCombinationName", "No name")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text>
            In{" "}
            <Text style={{ fontWeight: "600", fontSize: 15 }}>
              {_get(this.props, "productDetails.ProductData.CategoryName", "No name")}
            </Text>
          </Text>
          {/* <Text style={{color: '#FFA500'}}>★★★★★</Text> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 20 }}>
            {" "}
            ₹ {_get(this.props, "productDetails.ProductData.Rate", "0.0")}
            {""}{" "}
            <Text
              style={{
                fontWeight: "300",
                color: "#808080",
                fontSize: 15,
                textDecorationLine: "line-through",
              }}
            >
              {" "}
              ₹ {_get(this.props, "productDetails.ProductData.MRP", "0.0")}{" "}
            </Text>
            {/* <Text
              style={{
                color: themeColor,
                fontWeight: '300',
                fontSize: 12,
                marginLeft: 5,
              }}>
              {'  '}10% OFF
            </Text> */}
          </Text>
          {/* <Text>(15 Reviews)</Text> */}
        </View>
        {/* <View
          style={{
            borderWidth: 0.8,
            borderColor: '#808080',
            width: 25,
            top: '93%',
            left: '16%',
            position: 'absolute',
          }}
        /> */}
      </View>
    );
  };
  wishListButton = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 60,
          width: "100%",
          borderWidth: 0,
          padding: 5,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0,
          }}
        >
          <TouchableOpacity
            style={styles.wishList}
            disabled={this.props.isLoad}
            onPress={() => {
              this.addToWishList(2);
            }}
          >
            <Text style={styles.wishlistText}>♡</Text>
            <View style={{ width: 5 }} />
            <Text style={styles.wishlistText}>Add To Wishlist</Text>
          </TouchableOpacity>
          <View style={{ width: 30 }} />
          <TouchableOpacity
            style={styles.wishList}
            disabled={this.props.isLoad}
            onPress={() => {
              this.addToCart(1);
            }}
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../assets/images/icons/cart.jpeg")}
            />
            <View style={{ width: 5 }} />
            <Text style={[styles.wishlistText, { color: "#000" }]}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.share}>
            <Image
              style={{height: 20, width: 20}}
              source={require('../../assets/images/icons/cart.jpeg')}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  description = () => {
    return (
      <View style={[styles.descriptionView, { marginTop: 10 }]}>
        <Text style={styles.bigText}> Description</Text>
        <View style={styles.descriptionDetails}>
          {_get(this.props, "productDetails.ProductData.Description", "") != "" ? (
            <Text>{_get(this.props, "productDetails.ProductData.Description", "--")}</Text>
          ) : (
            this.skeltonTextView()
          )}
        </View>
      </View>
    );
  };

  specificationView = (text) => {
    return (
      <View style={styles.descriptionView}>
        <Text style={styles.bigText}>{text}</Text>
      </View>
    );
  };

  specification = (item) => {
    // return specifications.map(item => {
    //   //console.log('specifications ', item);
    return (
      <View style={styles.descriptionView}>
        <Text style={{ fontSize: 10 }}>
          {_get(this.props, "productDetails.ProductData.Description", "") != "" ? (
            <HTML
              source={{
                html: _get(
                  this.props,
                  "productDetails.ProductData.BulletPoint",
                  "<h5>No Data</h5"
                ),
              }}
              contentWidth="100%"
            />
          ) : (
            this.skeltonTextView()
          )}
          {/* ● <Text style={{fontSize: 15}}>{item.specification}</Text> */}
        </Text>
      </View>
    );
    // });
  };

  varientOnPress = (item) => {
    this.setState({ variantId: item.Id }, () => {
      this.getItemDetail(this.state.productId, item.Id);
     

    });
  };

  renderVarientItems = (item) => {
    console.log('click on varient then ID &&&&&&&&& ******* ',item)
    return (
      <TouchableOpacity
        style={styles.varientItems}
        onPress={() => {
          this.varientOnPress(item);
        }}
      >
        <View style={styles.otherInfo}>
          <Image
            source={{ uri: imageBaseUrl + item.Image1 }}
            style={{ height: 60, width: 50, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.otherInfo}>
          <Text>{item.Name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  otherInfo = () => {

    return (
      <View style={{ width: "100%" }}>
        {_get(this.state,'varientList', []).length > 0 ? (
          <FlatList
            horizontal={true}
            style={{
              padding: 5,
              width: "100%",
              borderRadius: 10,
              backgroundColor: "#ccc",
            }}
            data={_get(this.state,'varientList', [])}
            renderItem={(item) => this.renderVarientItems(item.item)}
            keyExtractor={(item) => item.index}
          />
        ) : (
          <ListItems length={[1, 2, 3, 4]} style={styles.varientListSkelton} />
        )}
      </View>
    );


    
  };


  callOnRelatedItem=(items)=>{
     // this.setState({variantId:0})
     this.getItemDetail(items.Id, 0);
      this.initialCallingMethods(items)
  }

  relatedProductView = () => {
  

    return(
       <View style={{flexDirection:'row'}}>
        <ScrollView contentContainerStyle={{flexGrow:1,padding:10}} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
   
        >
        
        {this.state.relatedItem.map(items=>{
    return(
       
      
      <View style={styles.boxView}>
      <View style={{ height: 25, width: 50, borderRadius: 5, backgroundColor: '#ffe6e6', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: themeColor }}>5%</Text>
        </View>

      <View style={{width:100,height:50,marginTop:10}}>
      <Image style={{ height: '100%', width: '100%'}} source={{uri:imageBaseUrl+items.Image}} />
      </View>


      <View>
        <View style={{ width: '100%',  marginTop:10}}>
            <Text style={{ fontSize: 15, fontWeight: '600' }}>{items.Name}</Text>
            <Text style={{ color:'#ccc' }}>(in {items.CategoryName})</Text>
        </View>
 
        <View style={styles.priceAndAdd}>
            {/* <Text style={{  color: "green",flex:0.35,borderWidth:1 }}>₹{item.MaxRate}</Text> */}
            <Text style={{  color: themeColor,flex:0.4,borderWidth:0  }}>₹{items.MinRate}</Text>
            <TouchableOpacity style={styles.add} onPress={()=> this.callOnRelatedItem(items)}><Text style={{ color: "#fff",fontWeight:'900' }}
           
            >Add</Text></TouchableOpacity>
        </View>
        </View>

      </View>
      
    )
})

}

</ScrollView>
</View>

    )




  };
  


  goToCartAction = () => {
    return (
      <TouchableOpacity
        style={styles.goToCart}
        onPress={() => {
          this.goToCartPage();
        }}
      >
        {/* <Text style={{color:'#fff',fontWeight:'800'}}>Cart Items: {this.state.cartArr.length}</Text> */}
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
          Buy Now{" "}
        </Text>
        <Image
          source={require("../../assets/images/user/next_white.png")}
          style={{ height: 20, width: 20 }}
        />
      </TouchableOpacity>
    );
  };
  goToCartPage = () => {
    this.saveDataToCart();

    this.props.navigation.navigate("CartScreen", { items: this.state.item });
  };

  checkObjExists = (obj, arr) => {
    let flag = false;
    arr.some((item) => {
      //console.log(item.Id,'==',obj.Id)
      if (item.Id == obj.Id) {
        //console.log('In If--- ',item.Id,'==',obj.Id)
        flag = true;
        //return
      }
    });
    //console.log('We have flag value here ',flag)
    return flag;
  };

  saveDataToCart = () => {
    let data = {};
    let arr = [];
    if (this.props.cartItems && this.props.cartItems.length > 0) {
      //arr=this.props.cartItems;
      // this.props.cartItems.some(item=>{
      //   //console.log('Check Array befor save ********* ',item," And ",this.props.route.params.item)
      //   if(item.Id!=this.props.route.params.item.Id){

      //     arr.push(this.props.route.params.item)
      //   }
      // })
      let check = this.checkObjExists(
        this.props.route.params.item,
        this.props.cartItems
      );
      if (!check) {
        arr = this.props.cartItems;
        arr.push(this.props.route.params.item);
      } else {
        arr = this.props.cartItems;
      }

      // data = arr;
    } else {
      data = this.props.route.params.item;
      arr.push(data);
    }

    const key = "cartItems";
    const identifier = "SAVE_CART_ITEMS";

    this.props.getCartSaveList(arr, identifier, key);
  };

  skeltonTextView = () => {
    return <DetailTextSkelton />;
  };

bottomButton=()=>{
  let amount=0;
  return(

<TouchableOpacity
        style={styles.subTotal}
        onPress={() => {
          this.props.navigation.navigate('CartScreen');
        }}
      >
        <View style={{ flex: 0.8 }}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>
            Subtotal ₹ {amount || 0}{" "}
          </Text>
          <Text style={{ color: "#fff" }}>Go to cart{" "}</Text>
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

  )
}

loaderView=()=>{
  return(
<View style={styles.loader}>
  {this.props.isLoad?
    <Loader isLoad={this.props.isLoad} text='Loading...'/>
    :
    null
    }
    </View>
  )
  
}

  mainComp = () => {
    return (
      <View style={[styles.container,{marginBottom:10}]}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 2 }}
          showsVerticalScrollIndicator={false}
          ref={(ref) => { this.scrollListReftop = ref; }}

        >
          <View style={styles.container}>

         
            {this.imageFlatlist()}
            {this.smallImageFlatlist()}
            {this.rateAndItemReview()}
            {this.wishListButton()}
            {this.description()}
        

            {this.specificationView("Specifications")}
            {this.specification()}
            {this.specificationView("All Variant")}
            <View style={{height:10}}/>
            {this.otherInfo()}
            <View style={{height:10}}/>
            {this.specificationView("Related Products")}
   
            {this.relatedProductView()}
           
            <View style={{height:400}}/>

            {/* {this.state.showSnackBar && this.props.addtocart && this.props.addtocart.Msg ?
            this.props.addtocart.Msg=="Only 0 Quantity available"?
          <SnackBar text={_get(this.props.addtocart,'Msg','')} color={dangerRed}/>
          :
          <SnackBar text={_get(this.props.addtocart,'Msg','')} color={success}/>
        
          :
          null} */}

        {this.state.showSnackBar && this.props.addtocart && this.props.addtocart.Msg ?
         
          <SnackBar text={_get(this.props.addtocart,'Msg','')} color={themeColor}/>
:
null
}
         
         </View>
        
        </ScrollView>
       {this.loaderView()}
       

        {/* {
          this.props.addtocart && this.props.addtocart.Msg!="Only 0 Quantity available"?
          this.bottomButton()
          :
          null
          } */}

          
        {/* {
          this.props.getcartlist.length>0?
          this.goToCartAction():
          null
          } */}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Product Details" props={this.props} right={false} />
        {this.mainComp()}
        
    
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  imageView: {
    width: 400,
    /// height: 300,
    // padding:10,
    borderRadius: 10,

    borderColor: "#fff",

    // borderWidth: 1,
  },
  bigImage: {
    flex: 1,
    borderRadius: 10,
    //borderWidth: 1,
    // borderWidth:1
  },
  wishList: {
    height: "100%",
    flex: 0.5,
    padding: 10,
    backgroundColor: "#fff",
    shadowOpacity: 0.8,
    shadowColor: "#AEAEAE",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 20,
    shadowRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  wishlistText: {
    color: "red",
    //marginLeft:5
  },
  share: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    shadowOpacity: 0.8,
    shadowColor: "#ccc",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 5,
    shadowRadius: 5,
    borderRadius: 5,
  },
  descriptionView: {
    padding: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    // borderWidth:1
  },
  descriptionDetails: {
    padding: 5,
  },
  bigText: { fontWeight: "700", fontSize: 18 },
  otherInfo: { flex: 0.5, alignItems: "flex-start", paddingLeft: 5 },

  otherProductItemView: {
    height: "90%",
    width: 210,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: "center",
    shadowOpacity: 0.8,
    shadowColor: "#ccc",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 5,
    shadowRadius: 5,
  },
  goToCart: {
    width: "100%",
    backgroundColor: themeColor,
    borderRadius: 10,
    //right: '30%',
    // bottom: '92%',
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
    shadowOpacity: 0.8,
    shadowColor: "#ccc",
    padding: 12,
    flexDirection: "row",
    // position: 'absolute',
  },
  varientItems: {
    // height:"100%",
    width: 120,
    // flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginLeft: 5,
  },
  varientListSkelton: {
    height: 80,
    width: 80,
    borderRadius: 10,
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
    //borderWidth:1,
    position:'absolute',
    top:'90%',
    left:'1.5%'
  },
  loader:{
    position:'absolute',
     right:0,
     left:0,
     top:'80%',
    // bottom:0,
   // backgroundColor:'#fff'
  },
  boxView: {
     height: 200,
     width: 200,
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
     marginLeft:6,
     borderWidth:1,
     borderColor:themeColor
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
});

const mapStateToProps = (state) => ({
  //promoList: state.commonReducer.promoList,
  cartItems: state.commonReducer.cartItems || [],
  productDetails: state.commonReducer.productDetails,
  varientList: state.commonReducer.varientList,
  loginData: state.commonReducer.loginData,
  getcartlist: state.commonReducer.getcartlist || [],
  getwishlist: state.commonReducer.getwishlist || [],
  isLoad: state.commonReducer.isLoad,
  addtocart:state.commonReducer.addtocart,
});

const mapDispatchToProps = (dispatch) => {
  return{
  getCartSaveList: (data, identifier, key) =>
    dispatch(getDataSaveList(data, identifier, key)),
  commonActionPost: (obj, url, constant, identifier, key) => {
    dispatch(commonActionPost(obj, url, constant, identifier, key));
  },
  getCommonDataAction: (url, constants, identifier, key, type) => {
    dispatch(getCommonDataAction(url, constants, identifier, key, type));
  },
}
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

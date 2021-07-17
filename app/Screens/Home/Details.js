import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
  Image,
  SafeAreaView,
  FlatList, TouchableOpacity
} from 'react-native';

 import {getDataSaveList,commonActionPost,getCommonDataAction} from '../../action/commonAction'
import {themeColor} from '../../Component/config';
import { connect } from "react-redux";
import Header from '../../Component/Header/index'
import {imageBaseUrl} from '../../Component/config'
import _get from 'lodash/get';
import HTML from "react-native-render-html";
import {DetailTextSkelton,ListItems} from '../../Component/SkeltonRow'



// let images = [
//   {img: 'https://i.ibb.co/LQmZb1D/muton.jpg'},
//   {img: 'https://i.ibb.co/nCc4bTD/watch2.jpg'},
//   {img: 'https://i.ibb.co/nCc4bTD/watch2.jpg'},
// ];




const otherData = [
  {
    name: 'Fastrack Watch',
    price: 2000,
    img: 'https://i.ibb.co/nCc4bTD/watch2.jpg',
  },
  {
    name: 'Fastrack Watch',
    price: 2000,
    img: 'https://i.ibb.co/nCc4bTD/watch2.jpg',
  },
  {
    name: 'Fastrack Watch',
    price: 2000,
    img: 'https://i.ibb.co/nCc4bTD/watch2.jpg',
  },
  {
    name: 'Fastrack Watch',
    price: 2000,
    img: 'https://i.ibb.co/nCc4bTD/watch2.jpg',
  },
];

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
      item:{},
      productId:0,
      variantId:0,
      Images:[]
    };
    this.flatListRef = null;
    
  }
  componentDidMount() {
    console.log('cartItems data Component Did Mount----- ', this.props.loginData);
    this.setState({productId:this.props.route.params.item.Id},()=>{
      this.getItemDetail(this.state.productId,0 )
      this.getVarientList(this.state.productId)
      //this.pushImages()
      this.setState({item:this.props.route.params.item})
    })

  
    
  }

  getVarientList=(PID)=>{


const url="/ProductVariantList"

    
  const constant = 
  {init:"VARIENT_LIST_INIT",
    success:"VARIENT_LIST_SUCCESS",
  error:"VARIENT_LIST_ERROR"
  }
  const identifier = "VARIENT_LIST";
  const key="varientList";
  const type =
  "?ProductId=" +PID;
  

  const data=this.props.getCommonDataAction(url,constant,identifier,key,type)
  //console.log('****************Varient List Data*************** ',this.props.varientList)
  }


getItemDetail=(PId,VID)=>{
 
      const url="/productdetails"
    const constant = 
    {init:"PRODUCT_DETAILS_INIT",
      success:"PRODUCT_DETAILS_SUCCESS",
    error:"PRODUCT_DETAILS_ERROR"
    }
    const identifier = "PRODUCT_DETAILS";
    const key="productDetails";
    const type =
    "?ProductId=" +PId+"&VariantId=" +VID;
    

    const data=this.props.getCommonDataAction(url,constant,identifier,key,type)
    this.pushImages()
    
    // //console.log('getItemDetails----------------------->',this.props.productDetails)

  
}

pushImages=()=>{
// console.log('imageBackgroundScrolls Items ',_get(this.props,'productDetails',{}))
  // let arr=[];
  this.state.Images.push(_get(this.props,'productDetails.Image1',''),
  _get(this.props,'productDetails.Image2',''),
  _get(this.props,'productDetails.Image3',''),
  _get(this.props,'productDetails.Image4','')
  )
  this.setState({Images:this.state.Images})
  // console.log('Images in Array########### 1 ',arr)
 // console.log('BackgroundImages imageBackgroundScrolls in Array########### 2 ',this.state.Images)
}


  addToCart=(cart)=>{
    console.log('User id--',this.props.loginData.Id,' Product Id ',this.state.productId,' Variant Id ',this.state.variantId)
  const obj={
      UserId:this.props.loginData.Id||2,
    	ProductId:this.state.productId,
    	VariantId:this.state.variantId,
    	CartType:cart,
    	Qty:1,
  }
      const url="/addtocart"
    const constant = 
    {init:"ADD_TO_CART_INIT",
      success:"ADD_TO_CART_SUCCESS",
    error:"ADD_TO_CART_ERROR"
    }
    const identifier = "ADD_TO_CART";
    const key="addtocart";

    const data=this.props.commonActionPost(obj,url,constant,identifier,key)

  }

  imageBackgroundScrolls = item => {
    console.log('imageBackgroundScrolls Method------- ',imageBaseUrl+item.item);
    return (
      <View style={styles.imageView}>
        <Image
          style={[styles.bigImage,{resizeMode:"contain"}]} 
          source={{uri: imageBaseUrl+item.item}}
          
        />
      </View>
    );
  };

  imageFlatlist = () => {
 console.log('Background Images to be place ',this.state.Images)

 

    return (
      <View style={{ height: '20%', width: '100%'}}>
        <FlatList
          style={{height: '100%', width: '100%',borderRadius:10}}
          horizontal={true}
          // data={images}
          data={this.state.Images}
          ref={s => (this.flatListRef = s)}
          renderItem={item => this.imageBackgroundScrolls(item)}
          keyExtractor={(item, index) => {
         return  index.toString();
        }}
        />
      </View>
    );
  };

  smallFlatListView = item => {
    return (
      <View
        style={{
          borderRadius: 5,
          marginLeft: 10,
          borderWidth: 2,
          borderColor: this.state.selectedItem == item.index ? '#fff' : null,
          backgroundColor:
            this.state.selectedItem == item.index ? 'rgba(0,0,0,0.2)' : null,
            opacity:this.state.selectedItem == item.index ?1:0.5
        }}>
        <TouchableOpacity
          style={{height: '100%', width: '100%'}}
          onPress={() => this.moveToPosition(item.index)}>
          <Image
            style={{height: 50, width: 50, resizeMode: 'cover'}}
           // blurRadius={this.state.selectedItem == item.index ? 0 : 3}
           source={{uri: imageBaseUrl+item.item}}
            // source={{uri: item.item.img}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  onPressHandler(id) {
    this.setState({selectedItem: id});
  }

  smallImageFlatlist = () => {
    return (
      <View
        style={{
          height: 55,
          width: '100%',
          bottom: '82%',
          position: 'absolute',
        }}>
        <FlatList
          style={{height: '100%', width: '100%', marginLeft: 20}}
          horizontal={true}
         // data={images}
         data={this.state.Images}
          renderItem={item => this.smallFlatListView(item)}
          keyExtractor={(item, index) => {
         return  index.toString();
        }}
        />
      </View>
    );
  };

  moveToPosition = index => {
    this.setState({selectedItem: index});
    this.flatListRef.scrollToIndex({index: index});
  };

  rateAndItemReview = () => {
    return (
      <View
        style={{
          padding: 5,
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          borderWidth: 0,
        }}>
        <Text style={{fontWeight: '700', fontSize: 18}}>
         {_get(this.props,'productDetails.ProcuctCombinationName','No name')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text>
           In{" "}
            <Text style={{fontWeight: '600', fontSize: 15}}>
            {_get(this.props,'productDetails.CategoryName','No name')}
            </Text>
          </Text>
          {/* <Text style={{color: '#FFA500'}}>★★★★★</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: '700', fontSize: 20}}>
            {' '}
            ₹ {_get(this.props,'productDetails.Rate','0.0')}{''}{' '}
            <Text style={{fontWeight: '300', color: '#808080', fontSize: 15,textDecorationLine:'line-through'}}>
             {" "}₹ {_get(this.props,'productDetails.MRP','0.0')}{" "}
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 60,
          width: '100%',
        }}>
        <View
          style={{
            flex: 0.8,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: 5,
          }}>
          <TouchableOpacity style={styles.wishList} onPress={()=>{this.addToCart(2)}}>
            <Text style={styles.wishlistText}>♡</Text>
            <View style={{width: 5}} />
            <Text style={styles.wishlistText}>Wishlist</Text>
          </TouchableOpacity>
          <View style={{width: 35}} />
          <TouchableOpacity style={styles.wishList} onPress={()=>{this.addToCart(1)}}>
            <Image
              style={{height: 20, width: 20}}
              source={require('../../assets/images/icons/cart.jpeg')}
            />
            <View style={{width: 5}} />
            <Text style={[styles.wishlistText, {color: '#000'}]}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.share}>
            <Image
              style={{height: 20, width: 20}}
              source={require('../../assets/images/icons/cart.jpeg')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  description = () => {
    return (
     
      <View style={[styles.descriptionView,{marginTop:10}]}>
        <Text style={styles.bigText}> Description</Text>
        <View style={styles.descriptionDetails}>

        {_get(this.props,'productDetails.Description','')!=''?
     
          <Text>
         
            {_get(this.props,'productDetails.Description','--')}
          
          </Text>

          :
          this.skeltonTextView()}
        </View>
      </View>


    );
  };

  specificationView = text => {
    return (
      <View style={styles.descriptionView}>
        <Text style={styles.bigText}>{text}</Text>
      </View>
    );
  };

  specification = item => {
    // return specifications.map(item => {
    //   //console.log('specifications ', item);
      return (
        <View style={styles.descriptionView}>
          <Text style={{fontSize: 10}}>
          {_get(this.props,'productDetails.Description','')!=''?
          <HTML source={{ html: _get(this.props,'productDetails.BulletPoint','<h5>No Data</h5') }} contentWidth='100%' />
          :
          this.skeltonTextView()
          }
            {/* ● <Text style={{fontSize: 15}}>{item.specification}</Text> */}
          </Text>
        </View>
      );
    // });
  };

varientOnPress=(item)=>{
  this.setState({variantId:item.Id},()=>{
    this.getItemDetail(this.state.productId,item.Id)
  })
  
}


renderVarientItems=(item)=>{
  //console.log('renderVarientItems******* ',item,'Image- ',imageBaseUrl+item.Image1)
  return(
    <TouchableOpacity
          style={styles.varientItems} onPress={()=>{this.varientOnPress(item)}} >
          <View style={styles.otherInfo}>
            <Image source={{uri:imageBaseUrl+item.Image1}} style={{height:60,width:50,resizeMode:'contain'}}/>
          </View>
          <View style={styles.otherInfo}>
            <Text>{item.Name}</Text>
          </View>
        </TouchableOpacity>
  )
}

  otherInfo = () => {
    return(
    <View style={{width:'100%'}}>
{_get(this.props,'varientList.length',[])>0?
    <FlatList
      horizontal={true}
     style={{padding:5,width:'100%',borderRadius:10,backgroundColor:'#ccc'}}
     data={_get(this.props,'varientList',[])}
     renderItem={item=>this.renderVarientItems(item.item)}
     keyExtractor={item=> item.index}
    />
    :
    <ListItems length={[1,2,3,4]} style={styles.varientListSkelton}/>
}
    
    </View>
    )
  };

  relatedProductView = () => {
    return (
        
      <FlatList
        style={{width: '100%', height: 600,backgroundColor:'#'}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator
        data={otherData}
        renderItem={item => this.otherProductItems(item)}
        keyExtractor={(item, index) => {
         return  index.toString();
        }}
      />
    );
  };

  otherProductItems = item => {
    return (
      <View style={styles.otherProductItemView}>
        <Image
          source={{uri: item.item.img}}
          style={{
            height: 200,
            width: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
        {this.specificationView(item.item.name)}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{color:'#000',fontWeight:'600'}}>₹{item.item.price}</Text>
          <TouchableOpacity
            style={{
              height: 30,
              width: 80,
              borderRadius: 20,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color:'#fff',fontWeight:'600'}}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  goToCartAction=()=>{
    return(
      <TouchableOpacity style={styles.goToCart} onPress={()=>{this.goToCartPage()}}>
      {/* <Text style={{color:'#fff',fontWeight:'800'}}>Cart Items: {this.state.cartArr.length}</Text> */}
        <Text style={{color:'#fff',fontWeight:'700',fontSize:15}}>Buy Now {" "}</Text>
        <Image source={require('../../assets/images/user/next_white.png')} style={{height:20,width:20}}/>
      </TouchableOpacity>
    )
  }
  goToCartPage=()=>{
   this.saveDataToCart()
    
    this.props.navigation.navigate('CartScreen',{items:this.state.item})
  }


  checkObjExists=(obj,arr)=>{
    let flag = false;
arr.some(item=>{
  //console.log(item.Id,'==',obj.Id)
  if(item.Id==obj.Id){
    //console.log('In If--- ',item.Id,'==',obj.Id)
    flag=true;
  //return

  }
 
})
//console.log('We have flag value here ',flag)
return flag;
  }

  saveDataToCart=()=>{
    let data= {};
    let arr=[];
    if(this.props.cartItems && this.props.cartItems.length>0){
     
      
      //arr=this.props.cartItems;
      // this.props.cartItems.some(item=>{
      //   //console.log('Check Array befor save ********* ',item," And ",this.props.route.params.item)
      //   if(item.Id!=this.props.route.params.item.Id){
         
      //     arr.push(this.props.route.params.item)
      //   }
      // })
      let check = this.checkObjExists(this.props.route.params.item,this.props.cartItems)
      if(!check){
        arr=this.props.cartItems;
        arr.push(this.props.route.params.item)
      }
      else{
        arr=this.props.cartItems;
      }
     
     // data = arr;
    }
    else{
      data= this.props.route.params.item
      arr.push(data)
    }

    const key = "cartItems";
     const identifier = "SAVE_CART_ITEMS";
  
    this.props.getCartSaveList(
      arr,
      identifier,
      key,
    );


  }


skeltonTextView=()=>{
  return(

<DetailTextSkelton/>


  )
}


  render() {
    
    return (
      <View style={styles.container}>
      <Header title="Details" props={this.props} right={false} />
      <View style={{flex:1,padding:5}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {this.imageFlatlist()}
            {this.smallImageFlatlist()}
            {this.rateAndItemReview()}
            {this.wishListButton()}
            {this.description()}

            {this.specificationView('Specifications')}
            {this.specification()}
            {this.specificationView('All Variant')}
            {this.otherInfo()}
            {this.specificationView('Related Products')}
            {this.relatedProductView()}
           
          </View>
        </ScrollView>
        
        {this.goToCartAction()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 2,

    // alignItems: 'center',
   // paddingTop: Platform.OS == 'ios' ? 20 : null,
    //padding: 2,
    backgroundColor: '#fff',
    paddingBottom: 10,

    // borderWidth:1
  },
  imageView: {
    width: 400,
    /// height: 300,
    // padding:10,
    borderRadius: 10,
   
    borderColor: '#fff',
    
    // borderWidth: 1,
  },
  bigImage: {
    flex: 1,
borderRadius:10,
//borderWidth: 1,
    // borderWidth:1
  },
  wishList: {
    height: '80%',
    flex: 0.43,
    padding: 10,
    backgroundColor: '#fff',
    shadowOpacity: 0.8,
    shadowColor: '#ccc',
    shadowOffset:{
     height:5,width:5
    },
    elevation: 20,
    shadowRadius:15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
  },
  wishlistText: {
    color: 'red',
    //marginLeft:5
  },
  share: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    shadowOpacity: 0.8,
    shadowColor: '#ccc',
    shadowOffset:{
     height:5,width:5
    },
    elevation: 5,
    shadowRadius:5,
    borderRadius: 5,
  },
  descriptionView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
   // borderWidth:1
  },
  descriptionDetails: {
    padding: 5,
  },
  bigText: {fontWeight: '700', fontSize: 18},
  otherInfo: {flex: 0.5, alignItems: 'flex-start', paddingLeft: 5},

  otherProductItemView: {
    height: '90%',
    width: 210,
  backgroundColor:'#fff',
    borderRadius: 10,
    marginLeft: 10,
    alignSelf: 'center',
   shadowOpacity: 0.8,
    shadowColor: '#ccc',
    shadowOffset:{
     height:5,width:5
    },
    elevation: 5,
    shadowRadius:5,
  },
  goToCart:{
    width:'100%',
    backgroundColor:themeColor,
    borderRadius:10,
    //right: '30%', 
   // bottom: '92%', 
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'space-between',
    elevation:5,
    shadowOpacity:0.8,
    shadowColor:'#ccc',
    padding:12,
    flexDirection:'row',
   // position: 'absolute', 
  
  },
  varientItems:{
   // height:"100%",
    width:120,
   // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth:0,
    borderRadius:10,
backgroundColor:'#fff',
marginLeft:5   
    
  },
  varientListSkelton:{
    height:80,width:80,borderRadius:10
  }
});


const mapStateToProps = (state) => ({
  //promoList: state.commonReducer.promoList,
  cartItems: state.commonReducer.cartItems||[],
  productDetails:state.commonReducer.productDetails,
  varientList:state.commonReducer.varientList,
  loginData:state.commonReducer.loginData,

});

const mapDispatchToProps = (dispatch) => ({
  getCartSaveList: (data,  identifier, key) =>
  dispatch(getDataSaveList(data,  identifier, key)),
  commonActionPost:(obj,url,constant,identifier,key)=>{dispatch(commonActionPost(obj,url,constant,identifier,key))},
  getCommonDataAction: (url, constants, identifier, key, type) =>
  {dispatch(getCommonDataAction(url, constants, identifier, key, type))}

});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
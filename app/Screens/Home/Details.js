import React, {Component} from 'react';
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

 import {getDataSaveList} from '../../action/commonAction'
import {themeColor} from '../../Component/config';
import { connect } from "react-redux";
import Header from '../../Component/Header/index'
const images = [
  {img: 'https://i.ibb.co/LQmZb1D/muton.jpg'},
  {img: 'https://i.ibb.co/nCc4bTD/watch2.jpg'},
  {img: 'https://i.ibb.co/nCc4bTD/watch2.jpg'},
];

const specifications = [
  {
    specification:
      'Let’s have a look at nine simple ways to persuade visitors to your online store.',
  },
  {
    specification:
      'Let’s have a look at nine simple ways to persuade visitors to your online store.',
  },
  {
    specification:
      'Let’s have a look at nine simple ways to persuade visitors to your online store.',
  },
  {
    specification:
      'Let’s have a look at nine simple ways to persuade visitors to your online store.',
  },
  {
    specification:
      'Let’s have a look at nine simple ways to persuade visitors to your online store.',
  },
];
const otherInfo = [
  {key: 'Modal Number', value: 'ZX4493'},
  {key: 'Color', value: 'Black'},
  {key: 'Size', value: 'Regular'},
  {key: 'Brand', value: 'Yasolf'},
  {key: 'Water Resistance', value: '30 M'},
  {key: 'Display Type', value: 'Analog'},
];

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

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 0,
      item:{}
    };
    this.flatListRef = null;
    
  }
  componentDidMount() {
    console.log('Get Item In Component Did Mount----- ', this.props.route.params.item);
    this.setState({item:this.props.route.params.item})
  }

  imageBackgroundScrolls = item => {
    console.log('imageBackgroundScrolls-- ', item);
    return (
      <View style={styles.imageView}>
        <Image
          style={styles.bigImage}
          source={{uri: item.item.img}}
          
        />
      </View>
    );
  };

  imageFlatlist = () => {
    return (
      <View style={{ height: '20%', width: '100%'}}>
        <FlatList
          style={{height: '100%', width: '100%',borderRadius:10}}
          horizontal={true}
          data={images}
          ref={s => (this.flatListRef = s)}
          renderItem={item => this.imageBackgroundScrolls(item)}
          keyExtractor={item => item.id}
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
            source={{uri: item.item.img}}
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
          data={images}
          renderItem={item => this.smallFlatListView(item)}
          keyExtractor={item => item.id}
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
          {' '}
          Just another product name {''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text>
            {' '}
            By{' '}
            <Text style={{fontWeight: '600', fontSize: 15}}>
              {' '}
              Vender name {''}
            </Text>
          </Text>
          <Text style={{color: '#FFA500'}}>★★★★★</Text>
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
            ₹135{''}{' '}
            <Text style={{fontWeight: '300', color: '#808080', fontSize: 12}}>
              150
            </Text>
            <Text
              style={{
                color: themeColor,
                fontWeight: '300',
                fontSize: 12,
                marginLeft: 5,
              }}>
              {'  '}10% OFF
            </Text>
          </Text>
          <Text>(15 Reviews)</Text>
        </View>
        <View
          style={{
            borderWidth: 0.8,
            borderColor: '#808080',
            width: 25,
            top: '93%',
            left: '16%',
            position: 'absolute',
          }}
        />
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
          <TouchableOpacity style={styles.wishList}>
            <Text style={styles.wishlistText}>♡</Text>
            <View style={{width: 5}} />
            <Text style={styles.wishlistText}>Wishlist</Text>
          </TouchableOpacity>
          <View style={{width: 5}} />
          <TouchableOpacity style={styles.wishList}>
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
      <View style={styles.descriptionView}>
        <Text style={styles.bigText}> Description</Text>
        <View style={styles.descriptionDetails}>
          <Text>
            {' '}
            A product description is the marketing copy that explains what a
            product is and why it’s worth purchasing. The purpose of a product
            description is to supply customers with important information about
            the features and benefits of the product so they’re compelled to
            buy.However, entrepreneurs and marketers alike are susceptible to a
            common mistake that comes up when writing product descriptions. Even
            professional copywriters make it sometimes: writing product
            descriptions that simply describe your products.
          </Text>
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
    return specifications.map(item => {
      console.log('specifications ', item);
      return (
        <View style={styles.descriptionView}>
          <Text style={{fontSize: 10}}>
            ● <Text style={{fontSize: 15}}>{item.specification}</Text>
          </Text>
        </View>
      );
    });
  };

  otherInfo = () => {
    return otherInfo.map(item => {
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 5,
          }}>
          <View style={styles.otherInfo}>
            <Text style={{fontWeight: '600'}}>{item.key}</Text>
          </View>
          <View style={styles.otherInfo}>
            <Text>{item.value}</Text>
          </View>
        </View>
      );
    });
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
        keyExtractor={item => item.index}
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
  console.log(item.Id,'==',obj.Id)
  if(item.Id==obj.Id){
    console.log('In If--- ',item.Id,'==',obj.Id)
    flag=true;
  //return

  }
 
})
console.log('We have flag value here ',flag)
return flag;
  }

  saveDataToCart=()=>{
    let data= {};
    let arr=[];
    if(this.props.cartItems && this.props.cartItems.length>0){
     
      
      //arr=this.props.cartItems;
      // this.props.cartItems.some(item=>{
      //   console.log('Check Array befor save ********* ',item," And ",this.props.route.params.item)
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
            {this.specificationView('Other Information')}
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
   // borderWidth: 1,
    borderColor: '#fff',
    
    // borderWidth: 1,
  },
  bigImage: {
    flex: 1,
borderRadius:10
    // borderWidth:1
  },
  wishList: {
    height: '100%',
    flex: 0.5,
    padding: 15,
    backgroundColor: '#fff',
    shadowOpacity: 0.8,
    shadowColor: '#ccc',
    shadowOffset:{
     height:5,width:5
    },
    elevation: 20,
    shadowRadius:5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  
  }
});


const mapStateToProps = (state) => ({
  //promoList: state.commonReducer.promoList,
  cartItems: state.commonReducer.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  getCartSaveList: (data,  identifier, key) =>
  dispatch(getDataSaveList(data,  identifier, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
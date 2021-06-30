import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View,TouchableOpacity,Image,Modal,TouchableWithoutFeedback,FlatList,ScrollView } from 'react-native';
import AnimatedHeader from 'react-native-animated-header';
import _get from 'lodash/get';
import {imageBaseUrl} from '../../Component/config';
import {themeColor} from '../../Component/config';


  //{title:'Sodani Sweets',"address":'',"type":'shop',"distance":8.2,"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
const data = [  {title:'Sodani Sweets',"type":'shop',data:[{"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150}]},

                {title: 'Recommended',"type":"food" ,data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}
            ]},

                {title: 'Main Cource',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},

                {title: 'Thali',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},

                {title: 'Special 26',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}
            ]},
                {title: 'Paneer Special',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},

                {title: 'Sweets',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},

            ];

            const header = ['Recommended','Main Cource','Thali','Recommended','Thali','Recommended']
export default class Category extends Component {
constructor(props){
super(props)
this.state={
    sections:[],
    isModalVisible:false,
    onScreenHeader:"Recommended",
    cartArr:[]
}
}

componentDidMount(){
    let arr=[]
    data.map(item=>{
      //  this.state.sections.push(item.title)
        if(item.type!="shop"){
   this.state.sections.push(item.title)
        }
    })
}

headerView=(section)=>{
    console.log('HeaderView Index Section ',section)
    return(
section.type=="shop"?
<View style={styles.shopInfoSection}>
<Text style={{fontSize:20,fontStyle:'italic',color:themeColor,fontWeight:'700'}}>{section.title}</Text>
</View>
:
<View>
<Text style={styles.sectionHeader}>{section.title}</Text>
</View>

    )
}

itemViews=(item)=>{
    
    return(
        item.type=="shop"?
        <View style={{hwidth:'100%',backgroundColor:'#fff',padding:20}}>
           
           <Text>North Indian Thalis</Text>
           <View style={{height:5}}/>
           <Text>{item.city} | {item.distance} Kms </Text>
           <View style={{height:5}}/>
           <Text>🟠 Based on distance, an additional delivery will be apply</Text>
           <View style={{height:5}}/>
           <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
           <View style={{height:5}}/>
           <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
           <Text>★{item.rating} 〉</Text>
           <Text>🕘{item.delivery_time} </Text>
           <Text>💰{item.min_price} </Text>
           </View>

           <View style={{height:5}}/>
           <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
           <View style={{height:5}}/>
           <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
               <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:'#ccc',borderRadius:8}} activeOpacity={0.8}>
                <Text style={{fontWeight:'600'}}>15% OFF UPTO ₹100</Text>
                <View style={{height:5}}/>
                <Text style={{fontSize:10,color:'#808080'}}>USE 100SBI | ABOVE ₹400</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:'#ccc',borderRadius:8}} activeOpacity={0.8}>
                <Text style={{fontWeight:'600'}}>15% OFF UPTO ₹100</Text>
                <View style={{height:5}}/>
                <Text style={{fontSize:10,color:'#808080'}}>USE 100SBI | ABOVE ₹400</Text>
               </TouchableOpacity>
           </View>

        </View>
        :

<View style={styles.listItem}>
<View style={{width:'75%',justifyContent:'center'}}>
<Text style={{fontWeight:'500',fontSize:18}}>{item.name}</Text>
<Text style={{color:'#808080',marginTop:5}}>₹{item.price}</Text>
</View>
<TouchableOpacity style={{height:'100%',width:'25%',justifyContent:'center',alignItems:'center'}}>
    {/* <Image source={{uri:imageBaseUrl+item.image}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/> */}
    <Image source={{uri:item.img}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/>
    <TouchableOpacity style={{height:25,width:'80%',borderRadius:5,borderWidth:1,justifyContent:'center',alignItems:'center',top:'-13%',backgroundColor:'#fff'}}
    onPress={()=>{this.addItemsToCart(item)}}
    >
        <Text style={{fontWeight:'400'}}>Add +</Text>
    </TouchableOpacity>
</TouchableOpacity>
</View>
    )
}

addItemsToCart=(item)=>{
  // console.log('Add item ',item)
  // this.state.cartArr.push(item)
  // this.setState({cartArr:this.state.cartArr})
  this.props.navigation.navigate('DetailsScreen',{item:item})
  // console.log('Add item ',this.state.cartArr)
  // this.setState({cartArr:this.state.cartArr},()=>{ 
  //   this.props.navigation.navigate('CartScreen',{arr:this.state.cartArr})

  // })
 
}

moveToSection(index) {
    this.setState({isModalVisible:false})
    this.sectionList.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: index,
        viewOffset: 0,
    });
}

sectionList=()=>{

    return(
        <SectionList
        style={{height:'100%',width:'100%'}}
        sections={data}
        renderItem={({item}) => this.itemViews(item)}
        renderSectionHeader={({section}) => this.headerView(section)}
        keyExtractor={(item, index) => index}
        stickySectionHeadersEnabled={true}
        stickyHeaderIndices={ this.state.sections}
        ref={s => (this.sectionList = s)}

       onViewableItemsChanged={this.onCheckViewableItems}
       viewabilityConfig={{
         itemVisiblePercentThreshold: 100 //means if 50% of the item is visible
       }}
    />

    )

}

        onCheckViewableItems = ({ viewableItems, changed }) => {
            console.log("Visible items :", viewableItems,' Changed ',changed)
            if(viewableItems.length>0){
                this.setState({onScreenHeader:viewableItems[0].item.title})
            }

          }

buttonView=()=>{
this.checkHeaderFromList(this.state.onScreenHeader)

    return(

        <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isModalVisible:true})}}>
            <Text style={{color:'#fff',fontWeight:'700'}}>Sub Category {" "}</Text>
        </TouchableOpacity>
    )
}

checkHeaderFromList=(headerName)=>{

    let check=false;
    if(headerName==this.state.onScreenHeader){
     check=true;
    }
    else{
        check=false;
    }
    return check;
}

renderSectionInModal=(item)=>{
   // console.log('renderSectionInModal##### ',item)
    return(
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:'#f5f5f5',padding:5,margin:5}}
        onPress={()=>{this.moveToSection(item.index)}}>
        {

        this.checkHeaderFromList(item.item)?
        <View style={{height:10,width:10,backgroundColor:themeColor,borderRadius:10}}/>
        :
        <View style={{height:10,width:10}}/>

        }

        <Text style={{marginLeft:10,fontWeight:'300'}}>{item.item}</Text>

        </TouchableOpacity>
    )
}

modalView=()=>{
    return(
       <View style={styles.centeredView}>
       <Modal
         animationType="slide"
         transparent={true}
         visible={this.state.isModalVisible}
         onRequestClose={() => {
           this.setState({isModalVisible:!this.state.isModalVisible});
         }}
       >
         <TouchableWithoutFeedback onPress={()=>{this.setState({isModalVisible:false})}}>
             <View  style={styles.centeredView}>
           <View style={styles.modalView}>
               <FlatList
               data={_get(this.state,'sections',[])}
               renderItem={item=>this.renderSectionInModal(item)}
               keyExtractor={(item, index) => index}
               />

           </View>
           </View>
         </TouchableWithoutFeedback>
       </Modal>

     </View>
    )
}


goToCartAction=()=>{
  return(
    <TouchableOpacity style={styles.goToCart} activeOpacity={0.7} onPress={()=>{this.goToCartPage()}}>
    <Text style={{color:'#fff',fontWeight:'800'}}>Cart Items: {this.state.cartArr.length}</Text>
      <Text style={{color:'#fff',fontWeight:'800'}}>Cart</Text>
      <Image source={require('../../assets/images/user/next_white.png')} style={{height:20,width:20}}/>
    </TouchableOpacity>
  )
}

goToCartPage=()=>{
  this.props.navigation.navigate('CartScreen',{items:this.state.cartArr})
}

    render() {

        return (

        <View style={styles.container}>
        <SectionList
        style={{height:'150%',width:'100%'}}
        sections={data}
        renderItem={({item}) => this.itemViews(item)}
        renderSectionHeader={({section}) => this.headerView(section)}
        keyExtractor={(item, index) => index}
        stickySectionHeadersEnabled={true}
        stickyHeaderIndices={ this.state.sections}
        ref={s => (this.sectionList = s)}
        onViewableItemsChanged={this.onCheckViewableItems}
        viewabilityConfig={{
         itemVisiblePercentThreshold: 50 //means if 50% of the item is visible
       }}
    />
               {this.buttonView()}

               {
               this.state.isModalVisible?
                this.modalView()
                : null
               }
           
     {/* {this.state.cartArr.length>0?this.goToCartAction():null} */}

             </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff",
        backgroundColor: themeColor,

    },
    shopInfoSection:
            {borderColor:themeColor,
            borderWidth:1,alignItems:'center',
            justifyContent:'center',height:50,width:'100%',
            alignSelf:'center',
            backgroundColor:'#fff'

        },

   button: {
        width:'40%',
        backgroundColor:'rgba(0,0,0,0.4)',
        borderRadius:40,
        right: '30%', 
        bottom: '13%', 
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
        shadowOpacity:0.8,
        shadowColor:'#ccc',
        padding:10,
        position: 'absolute', 
        
          
    },
    listItem:{height:120,padding:10,width:'100%',flexDirection:'row',borderColor:'#ccc',borderTopWidth:1,borderWidth:1},

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
       backgroundColor:'rgba(0,0,0,0.2)',
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        //height:'30%',
        width:'80%',
       // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },

      modalText: {
        marginBottom: 15,
      },
      goToCart:{
        width:'90%',
        backgroundColor:themeColor,
        borderRadius:10,
        //right: '30%', 
        bottom: '2%', 
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'space-between',
        elevation:5,
        shadowOpacity:0.8,
        shadowColor:'#ccc',
        padding:10,
        flexDirection:'row',
        position: 'absolute', 
      }

})

// import React, {Component, useCallback} from 'react';
// import {
//   SectionList,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Modal,
//   TouchableWithoutFeedback,
//   FlatList,
//   ScrollView,
// } from 'react-native';
// import AnimatedHeader from 'react-native-animated-header';
// import AnimatedScreen from 'react-native-animated-screen';
// import _get from 'lodash/get';
// import {imageBaseUrl} from '../../Component/config';
// import SplashScreen from 'react-native-splash-screen'

// const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// const renderItem = ({item}) => {
//   return (
//     <View style={styles.listItem}>
//       <View style={{width: '75%', justifyContent: 'center'}}>
//         <Text style={{fontWeight: '500', fontSize: 18}}>{item.name}</Text>
//         <Text style={{color: '#808080', marginTop: 5}}>₹{item.price}</Text>
//       </View>
//       <TouchableOpacity
//         style={{
//           height: '100%',
//           width: '25%',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         {/* <Image source={{uri:imageBaseUrl+item.image}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/> */}
//         <Image
//           source={{uri: item.img}}
//           style={{
//             height: '80%',
//             width: '100%',
//             borderWidth: 1,
//             borderRadius: 10,
//           }}
//         />
//         <TouchableOpacity
//           style={{
//             height: 25,
//             width: '80%',
//             borderRadius: 5,
//             borderWidth: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             top: '-13%',
//             backgroundColor: '#fff',
//           }}>
//           <Text style={{fontWeight: '400'}}>Add +</Text>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const renderSectionHeader = ({section}) => {
//   console.log('renderSectionHeader---- ', section.title);
//   return (
//     // <View style={styles.shopInfoSection}>
//     // <Text style={{fontSize:20,fontStyle:'italic',color:themeColor,fontWeight:'700'}}>{section.title}</Text>
//     // </View>

//     <View>
//       <Text style={styles.sectionHeader}>{section.title}</Text>
//     </View>
//   );
// };

// //{title:'Sodani Sweets',"address":'',"type":'shop',"distance":8.2,"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
// const data = [
//   //   {title:'Sodani Sweets',"type":'shop',data:[{"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150}]},

//   {
//     title: 'Recommended',
//     type: 'food',
//     data: [
//       {
//         type: 'food',
//         type: 'food',
//         name: 'Stuff Naan',
//         price: 90,
//         status: 'open',
//         star: 'Must try',
//         image: '637585338965218959.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Aaloo paratha',
//         price: 60,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Kadai paneer',
//         price: 150,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//     ],
//   },

//   {
//     title: 'Main Cource',
//     type: 'food',
//     data: [
//       {
//         type: 'food',
//         name: 'Stuff Naan',
//         price: 90,
//         status: 'open',
//         star: 'Must try',
//         image: '637585338965218959.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Aaloo paratha',
//         price: 60,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Kadai paneer',
//         price: 150,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//     ],
//   },

//   {
//     title: 'Thali',
//     type: 'food',
//     data: [
//       {
//         type: 'food',
//         name: 'Stuff Naan',
//         price: 90,
//         status: 'open',
//         star: 'Must try',
//         image: '637585338965218959.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Aaloo paratha',
//         price: 60,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Kadai paneer',
//         price: 150,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//     ],
//   },

//   {
//     title: 'Special 26',
//     type: 'food',
//     data: [
//       {
//         type: 'food',
//         name: 'Stuff Naan',
//         price: 90,
//         status: 'open',
//         star: 'Must try',
//         image: '637585338965218959.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Aaloo paratha',
//         price: 60,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Kadai paneer',
//         price: 150,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//     ],
//   },
//   {
//     title: 'Paneer Special',
//     type: 'food',
//     data: [
//       {
//         type: 'food',
//         name: 'Stuff Naan',
//         price: 90,
//         status: 'open',
//         star: 'Must try',
//         image: '637585338965218959.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Aaloo paratha',
//         price: 60,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Kadai paneer',
//         price: 150,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//     ],
//   },

//   {
//     title: 'Sweets',
//     type: 'food',
//     data: [
//       {
//         type: 'food',
//         name: 'Stuff Naan',
//         price: 90,
//         status: 'open',
//         star: 'Must try',
//         image: '637585338965218959.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Aaloo paratha',
//         price: 60,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//       {
//         type: 'food',
//         name: 'Kadai paneer',
//         price: 150,
//         status: 'open',
//         star: '',
//         image: '637586133234327706.jpg',
//         img: 'https://i.ibb.co/LQmZb1D/muton.jpg',
//       },
//     ],
//   },
// ];

// const fullObj = {
//   name: 'Virtual India Restro',
//   address: '21,ridhi-sidhi',
//   distance: 8.2,
//   type: 'shop',
//   city: 'Pink City',
//   rating: 4.3,
//   delivery_time: '54 min',
//   min_price: 150,
//   data: data,
// };
// export default class Category extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       sections: [],
//       isModalVisible: false,
//       onScreenHeader: 'Recommended',
//     };
//   }

//   componentDidMount() {

// SplashScreen.hide();

//     let arr = [];
//     data.map(item => {
//       //  this.state.sections.push(item.title)
//       if (item.type != 'shop') {
//         this.state.sections.push(item.title);
//       }
//     });

//     {
//       /* <View style={styles.shopInfoSection}>
// <Text style={{fontSize:20,fontStyle:'italic',color:themeColor,fontWeight:'700'}}>{section.title}</Text>
//   </View> */
//     }
//   }

//   headerView = section => {
//     console.log('HeaderView Index Section ', section);
//     return (
//       <View>
//         <Text style={styles.sectionHeader}>{section.title}</Text>
//       </View>
//     );
//   };

//   infoShopDetails = shopInfo => {
//     console.log('shopInfo-----', shopInfo);
//     return (
//       <View style={{backgroundColor: '#fff', padding: 20, height: '100%'}}>
//         {/* <Text>Shop Information Here</Text> */}
//         <Text>North Indian Thalis</Text>
//         <View style={{height: 5}} />
//         <Text>
//           {shopInfo.city} | {shopInfo.distance} Kms{' '}
//         </Text>
//         <View style={{height: 5}} />
//         <Text>🟠 Based on distance, an additional delivery will be apply</Text>
//         {/* <View style={{height:5}}/>
//         <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
//         <View style={{height:5}}/>
//         <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
//         <Text>★{shopInfo.rating} 〉</Text> 
//         <Text>🕘{shopInfo.delivery_time} </Text> 
//         <Text>💰{shopInfo.min_price} </Text> 
//         </View>
//         <View style={{height:5}}/>
//         <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
//         <View style={{height:5}}/> */}
//         {/* <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
//             <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:'#ccc',borderRadius:8}} activeOpacity={0.8}>
//              <Text style={{fontWeight:'600'}}>15% OFF UPTO ₹100</Text>
//              <View style={{height:5}}/>
//              <Text style={{fontSize:10,color:'#808080'}}>USE 100SBI | ABOVE ₹400</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:'#ccc',borderRadius:8}} activeOpacity={0.8}>
//              <Text style={{fontWeight:'600'}}>15% OFF UPTO ₹100</Text>
//              <View style={{height:5}}/>
//              <Text style={{fontSize:10,color:'#808080'}}>USE 100SBI | ABOVE ₹400</Text>
//             </TouchableOpacity>
//         </View> */}
//       </View>
//     );
//   };

//   itemViews = item => {
//     console.log('Item ', item);
//     return (
//       //    item.type=="shop"?
//       //  this.infoShopDetails(item)
//       //  :
//       <View style={styles.listItem}>
//         <View style={{width: '75%', justifyContent: 'center'}}>
//           <Text style={{fontWeight: '500', fontSize: 18}}>{item.name}</Text>
//           <Text style={{color: '#808080', marginTop: 5}}>₹{item.price}</Text>
//         </View>
//         <TouchableOpacity
//           style={{
//             height: '100%',
//             width: '25%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           {/* <Image source={{uri:imageBaseUrl+item.image}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/> */}
//           <Image
//             source={{uri: item.img}}
//             style={{
//               height: '80%',
//               width: '100%',
//               borderWidth: 1,
//               borderRadius: 10,
//             }}
//           />
//           <TouchableOpacity
//             style={{
//               height: 25,
//               width: '80%',
//               borderRadius: 5,
//               borderWidth: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               top: '-13%',
//               backgroundColor: '#fff',
//             }}>
//             <Text style={{fontWeight: '400'}}>Add +</Text>
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   moveToSection(index) {
//     this.setState({isModalVisible: false});
//     this.sectionList.scrollToLocation({
//       animated: true,
//       itemIndex: 0,
//       sectionIndex: index,
//       viewOffset: 0,
//     });
//   }

//   sectionList = () => {
//     return (
//       <SectionList
//         style={{height: '100%', width: '100%'}}
//         sections={data}
//         renderItem={({item}) => this.itemViews(item)}
//         renderSectionHeader={({section}) => this.headerView(section)}
//         keyExtractor={(item, index) => index}
//         stickySectionHeadersEnabled={true}
//         stickyHeaderIndices={this.state.sections}
//         ref={s => (this.sectionList = s)}
//         onViewableItemsChanged={this.onCheckViewableItems}
//         viewabilityConfig={{
//           itemVisiblePercentThreshold: 100, //means if 50% of the item is visible
//         }}
//       />
//     );
//   };

//   onCheckViewableItems = ({viewableItems, changed}) => {
//     console.log('Visible items :', viewableItems, ' Changed ', changed);
//     if (viewableItems.length > 0) {
//       this.setState({onScreenHeader: viewableItems[0].item.title});
//     }
//   };

//   buttonView = () => {
//     this.checkHeaderFromList(this.state.onScreenHeader);

//     return (
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           this.setState({isModalVisible: true});
//         }}>
//         <Text style={{color: '#fff'}}>Category</Text>
//       </TouchableOpacity>
//     );
//   };

//   checkHeaderFromList = headerName => {
//     let check = false;
//     if (headerName == this.state.onScreenHeader) {
//       check = true;
//     } else {
//       check = false;
//     }
//     return check;
//   };

//   renderSectionInModal = item => {
//     // console.log('renderSectionInModal##### ',item)
//     return (
//       <TouchableOpacity
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           backgroundColor: '#f5f5f5',
//           padding: 5,
//           margin: 5,
//         }}
//         onPress={() => {
//           this.moveToSection(item.index);
//         }}>
//         {this.checkHeaderFromList(item.item) ? (
//           <View
//             style={{
//               height: 10,
//               width: 10,
//               backgroundColor:themeColor,
//               borderRadius: 10,
//             }}
//           />
//         ) : (
//           <View style={{height: 10, width: 10}} />
//         )}

//         <Text style={{marginLeft: 10, fontWeight: '300'}}>{item.item}</Text>
//       </TouchableOpacity>
//     );
//   };

//   modalView = () => {
//     return (
//       <View style={styles.centeredView}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={this.state.isModalVisible}
//           onRequestClose={() => {
//             this.setState({isModalVisible: !this.state.isModalVisible});
//           }}>
//           <TouchableWithoutFeedback
//             onPress={() => {
//               this.setState({isModalVisible: false});
//             }}>
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 <FlatList
//                   data={_get(this.state, 'sections', [])}
//                   renderItem={item => this.renderSectionInModal(item)}
//                   keyExtractor={(item, index) => index}
//                 />
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>
//       </View>
//     );
//   };

//   renderViewHeader = item => {
//     console.log('Shop Info---- ', item);
//     //{"title":'Sodani Sweets',"type":'shop',"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',
//     //"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
//     return (
//       <View style={{borderWidth: 1}}>
//         <Text>{item.address}</Text>
//         <Text>{item.min_price}</Text>
//         <Text>{item.distance}</Text>
//         <Text>{item.city}</Text>

//         {/* <SectionList  
//         style={{height:'100%',width:'100%'}}
//         sections={fullObj.data}  
//         renderItem={({item}) => this.itemViews(item)}  
//         renderSectionHeader={({section}) => this.headerView(section)}  
//         keyExtractor={(item, index) => index}  
//         stickySectionHeadersEnabled={true}
//         stickyHeaderIndices={ this.state.sections}
//         ref={s => (this.sectionList = s)}
//         onViewableItemsChanged={this.onCheckViewableItems}
//         viewabilityConfig={{
//          itemVisiblePercentThreshold: 50 //means if 50% of the item is visible
//        }}
//     />  
    
//                {this.buttonView()}
        
//                {
//                this.state.isModalVisible?
//                 this.modalView()
//                 : null
//                } */}
//       </View>
//     );
//   };

//   render() {
//     return (
//       <AnimatedScreen.Wrapper disableParallaxEffect>
//         <AnimatedScreen.Header  withShadow>
//           <View style={styles.container}>
//             <Text>Example 3</Text>
//             <AnimatedScreen.CollapsibleElement>
//               <Text>
//                 Simple header with SectionList
//               </Text>
//             </AnimatedScreen.CollapsibleElement>
//           </View>
//         </AnimatedScreen.Header>
//         <AnimatedScreen.SectionList
//           sections={fullObj.data.map(section => ({
//             title: section.title,
//             //  data: data[0].data,
//             data: section.data,
//           }))}
//           renderSectionHeader={renderSectionHeader}
//           renderItem={renderItem}
//         />
//       </AnimatedScreen.Wrapper>
//       // <View style={styles.container}>

//       // </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     backgroundColor:themeColor,
//   },
//   shopInfoSection: {
//     borderColor: themeColor,
//     borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 50,
//     width: '100%',
//     alignSelf: 'center',
//     backgroundColor: '#fff',
//   },

//   button: {
//     height: 40,
//     width: 150,
//     backgroundColor: themeColor,
//     borderRadius: 40,
//     top: -100,
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 5,
//   },
//   listItem: {
//     height: 120,
//     padding: 10,
//     width: '100%',
//     flexDirection: 'row',
//     borderColor: '#ccc',
//     borderTopWidth: 1,
//     borderWidth: 1,
//   },

//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//     backgroundColor: 'rgba(0,0,0,0.2)',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 10,
//     //height:'30%',
//     width: '80%',
//     // alignItems: "center",
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },

//   modalText: {
//     marginBottom: 15,
//     // textAlign: "center"
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: '900',
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: '400',
//   },
//   section: {
//     backgroundColor: '#e0e0e0',
//     padding: 10,
//   },
//   item: {
//     height: 60,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginVertical: 5,
//     marginHorizontal: 10,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   text: {
//     flex: 1,
//     textAlign: 'center',
//   },
//   image: {
//     width: 40,
//     height: 40,
//   },
// });

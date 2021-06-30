// import React, { Component } from 'react';
// import { View, Text,StyleSheet,Image,TouchableOpacity,FlatList,StatusBar } from 'react-native';
// import { connect } from 'react-redux';
// import {getTypeListAction} from '../../action/commonAction'
// import _get from 'lodash/get';
// import {imageBaseUrl} from '../../Component/config'
// import Header from '../../Component/Header'  
// import {themeColor} from '../../Component/config'

// const data =[{"name":"Laxmi Mishthan Bhandar","img":'https://i.ibb.co/LQmZb1D/muton.jpg',"distance":"10 Km",
// "address":"Malviya Nagar","rate":4.2,"time":"33 min","item":'₹300 for two'},
// {"name":"Laxmi Mishthan Bhandar","img":'https://i.ibb.co/LQmZb1D/muton.jpg',"distance":"10 Km",
// "address":"Malviya Nagar","rate":4.2,"time":"33 min","item":'₹300 for two'}
// ]

//  class VenderList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

// componentDidMount(){
//     this.getVenderListItems();
// }


//   getVenderListItems=()=>{

//     const constants = {
//         init: "GET_VENDER_LIST_HOME_INIT",
//         success: "GET_VENDER_LIST_HOME_HOME_SUCCESS",
//         error: "GET_VENDER_LIST_HOME_HOME_ERROR",
//     }
//     const key = "vendorListHome";
//     const identifier = "GET_VENDER_LIST_HOME_HOME";
//     const url = "/vendorlist";
  
//     const obj = {
//         uriData: 0
//     }
//     const type="?CatId=";
//     this.props.getTypeListAction(obj,url,constants,identifier,key,type)
    
      
//   }

//   onPressItem=(item)=>{
// // console.log('onPressItem--- ',item)
//      this.props.props.navigation.navigate('CategoryScreen',{item:item})
//   }


//   renderItem=(item)=>{
//    //   console.log('Render Item ',item)
//       let itemVal=item.item;
//       return(
//           <TouchableOpacity style={styles.itemView} onPress={()=>{this.onPressItem(item)}}>
//           <View style={{flex:0.4}}>
//               {/* <Image style={{height:'100%',width:'100%',resizeMode:'cover'}} source={{uri:imageBaseUrl+itemVal.img}}/> */}
//               <Image style={{height:'100%',width:'100%',resizeMode:'cover'}} source={{uri:itemVal.img}}/>
//           </View>
//           <View style={{flex:0.7,height:'100%',width:'100%',marginLeft:5}}>
//           <Text style={{fontWeight:'700',fontSize:18}}>{itemVal.name}</Text>

//           <Text style={styles.text}>{itemVal.address} | {itemVal.distance}</Text>
//               <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
//                 <Text style={styles.text}> ★{itemVal.rate}</Text>
//                 <Text style={[styles.text,{fontWeight:'700'}]}> ∙</Text>
//                 <Text style={styles.text}> {itemVal.time}</Text>
//                 <Text style={[styles.text,{fontWeight:'700'}]}> ∙</Text>
//                 <Text style={styles.text}> {itemVal.item}</Text>
//               </View>
//           </View>

//           </TouchableOpacity>
//       )
//   }


//   venderListView=()=>{
//       return(
//           <View>
//       <FlatList 
//       style={styles.flatList}
//           data={data}
//           renderItem={item=>this.renderItem(item)}
//           keyExtractor={item=>item.index}
//       />
//           </View>
//       )
//   }

//   render() {
//      // console.log('get vendor list home ',_get(this.props,'vendorListHome',[]))
//     return (
    
       
//       <View style={styles.container}>
//       {/* <Header title="Home" props={this.props} right={true}/> */}
     
//        {this.venderListView()}
//       </View>
     
//     );
//   }
// }

// const styles= StyleSheet.create({
//     container:{
//         flex:1,
// //padding:10,

//     },
//     flatList:{
// //borderWidth:1,
// width:"100%",
// height:'100%'
//     },
//     itemView:{
//         width:'100%',
//         padding:10,
//        // borderWidth:1,
//         flexDirection:'row',
//         borderRadius:10,
//         elevation:5,
//         shadowOpacity:0.8,
//         shadowRadius:10,
//         shadowOffset:{height:5,width:5},
//         shadowColor:'#ccc',
//         backgroundColor:'#fff',
//         marginTop:10,
//         height:120

//     },
//     text:{color:'#808080', marginTop:10}
// })

// const mapStateToProps = state => (

//     {

//         // promoList: state.commonReducer.promoList,
//          vendorListHome: state.commonReducer.vendorListHome,
//     }

// );

// const mapDispatchToProps = dispatch => ({
//     // commonActionGet: (obj, url, constants, identifier, key) => dispatch(commonActionGet(obj, url, constants, identifier, key)),
//     // commonActionPost: (obj, url, constants, identifier, key) => dispatch(commonActionPost(obj, url, constants, identifier, key)),
//      getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(VenderList)



import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity,FlatList,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import {getTypeListAction} from '../../action/commonAction'
import _get from 'lodash/get';
import {imageBaseUrl} from '../../Component/config'
import Header from '../../Component/Header'  
import {themeColor} from '../../Component/config'

const data =[{"name":"Laxmi Mishthan Bhandar","img":'https://i.ibb.co/LQmZb1D/muton.jpg',"distance":"10 Km",
"address":"Malviya Nagar","rate":4.2,"time":"33 min","item":'₹300 for two'},
{"name":"Laxmi Mishthan Bhandar","img":'https://i.ibb.co/LQmZb1D/muton.jpg',"distance":"10 Km",
"address":"Malviya Nagar","rate":4.2,"time":"33 min","item":'₹300 for two'}
]

 class VenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

componentDidMount(){
    this.getVenderListItems();
}


  getVenderListItems=()=>{

    const constants = {
        init: "GET_VENDER_LIST_HOME_INIT",
        success: "GET_VENDER_LIST_HOME_HOME_SUCCESS",
        error: "GET_VENDER_LIST_HOME_HOME_ERROR",
    }
    const key = "vendorListHome";
    const identifier = "GET_VENDER_LIST_HOME_HOME";
    const url = "/vendorlist";
  
    const obj = {
        uriData: 0
    }
    const type="?CatId=";
    this.props.getTypeListAction(obj,url,constants,identifier,key,type)
    
      
  }

  onPressItem=(item)=>{
// console.log('onPressItem--- ',item)
     this.props.props.navigation.navigate('CategoryScreen',{item:item})
  }


  renderItem=(item)=>{
   //   console.log('Render Item ',item)
      let itemVal=item.item;
      return(
          <TouchableOpacity style={styles.itemView} onPress={()=>{this.onPressItem(item)}}>
          <View style={{flex:0.4}}>
              {/* <Image style={{height:'100%',width:'100%',resizeMode:'cover'}} source={{uri:imageBaseUrl+itemVal.img}}/> */}
              <Image style={{height:'100%',width:'100%',resizeMode:'cover'}} source={{uri:itemVal.img}}/>
          </View>
          <View style={{flex:0.7,height:'100%',width:'100%',marginLeft:5}}>
          <Text style={{fontWeight:'700',fontSize:18}}>{itemVal.name}</Text>

          <Text style={styles.text}>{itemVal.address} | {itemVal.distance}</Text>
              <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
                <Text style={styles.text}> ★{itemVal.rate}</Text>
                <Text style={[styles.text,{fontWeight:'700'}]}> ∙</Text>
                <Text style={styles.text}> {itemVal.time}</Text>
                <Text style={[styles.text,{fontWeight:'700'}]}> ∙</Text>
                <Text style={styles.text}> {itemVal.item}</Text>
              </View>
          </View>

          </TouchableOpacity>
      )
  }


  venderListView=()=>{
      return(
          <View>
      <FlatList 
      style={styles.flatList}
          data={data}
          renderItem={item=>this.renderItem(item)}
          keyExtractor={item=>item.index}
      />
          </View>
      )
  }

  venderList=()=>{
return(
    <View style={styles.flatList}>

{data.map(item=>{
    return(
        this.renderVenderListItem(item)
    )

})}

    </View>
)
  }


  renderVenderListItem=(item)=>{
       console.log('Render Item ',item)
      // let itemVal=item.item;
      let itemVal=item;
       return(
           <TouchableOpacity style={styles.itemView} onPress={()=>{this.onPressItem(item)}}>
           <View style={{flex:0.4}}>
               {/* <Image style={{height:'100%',width:'100%',resizeMode:'cover'}} source={{uri:imageBaseUrl+itemVal.img}}/> */}
               <Image style={{height:'100%',width:'100%',resizeMode:'cover'}} source={{uri:itemVal.img}}/>
           </View>
           <View style={{flex:0.7,height:'100%',width:'100%',marginLeft:5}}>
           <Text style={{fontWeight:'700',fontSize:18}}>{itemVal.name}</Text>
 
           <Text style={styles.text}>{itemVal.address} | {itemVal.distance}</Text>
               <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
                 <Text style={styles.text}> ★{itemVal.rate}</Text>
                 <Text style={[styles.text,{fontWeight:'700'}]}> ∙</Text>
                 <Text style={styles.text}> {itemVal.time}</Text>
                 <Text style={[styles.text,{fontWeight:'700'}]}> ∙</Text>
                 <Text style={styles.text}> {itemVal.item}</Text>
               </View>
           </View>
 
           </TouchableOpacity>
       )
   }


  render() {
     // console.log('get vendor list home ',_get(this.props,'vendorListHome',[]))
    return (
    
       
      <View style={styles.container}>
      {/* <Header title="Home" props={this.props} right={true}/> */}

      {this.venderList()}
     
       {/* {this.venderListView()} */}
      </View>
     
    );
  }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
//padding:10,

    },
    flatList:{
//borderWidth:1,
width:"100%",
height:'100%'
    },
    itemView:{
        width:'100%',
        padding:10,
       // borderWidth:1,
        flexDirection:'row',
        borderRadius:10,
        elevation:5,
        shadowOpacity:0.8,
        shadowRadius:10,
        shadowOffset:{height:5,width:5},
        shadowColor:'#ccc',
        backgroundColor:'#fff',
        marginTop:10,
        height:120

    },
    text:{color:'#808080', marginTop:10}
})

const mapStateToProps = state => (

    {

        // promoList: state.commonReducer.promoList,
         vendorListHome: state.commonReducer.vendorListHome,
    }

);

const mapDispatchToProps = dispatch => ({
    // commonActionGet: (obj, url, constants, identifier, key) => dispatch(commonActionGet(obj, url, constants, identifier, key)),
    // commonActionPost: (obj, url, constants, identifier, key) => dispatch(commonActionPost(obj, url, constants, identifier, key)),
     getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VenderList)
import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Modal,ScrollView,FlatList,Image, TouchableWithoutFeedback,ActivityIndicator,Dimensions } from 'react-native';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import Header from '../../Component/Header/index'
import {getTypeListAction,getCommonDataAction} from '../../action/commonAction'
import { imageBaseUrl } from '../../Component/config'
import { ListItems} from '../../Component/SkeltonRow';
import AnimatedScreen from  'react-native-animated-screen';
import {themeColor} from '../../Component/config'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
let mHieght=50;

const category=[{"name":"milk and dairy","type":0,"products":[{"name":"Milk"},{"name":"Curd"},{"name":"Bread"},{"name":"Milk"}]},

{"name":"Medicines","type":0,"products":[{"name":"Paracetamol"},{"name":"Citrazene"},{"name":"Dolo 650mg"},{"name":"Citrazene"}]},

{"name":"Fruits N Vagitables","type":0,"products":[{"name":"Tomato"},{"name":"Onion"},{"name":"Banana"},{"name":"carrot"}]},

{"name":"Fashion","type":0,"products":[{"name":"Jeans"},{"name":"Shirts"},{"name":"T-shirts"},{"name":"Shirts"}]},

{"name":"Grocery","type":0,"products":[{"name":"Sugar"},{"name":"Noodles"},{"name":"Rice"},{"name":"Noodles"}]}

]

class AllCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        arr:[],
        isVisible:false,
        selectId:0,
        isModalVisible:false
    };
  }
  componentDidMount(){
      console.log('Component did mount--- ',this.props.route.params.item)
    this.getCategoryList()
    // this.getSubCategoryList();
   this.getVenderDetails()
  }

  getSubCategoryList=(item)=>{
    const constants = {
        init: "GET_VENDOR_SUB_CATEGORY_LIST_INIT",
        success: "GET_VENDOR_SUB_CATEGORY_LIST_SUCCESS",
        error: "GET_VENDOR_SUB_CATEGORY_LIST_ERROR",
    }
    const key = "vendorSubCategoryList";
    const identifier = "GET_VENDOR_SUB_CATEGORY_LIST";
    const url = "/vendorsubcategorylist";
    
    const obj = {
         uriData: item.item.Id
       // uriData: 6
    }
    const type="?CategoryId=";
    this.props.getTypeListAction(obj,url,constants,identifier,key,type)
  }


getVenderDetails=()=>{

let id= _get(this.props,'route.params.item.Id',0)


    const constants = {
        init: "GET_VENDER_DETAILS_INIT",
        success: "GET_VENDER_DETAILS_SUCCESS",
        error: "GET_VENDER_DETAILS_ERROR",
    }
    const key = "vendorDetails";
    const identifier = "GET_VENDER_DETAILS";
    const url = "/vendordetailsforproduct";
  
    const obj = {
        uriData: id
    }
    const type="?VendorId=";
    this.props.getTypeListAction(obj,url,constants,identifier,key,type)



}


  getCategoryList=()=>{
    let id= _get(this.props,'route.params.item.Id',0)

        const constants = {
            init: "GET_VENDER_CATEGORY_LIST_INIT",
            success: "GET_VENDER_CATEGORY_LIST_SUCCESS",
            error: "GET_VENDER_CATEGORY_LIST_ERROR",
        }
        const key = "vendorCategoryList";
        const identifier = "GET_VENDER_CATEGORY_LIST";
        const url = "/vendorcategorylist";
      
        const obj = {
            uriData: id
        }
        const type="?VendorId=";
        this.props.getTypeListAction(obj,url,constants,identifier,key,type)
  }


  getProductDetailAccordingSubCategory=(item)=>{
  //  console.log('Vender details *********** ',this.state.catId)

    let venderId= _get(this.props,'route.params.item.Id',0)
    let catId = this.state.catId;
    let subCatId = _get(item,'Id',0);

    const constants = {
        init: "GET_SUB_CAT_PRODUCTS_INIT",
        success: "GET_SUB_CAT_PRODUCTS_SUCCESS",
        error: "GET_SUB_CAT_PRODUCTS_ERROR",
    }
    const key = "subCategoryProductsList";
    const identifier = "GET_SUB_CAT_PRODUCTS";
    const url = "/productslistforlistpage";
  
   
    const type="?Vendorid="+venderId+"&CategoryId="+catId+"&SubcategoryId="+subCatId;
    this.props.getCommonDataAction(url,constants,identifier,key,type)
    
    this.setState({isModalVisible:false})

}



filterObjects=(id)=>{
    this.setState({selectId:id})
  
    console.log('In filterObjects----')
    // var array=[];
    // category.map(item=>{
    //     if(item.name!='All'){

    //         item.products.map(subItems=>{
    //             array.push({"name":subItems.name})
             
    //         })

    //     }
       
    // })
    // console.log('Get array after filtered ',array)
    // this.setState({arr:array})
    // if(category[0].name!='All'){
       
    //     category.unshift({"name":"All"})
    // }
    // else{
    //  this.setState({isVisible:false})
    // }

    this.setState({isVisible:false},()=>{})
 
    
}


venderInfoView=()=>{
//console.log('venderInfoView----- ',_get(this.props,'vendorDetails','--'),'  Props ',this.props)

   return(

       <View style={{width:'100%',backgroundColor:'#fff',padding:20}}>
           
           <Text style={{fontWeight:'bold',fontSize:17}}>{_get(this.props,'vendorDetails.Name','--')}</Text>
           <View style={{height:5}}/>
           <Text>{_get(this.props,'vendorDetails.Address','--')} | 0 Kms </Text>
           <View style={{height:5}}/>
           <Text>🟠 Based on distance, an additional delivery will be apply</Text>
           <View style={{height:5}}/>
           <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
           <View style={{height:5}}/>
           <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
           <Text>★{_get(this.props,'vendorDetails.Rating','--')} 〉</Text>
           <Text>🕘{_get(this.props,'vendorDetails.DeliveryTime','--')} </Text>
           <Text>💰{_get(this.props,'vendorDetails.MinOrderValue','--')} </Text>
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

   )
}



upperView=()=>{

    // console.log('In Upper View vendorSubCategoryList----',_get(this.props,'vendorSubCategoryList',[]))

    if( _get(this.props,'vendorCategoryList',[]).length>0 && _get(this.props,'vendorCategoryList',[])[0].Name!='All'){
       
        _get(this.props,'vendorCategoryList',[]).unshift({"Name":"All"});
    }

    return(

        this.props.vendorCategoryList && _get(this.props,'vendorCategoryList',[]).length>0?

        <FlatList 
        style={{width:'100%',padding:10,borderWidth:0}}
        showsHorizontalScrollIndicator={false}
        data={_get(this.props,'vendorCategoryList',[])}
        horizontal={true}
        renderItem={item=>this.renderItem(item)}
        keyExtractor={item=>item.index}
        />
    
    :
     <View style={{width:'100%',padding:10,borderWidth:0,borderWidth:0}}>
        <ListItems style={styles.listRow} length={[1,2,3,4]}/>
    </View>
    )

}

buttonView=()=>{
   
    
        return(
  
            <TouchableOpacity  style={styles.button}
            onPress={()=>{this.setState({isModalVisible:true})}}
            >
                <Text style={{color:'#fff',fontWeight:'700'}}>Sub Category {" "}</Text>
            </TouchableOpacity>
     
        )
    }

renderItem=(item)=>{
    // console.log('item---- ',item)
    // console.log('item---- ',this.state.selectId,'==',item.index)

    return(
        item.item.Name=="All"?
        <TouchableOpacity style={[styles.item,{justifyContent:'center',alignItems:'center',borderWidth:this.state.selectId==item.index?1:0,borderColor:this.state.selectId==item.index?'#00A300':'#fff'}]} onPress={()=>this.filterObjects(item.index)}>
        <Text style={{fontWeight:'600',fontSize:20}}>{item.item.Name}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={[styles.item,{borderWidth:this.state.selectId==item.index?1:0,borderColor:this.state.selectId==item.index?'#00A300':'#fff'}]} onPress={()=> this.selectItemCategory(item)}>
        <Image style={{height:50,width:50,resizeMode:'contain'}} source={{uri:imageBaseUrl+item.item.ImgLogo}}/>
        <Text numberOfLines={1}>{item.item.Name}</Text>
        </TouchableOpacity>
    )
}

selectItemCategory=(item)=>{
console.log('selectItemCategory ',item)
this.setState({isVisible:true})
this.setState({catId:item.item.Id})
this.setState({arr:[]})
this.setState({selectId:item.index})

this.getSubCategoryList(item)


}



boxRender = (item) => {
    console.log('Box Render subCategoryProductsList--- ',item)

    return (

        <TouchableOpacity style={styles.boxView} activeOpacity={0.4}>

            <View style={{ height: 25, width: 40, borderRadius: 5, backgroundColor: '#ffe6e6', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'orangered' }}>5%</Text>
            </View>
            <Image style={{  height:50,width:50,resizeMode:'contain', alignSelf: 'center' }} source={require('../../assets/images/green/g1.png')} />

            <View style={{ width: '100%', justifyContent:'center',padding:10}}>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>{_get(item,'Name','--')}</Text>
            </View>
            <View style={styles.priceAndAdd}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "green" }}>$0.8/kg {' '}</Text>
                <TouchableOpacity style={styles.add}><Text style={{ color: "red" }}>+</Text></TouchableOpacity>
            </View>

        </TouchableOpacity>
       
    )
}

categorySelectedView=()=>{
    return(
        _get(this.props,'subCategoryProductsList',[]).map(item=>{
       
        return(
            this.boxRender(item)           
        )
    }
    
    )
    

    )
    
}


itemView=()=>{
    return(
         <TouchableOpacity style={[styles.item,{width:120}]} onPress={()=>this.dispatchToDetails(item)}>
               <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('../../assets/images/green/g1.png')}/>
               <Text>{item.name}</Text>
            </TouchableOpacity>
    )
}

dispatchToDetails=(item)=>{
console.log('dispatchToDetails---- ',item)
   // this.props.navigation.navigate('DetailsScreen',{"item":item})
}

main=()=>{
    return(
        <View style={{marginBottom:10}}>
       <Header title="All Category" props={this.props} right={false}/> 
             
               <ScrollView contentContainerStyle={{borderWidth:0}}>
               {this.venderInfoView()}
               {this.upperView()}
              { this.props.vendorSubCategoryList && _get(this.props,'vendorSubCategoryList',[]).length>0?
               <View style={{width:'100%',justifyContent:'flex-start',flexDirection:'row',flexWrap:'wrap',marginBottom:150,marginLeft:10}}>
               {/* {this.categorySelectedView()} */}

               {this.categorySelectedView()}
                  
               </View>
               :
              this.loading()
              }
              
               </ScrollView>
               {/* <View style={{height:mHieght}}/> */}
              
               {/* <View style={styles.categoryTitle}> */}
            </View> 
    )
}


renderSectionInModal=(item)=>{
     console.log('renderSectionInModal##### ',item)
     return(
         <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:'#f5f5f5',padding:5,margin:5}}
         onPress={()=>{this.getProductDetailAccordingSubCategory(item.item)}}
        >
         {/* {
 
         this.checkHeaderFromList(item.item)?
         <View style={{height:10,width:10,backgroundColor:themeColor,borderRadius:10}}/>
         :
         <View style={{height:10,width:10}}/>
 
         } */}
 
         <Text style={{marginLeft:10,fontWeight:'300'}}>{item.item.Name}</Text>
 
         </TouchableOpacity>
     )
 }
 

modalView=()=>{
    return(
    //    <View style={styles.centeredView}>
       <Modal
         animationType="none"
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
               data={ _get(this.props,'vendorSubCategoryList',[])}
               renderItem={item=>this.renderSectionInModal(item)}
               keyExtractor={(item, index) => index}
               />

           </View>
           </View>
         </TouchableWithoutFeedback>
       </Modal>

    //  </View>
    )
}



loading=()=>{
   // this.setState({isVisible:false})
  // mHieght=180;
    return(
        <View style={{justifyContent:'center',alignItems:'center',borderWidth:0,marginTop:'30%'}}>
        <ActivityIndicator size='large' color={themeColor}/>
        <Text style={{color:themeColor,fontWeight:'900'}}>Loading...</Text>
        </View>
    )
}

  render() {
    console.log('Get array after filtered ',this.state.arr)
    return (

        <View style={styles.container}>

           {this.main()}
           {this.state.isVisible?this.buttonView():null}

           {
               this.state.isModalVisible?
                this.modalView()
                : null
               }

        {/* <AnimatedScreen.Wrapper disableParallaxEffect>
       <AnimatedScreen.Header backgroundColor={themeColor} withShadow >
         <View style={{   paddingHorizontal: 100,}}>
           <Text style={{fontSize:20,fontWeight:'800',color:'#fff'}}>All Category</Text>
           <AnimatedScreen.CollapsibleElement>

             <Text style={{color:'#fff'}}>Shop Info</Text>
           </AnimatedScreen.CollapsibleElement>
         </View>
       </AnimatedScreen.Header>
       <AnimatedScreen.ScrollView>
        {this.main()}
       </AnimatedScreen.ScrollView>
     </AnimatedScreen.Wrapper> */}

</View>
       
       
               
      
      
      



      
    
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    listRow:{
        // height:80,
        // width:80,
        height:height/10,
        width:width/5,
        margin:5,
        borderRadius:10,
    },
    categoryTitle:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
       
    },
    categoryView:{
        flexDirection:'row',
        flexWrap:'wrap',

    },
    item:{
        height:85,
        width:100,
        borderRadius:10,
        shadowColor:'#ccc',
        shadowOpacity:0.8,
        shadowOffset:{height:10,width:10},
        elevation:5,
        shadowRadius:5,
        backgroundColor:'#fff',
        alignItems:'center',
        alignItems:'center',
        margin:5,
        padding:5
        
    },
    boxView: {
        // height: 210,
        width: '45%',
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
        margin: 5
    },
    priceAndAdd:
    {
        flexDirection: 'row',
        width: '100%',
        //padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
       // borderWidth:1
       
    },
    // add: {
    //     height: 40,
    //     width: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 40,
    //     elevation: 1,
    //     backgroundColor: '#fff',
    //     shadowOffset: {
    //         width: 5,
    //         height: 5
    //     },
    //     shadowOpacity: 0.8,
    //     shadowColor: Platform.OS='ios'?'#ccc':'#000'

    // },
    button: {
        width:'40%',
        // backgroundColor:'rgba(0,0,0,0.7)',
        backgroundColor:'#000',
        borderRadius:40,
        right: '30%', 
         bottom: '1%', 
       // bottom: 120, 
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        elevation:5,
        shadowOpacity:0.8,
        shadowColor:'#ccc',
        padding:10,
        position: 'absolute', 
        
          
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      
       // marginTop: 22,

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
        elevation: 5,
        marginBottom:'35%',
      },

})
const mapStateToProps = state => (
  
    {
        vendorCategoryList:state.commonReducer.vendorCategoryList,
        vendorDetails:state.commonReducer.vendorDetails,
        vendorSubCategoryList:state.commonReducer.vendorSubCategoryList,
        subCategoryProductsList:state.commonReducer.subCategoryProductsList,
      
  }
  
  );
  
 
  const mapDispatchToProps = dispatch => ({
      //register:(obj)=>{dispatch(registerAction(obj))},
      getCommonDataAction: (url, constants, identifier, key,type) => dispatch(getCommonDataAction( url, constants, identifier, key,type)),
    getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllCategory)



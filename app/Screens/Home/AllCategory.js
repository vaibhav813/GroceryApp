import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,StatusBar,ScrollView,FlatList,Image, Platform,ActivityIndicator,Dimensions } from 'react-native';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import Header from '../../Component/Header/index'
import {getTypeListAction} from '../../action/commonAction'
import { imageBaseUrl } from '../../Component/config'
import { ListItems} from '../../Component/SkeltonRow';
import AnimatedScreen from  'react-native-animated-screen';
import {themeColor} from '../../Component/config'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

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
        selectId:0
    };
  }
  componentDidMount(){
      console.log('Component did mount--- ',this.props.route.params.item)
    this.getCategoryList()
   this.getVenderDetails()
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
  

        const constants = {
            init: "GET_VENDER_CATEGORY_LIST_INIT",
            success: "GET_VENDER_CATEGORY_LIST_SUCCESS",
            error: "GET_VENDER_CATEGORY_LIST_ERROR",
        }
        const key = "vendorCategoryList";
        const identifier = "GET_VENDER_CATEGORY_LIST";
        const url = "/vendorcategorylist";
      
        const obj = {
            uriData: 1
        }
        const type="?VendorId=";
        this.props.getTypeListAction(obj,url,constants,identifier,key,type)
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

    // console.log('In filterObjects----',_get(this.props,'vendorCategoryList',[]))

    if( _get(this.props,'vendorCategoryList',[]).length>0 && _get(this.props,'vendorCategoryList',[])[0].Name!='All'){
       
        _get(this.props,'vendorCategoryList',[]).unshift({"Name":"All"});
    }

    return(
//category.length>0?
        this.props.vendorCategoryList && _get(this.props,'vendorCategoryList',[]).length>0?

        <FlatList 
        style={{width:'100%',padding:10,borderWidth:0}}
        showsHorizontalScrollIndicator={false}
       // data={category}
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
    
            <TouchableOpacity style={styles.button} 
           // onPress={()=>{this.setState({isModalVisible:true})}}
            >
                <Text style={{color:'#fff',fontWeight:'700'}}>Sub Category {" "}</Text>
            </TouchableOpacity>
        )
    }

renderItem=(item)=>{
    console.log('item---- ',item)
    console.log('item---- ',this.state.selectId,'==',item.index)

//    return(
//     item.item.name=="All"?
//     <TouchableOpacity style={[styles.item,{justifyContent:'center',alignItems:'center',borderWidth:this.state.selectId==item.index?1:0,borderColor:this.state.selectId==item.index?'#00A300':'#fff'}]} onPress={()=>item.item.name=="All"?this.filterObjects(item.index): this.selectItemCategory(item)}>
  
//     <Text style={{fontWeight:'600',fontSize:20}}>{item.item.name}</Text>
//     </TouchableOpacity>
// :
//     <TouchableOpacity style={[styles.item,{borderWidth:this.state.selectId==item.index?1:0,borderColor:this.state.selectId==item.index?'#00A300':'#fff'}]} onPress={()=>item.item.name=="All"?this.filterObjects(): this.selectItemCategory(item)}>
//     <Image style={{height:50,width:50,resizeMode:'contain'}} source={require('../../assets/images/green/g2.png')}/>
//     <Text  numberOfLines={1}>{item.item.name}</Text>
//     </TouchableOpacity>
// )

    return(
        item.item.Name=="All"?
        <TouchableOpacity style={[styles.item,{justifyContent:'center',alignItems:'center',borderWidth:this.state.selectId==item.index?1:0,borderColor:this.state.selectId==item.index?'#00A300':'#fff'}]} onPress={()=>item.item.Name=="All"?this.filterObjects(item.index): this.selectItemCategory(item)}>
      
        <Text style={{fontWeight:'600',fontSize:20}}>{item.item.Name}</Text>
        </TouchableOpacity>
:
        <TouchableOpacity style={[styles.item,{borderWidth:this.state.selectId==item.index?1:0,borderColor:this.state.selectId==item.index?'#00A300':'#fff'}]} onPress={()=>item.item.name=="All"?this.filterObjects(): this.selectItemCategory(item)}>
        <Image style={{height:50,width:50,resizeMode:'contain'}} source={{uri:imageBaseUrl+item.item.ImgLogo}}/>
        <Text numberOfLines={1}>{item.item.Name}</Text>
        </TouchableOpacity>
    )
}

selectItemCategory=(item)=>{
console.log('selectItemCategory ',item)
this.setState({isVisible:true})
//this.setState({arr:item.item.products})
this.setState({arr:[]})
this.setState({selectId:item.index})


}


boxRender = (item) => {
    return (

        <TouchableOpacity style={styles.boxView} activeOpacity={0.4}>

            <View style={{ height: 25, width: 40, borderRadius: 5, backgroundColor: '#ffe6e6', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'orangered' }}>5%</Text>
            </View>
            <Image style={{ height: 90, width: "100%", alignSelf: 'center' }} source={require('../../assets/images/green/g1.png')} />

            <View style={{ width: '100%', justifyContent:'center',padding:10}}>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
            </View>
            <View style={styles.priceAndAdd}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: "green" }}>$0.8/kg {' '}</Text>
                <TouchableOpacity style={styles.add}><Text style={{ color: "red" }}>+</Text></TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

categorySelectedView=()=>{
    console.log('Initial array ',this.state.arr)
    return(
    _get(this.state,'arr',[]).map(item=>{
       
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
        <View style={{marginBottom:175}}>
       <Header title="All Category" props={this.props} right={false}/> 

     {this.venderInfoView()}

        <View style={{width:'100%',justifyContent:'center',borderWidth:0}}>
               {this.upperView()}
               </View>
               <ScrollView contentContainerStyle={{borderWidth:0}}>
              
               <View style={{width:'100%',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',borderWidth:0}}>
               
               {
                   this.state.arr.length>0?
                   this.categorySelectedView():null
                   }
               </View>
             
               </ScrollView>
               {this.state.isVisible?this.buttonView():null}
               {/* <View style={styles.categoryTitle}> */}
            </View> 
    )
}

  render() {
    console.log('Get array after filtered ',this.state.arr)
    return (

        <View style={styles.container}>

           {this.main()}
        {/* <AnimatedScreen.Wrapper disableParallaxEffect>
       <AnimatedScreen.Header backgroundColor={themeColor} withShadow >
         <View style={{   paddingHorizontal: 100,}}>
           <Text style={{fontSize:30,fontWeight:'800',color:'#fff'}}>All Category</Text>
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
        width:width/6,
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
        height: 210,
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
})
const mapStateToProps = state => (
  
    {
        vendorCategoryList:state.commonReducer.vendorCategoryList,
        vendorDetails:state.commonReducer.vendorDetails,
      
  }
  
  );
  
 
  const mapDispatchToProps = dispatch => ({
      //register:(obj)=>{dispatch(registerAction(obj))},
   
    getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllCategory)



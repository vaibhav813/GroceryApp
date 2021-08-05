import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView, Image, BackHandler,Dimensions,RefreshControl,ImageBackground} from 'react-native';

import { commonActionGet, commonActionPost, getTypeListAction } from '../../action/commonAction'
import { connect } from 'react-redux';
import { imageBaseUrl, themeColor } from '../../Component/config'
import _get from 'lodash/get';
import { ListItems, PromoList } from '../../Component/SkeltonRow';
import Header from '../../Component/Header'  
import VenderList from '../../Screens/Vender/index'
import SplashScreen from 'react-native-splash-screen'
import ProductBox from '../../Component/ProductBox'




const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const categoryHeight = '19%';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {

           

            offerList: [1, 2, 3],
message:'',
        }

    }
    UNSAFE_componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
    }


 handleFirstConnectivityChange=(connectionInfo)=> {
    console.warn('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    NetInfo.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }

    componentDidMount() {

        SplashScreen.hide();

          const unsubscribed = this.props.navigation.addListener('focus', () => {
            // this.getPromos()
            // this.getCategoryListHome();
         
          });

        // console.warn('Object of netInfo ',NetInfo.addEventListener)
        this.getPromos();
        this.getCategoryListHome();
       this.getCompanyInfo()
      this.getHomeProductDetail()
         
    }
    getCompanyInfo=async()=>{

        const url = "/companyinfo";
        const constant = {
          init: "COMPANY_INFO_INIT",
          success: "COMPANY_INFO_SUCCESS",
          error: "COMPANY_INFO_ERROR",
        };
        const identifier = "COMPANY_INFO";
        const key = "companyInfo";
        const obj = { };
        // const type = "?Id=" + itemId;
    
        let dataRes= await this.props.commonActionPost(obj, url, constant, identifier, key);
         console.log('******Company Info************',dataRes)
    }
   

    getHomeProductDetail=async()=>{

        const url = "/homepageproduct";
        const constant = {
          init: "HOME_PRODUCT_LIST_INIT",
          success: "HOME_PRODUCT_LIST_SUCCESS",
          error: "HOME_PRODUCT_LIST_ERROR",
        };
        const identifier = "HOME_PRODUCT_LIST";
        const key = "homeProductList";
        const obj = {
            uriData: ''
        }
        const type="";
        let dataRes= await this.props.getTypeListAction(obj,url,constant,identifier,key,type)
        // const obj = { };
        
    
        // let dataRes= await this.props.commonActionPost(obj, url, constant, identifier, key);
         console.log('******Home Product List************',dataRes)
    }


    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.back_Button_Press);
    }

    back_Button_Press = () => {
        BackHandler.exitApp();
        return true;
    }


    onRefresh=()=>{
        this.getPromos();
        this.getCategoryListHome();
        this.getCompanyInfo()
        this.getHomeProductDetail()
    }

    getPromos = () => {

        console.log('Image base url ', imageBaseUrl)

        const constants = {
            init: "GET_PROMOS_LIST_INIT",
            success: "GET_PROMOS_LIST_SUCCESS",
            error: "GET_PROMOS_LIST_ERROR",
        }
        const key = "promoList";
        const identifier = "GET_PROMOS_LIST";
        const url = "/sliderlist";
        const obj = {}
        this.props.commonActionGet(obj, url, constants, identifier, key)
    }

    getCategoryListHome = () => {



        const constants = {
            init: "GET_CAT_LIST_HOME_INIT",
            success: "GET_CAT_LIST_HOME_SUCCESS",
            error: "GET_CAT_LIST_HOME_ERROR",
        }
        const key = "catListHome";
        const identifier = "GET_CAT_LIST_HOME";
        const url = "/categorylist";
        const obj = {
            uriData: 1
        }
        const type="?type=";
        this.props.getTypeListAction(obj,url,constants,identifier,key,type)
        
       // this.props.commonActionGet(obj, url, constants, identifier, key)
    }


    searchRender = () => {
        return (
            <View style={styles.search}>
                <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }} >
                    <Image style={{ height: 15, width: 15 }} source={require('../../assets/images/search.jpg')} />
                </View>
                <TextInput
                    style={{ flex: 0.9, height: '100%', color: '#000' }}
                    placeholder="Search category"
                    placeholderTextColor={"#808080"}
                    onKeyPress={keyPress => console.warn(keyPress)}
                    onFocus={() => this.props.navigation.navigate('SearchScreen')}
                />
            </View>
        )
    }

    navigate = (screen, params) => {
        this.props.navigation.navigate(screen, params)
    }


    categoryItems = () => {
    let arr = [];
    console.log("catListHome-----",_get(this.props, 'catListHome', []))
    this.props.catListHome && _get(this.props, 'catListHome', []).map((item,index)=>{
        if(index==5){
            arr.push({"Name":"See More"})
            return;
        }
        else{
            arr.push(item)
        }
        console.log('Index------- ',index)
    })

        return (
            // _get(this.props, 'catListHome', []).map(item => {
               arr.map(item => {
            
                return (
                    item.Name=="See More"?
                        <TouchableOpacity style={styles.itemView} onPress={() => { this.navigate('SeeMoreScreen') }}>
                            <Text>{item.Name}</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={styles.itemView} onPress={() => { this.navigate("VenderListDetails", { item: item }) }}>

                            <Image source={{ uri: imageBaseUrl + item.ImgLogo }} style={{ height: 40, width: 40,resizeMode:'contain' }} />

                            <Text style={{ color: '#808080', marginTop: 5,fontSize:10 }} numberOfLines={0}>{item.Name}</Text>

                        </TouchableOpacity>
                )

            })
        )
    }
    renderItems = (item) => {
        console.log('get render items----', item.item)
        return (
            <TouchableOpacity style={styles.offerListItems}>
                <Image style={{ width: '100%', height: '100%', borderRadius: 10, resizeMode: 'stretch' }} source={{ uri: imageBaseUrl + item.item.ImageName }} />
            </TouchableOpacity>
        )
    }

    flatlistView = () => {
        console.log('Promos List in Flat list ', this.props)
        return (

            <FlatList
                style={styles.flatList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // data={this.state.offerList}
                data={this.props.promoList}
                renderItem={(item, index) => this.renderItems(item)}
                keyExtractor={(item, index) => {
         return  index.toString();
        }}
            />

        )

    }





    textView = (text) => {
        return (
            <View style={styles.category}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>{text}</Text>
            </View>
        )
    }

    

    categoryView = () => {
      //  console.log(' this.props.catListHome--- ', _get(this.props, 'catListHome', []).length)
      {/* <ListItems style={styles.listRow} length={[1,2,3,4,5,6]}/> */}
              
            return (
                <View style={styles.categoryViewParent}>
                {_get(this.props, 'catListHome', []).length== 0 ?
               
                
                <ListItems style={styles.listRow} length={[1,2,3,4,5,6]}/> 

               
             
                :
             
                   this.categoryItems()}
                 
                  
                 
              
            
                  </View>
            )


       
       
    }

    offersView = () => {


        return (
            <View style={{ width: '100%', height: 240, backgroundColor: '#fff',paddingRight:10,paddingLeft:10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, padding: 5, paddingBottom: 0 }}>
                    {/* <Text style={{fontWeight:'500',fontSize:20}}>Promos for you</Text> */}
                    {/* {this.textView('Promos for you')} */}
                    {/* <Text style={{ color: '#0000FB' }}>see more...</Text> */}
                </View>

                {_get(this.props, 'promoList', []).length == 0 ?
                    <PromoList />
                    :
                    this.flatlistView()
                }
            </View>
        )
    }

    showMore = () => {
        return (

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', paddingRight: 8 }}>
                <Text style={{ color: '#000FBB' }}>see more...</Text>
            </View>

        )
    }

    handleInputValue=(val)=> {
        console.log("Getting value from Child******* ",val)
        this.setState({ message: val },()=>{});
      }

    boxRenderView = () => {
    let productList = this.props.homeProductList||[];


       
        return (
            <View style={styles.boxParentView}>
                    {productList.map((items)=>{
                        return(
                            <ProductBox item={items} 
                            handleInput={this.handleInputValue} 

                            /> 
                        )
                                 
            })}
            </View>
           
        )
    }

    




    render() {
         let {IsSingle} = this.props.companyInfo|| false;
        console.log('Company Info IsSingle----- ',IsSingle)
        return (
            <View style={styles.container}>
            <Header title="Home" props={this.props} right={true} count={_get(this.props.cartItems,'length',0)}/>
            {/* <NetInfoComp/> */}
           
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}
                
                refreshControl={
          <RefreshControl
          style={{backgroundColor:'#fff'}}
            refreshing={this.props.isLoad}
           colors={[themeColor,'#8685ff','#f36c1f','#fc0040']}
           tintColor={themeColor}
           title={'Loading...'}
            onRefresh={()=>this.onRefresh()}
          />
        }
                >
                
               

<View style={{backgroundColor:themeColor,borderWidth:0}}>

                {this.searchRender()}
                {this.categoryView()}
                <View style={{height:35}} />
            </View>

               <View>
               {/* <View style={{height:35}} /> */}
                    <View style={[styles.break, { marginTop: 0, marginBottom: 0, borderWidth: 0,borderWidth:1 }]} />
                    <View style={{borderWidth:0,borderRadius:20,overflow:'hidden',top:-25}}>
                    {this.offersView()} 
                  
                    <View style={[styles.break, { marginTop: 5, marginBottom: 0, borderWidth: 0 }]} />
                    {!IsSingle?
                  <View>
                    {this.textView("Recommended Venders")}
                    <VenderList props={this.props} id={0} length={[1,2]}/>
                    </View>
                    :
                    null
                    }
                    </View>
                    

                    <View style={{borderWidth:0}}>
                    {this.textView("Best selling products")}
                    <View style={{borderWidth:0,padding:8}}>
                    {this.boxRenderView()} 
                    </View>
                    </View>
                     
                    </View>

                  
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // marginBottom: 40,
      
    },
    imageDoodle: {
        flex: 1,
        // width: '100%',
        // height: '100%',
       // opacity: 0.8,
        backgroundColor:themeColor
      },
     
    search: {
        width: '95%',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 5,
            height: 8
        },
        elevation: 5,
        //shadowColor: '#ccc',
        shadowColor: 'rgba(0,0,0,0.25)',
        backgroundColor: '#fff',
        alignSelf:'center',
        marginTop:10,
        marginBottom:10,
       
    },

    break: {
        height: 1, width: '110%',
        borderWidth: 0.5,
        marginTop: 20,
        marginBottom: 20,
        borderColor: '#ccc'
    },

    category: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        
        // width:'100%',

    },
    categoryView: {
      //  height:categoryHeight,
      height:'9%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
       // marginBottom: 10,
       // padding: 10,
       // overflow: 'hidden',
       ///  borderWidth:1
    },

    itemView: {
        height: 90,
        width: '29%',
        margin: 5,
        padding:10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 5,
            height: 10
        },
        elevation: 5,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth:1
       // backgroundColor:themeColor
    },

    flatList: {
        //height: 70,
        padding:10,
        width: '100%',
        flexDirection: 'row',

    },
    boxParentView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 0,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom:57,
        
    },

    boxView: {
       // height: 200,
        width: '48%',
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
        marginLeft:6
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

    // add: {
    //     height: 40,
    //     width: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 40,
    //     elevation: 8,
    //     backgroundColor: '#f5f5f5',
    //     shadowOffset: {
    //         width: 5,
    //         height: 5
    //     },
    //     shadowOpacity: 0.8,
    //     shadowColor: '#ccc'
         
    // },
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
    listRow:{
        // height:90,
        // width:110,
        height:height/9.5,
        width:width/4.4,
        margin:5,
        borderRadius:10,
       
    },
    offerListItems:{ 
        height: "90%", width: 300, 
        margin: 10,
        elevation:5,
        shadowOpacity:0.8,
        shadowColor:'#ccc',
        shadowRadius:10 
    },
    categoryViewParent:
    {
        borderWidth:0,
        flexDirection:'row',
        flexWrap:'wrap',
        margin:10,
        justifyContent:'center',
        //alignItems:'flex-start',
        borderRadius:10,
        padding:10,
        backgroundColor:'#f5f5f5',
        shadowOpacity:3,
        shadowColor:'rgba(0,0,0,0.25)',
        shadowRadius:10,
        elevation: 5,
       // borderWidth:1
    }

})


const mapStateToProps = state => (

    {

        promoList: state.commonReducer.promoList,
        catListHome: state.commonReducer.catListHome,
        isLoad:state.commonReducer.isLoad,
        cartItems:state.commonReducer.cartItems,
        homeProductList:state.commonReducer.homeProductList,
        companyInfo: state.commonReducer.companyInfo,
    }

);

const mapDispatchToProps = dispatch => ({
    commonActionGet: (obj, url, constants, identifier, key) => dispatch(commonActionGet(obj, url, constants, identifier, key)),
    commonActionPost: (obj, url, constants, identifier, key) => dispatch(commonActionPost(obj, url, constants, identifier, key)),
    getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)


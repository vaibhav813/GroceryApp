import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView, Image, BackHandler} from 'react-native';

import { commonActionGet, commonActionPost, getTypeListAction } from '../../action/commonAction'
import { connect } from 'react-redux';
import { imageBaseUrl } from '../../Component/config'
import _get from 'lodash/get';
import { ListItems, PromoList } from '../../Component/SkeltonRow';
import Header from '../../Component/Header'  
import VenderList from '../../Screens/Vender/index'


const categoryHeight = '16%';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {

            listData: [{ "id": 1, "name": 'vegitable' }, { "id": 2, "name": 'fruits' },
            { "id": 3, "name": 'meat' }, { "id": 4, "name": 'seafood' }, { "id": 5, "name": 'milk & egg' },
            { "id": 6, "name": 'bread' }, { "id": 7, "name": 'frozen' }, { "id": 8, "name": 'organic' }],

            offerList: [1, 2, 3],

        }

    }
    UNSAFE_componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
    }

UNSAFE_componentWillMount(){
  
}
    componentDidMount() {
        this.getPromos()
        this.getCategoryListHome();
      //  console.log("**********",_get(this.props, 'catListHome', []))
         
    }
    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.back_Button_Press);
    }

    back_Button_Press = () => {
        BackHandler.exitApp();
        return true;
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
                    <Image style={{ height: 15, width: 15 }} source={require('../../assets/images/search.png')} />
                </View>
                <TextInput
                    style={{ flex: 0.9, height: '100%', color: '#000' }}
                    placeholder="Search category"
                    placeholderTextColor={"#808080"}
                />
            </View>
        )

    }

    navigate = (screen, params) => {
        this.props.navigation.navigate(screen, params)
    }


    categoryItems = () => {


        return (
            _get(this.props, 'catListHome', []).map(item => {
             console.log('get Item in Map ^^^^^^^^ ',item)
                return (
                    item.Name=="See More"?
                        <TouchableOpacity style={styles.itemView} onPress={() => { this.navigate('SeeMoreScreen') }}>
                            <Text>See More</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={styles.itemView} onPress={() => { this.navigate('AllCategoryScreen') }}>

                            <Image source={{ uri: imageBaseUrl + item.ImgLogo }} style={{ height: 40, width: 40,resizeMode:'contain' }} />

                            <Text style={{ color: '#808080', marginTop: 5 }}>{item.Name}</Text>

                        </TouchableOpacity>
                )

            })
        )
    }
    renderItems = (item) => {
        console.log('get render items----', item.item)
        return (
            <TouchableOpacity style={{ height: "90%", width: 300, margin: 10 }}>
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
                keyExtractor={item => item.id}
            />

        )

    }





    textView = (text) => {
        return (
            <View style={styles.category}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 10 }}>{text}</Text>
            </View>
        )
    }

    onTouch = () => {

    }

    categoryView = () => {
        console.log(' this.props.catListHome--- ', this.props.catListHome)
        return (
          
            _get(this.props, 'catListHome', []).length == 0 ?
            <ListItems />
            :
            <View style={styles.categoryView}>
               {this.categoryItems()}
              </View>
        
        )
    }

    offersView = () => {
        return (
            <View style={{ width: '100%', height: 250, backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0, padding: 5, paddingBottom: 0 }}>
                    {/* <Text style={{fontWeight:'500',fontSize:20}}>Promos for you</Text> */}
                    {this.textView('Promos for you')}
                    <Text style={{ color: '#0000FB' }}>see more...</Text>
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

    boxRenderView = () => {
        return (
            <View
                style={styles.boxParentView}>
                {this.boxRender()}
                {this.boxRender()}
                {this.boxRender()}
                {this.boxRender()}
            </View>
        )
    }

    boxRender = () => {
        return (

            <TouchableOpacity style={styles.boxView} activeOpacity={0.9}>

                <View style={{ height: 25, width: 40, borderRadius: 5, backgroundColor: '#ffe6e6', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'orangered' }}>5%</Text>
                </View>
                <Image style={{ height: 90, width: 90, alignSelf: 'center' }} source={require('../../assets/images/green/g5.png')} />

                <View style={{ width: '100%', height: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600' }}>Tomato</Text>
                </View>
                <View style={styles.priceAndAdd}>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: "green" }}>$0.8/kg</Text>
                    <TouchableOpacity style={styles.add}><Text style={{ color: "red" }}>+</Text></TouchableOpacity>
                </View>

            </TouchableOpacity>
        )
    }




    render() {
        return (
            <View style={styles.container}>
            <Header title="Home" props={this.props} right={true}/>
           


            <View style={styles.break} />
            

           
                   

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                   
                {this.searchRender()}
                    <View style={styles.break} />
                    {this.textView('What do you looking for?')}
                    <View style={styles.break} />
                    {this.categoryView()}


                    <View style={[styles.break, { marginTop: 5, marginBottom: 0, borderWidth: 0 }]} />
                    {this.offersView()} 
                    <View style={[styles.break, { marginTop: 5, marginBottom: 0, borderWidth: 0 }]} />
                    {this.textView("Pick's today")}
                    <VenderList props={this.props}/>

                    {this.boxRenderView()} 
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // padding: 5,
    },

    search: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        borderRadius: 10,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 5,
            height: 8
        },
        elevation: 5,
        shadowColor: '#ccc',
        backgroundColor: '#fff'
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
        height:categoryHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
       // marginBottom: 10,
       // padding: 10,
        overflow: 'hidden',
        // borderWidth:1
    },

    itemView: {
        height: 90,
        width: '30%',
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 5,
            height: 10
        },
        elevation: 5,
        shadowRadius: 8,
        shadowColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },

    flatList: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
    },
    boxParentView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },

    boxView: {
        height: 200,
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
        marginTop: 10
    },
    priceAndAdd:
    {
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    add: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 8,
        backgroundColor: '#f5f5f5',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.8,
        shadowColor: '#ccc'

    }

})


const mapStateToProps = state => (

    {

        promoList: state.commonReducer.promoList,
        catListHome: state.commonReducer.catListHome,
    }

);

const mapDispatchToProps = dispatch => ({
    commonActionGet: (obj, url, constants, identifier, key) => dispatch(commonActionGet(obj, url, constants, identifier, key)),
    commonActionPost: (obj, url, constants, identifier, key) => dispatch(commonActionPost(obj, url, constants, identifier, key)),
    getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)

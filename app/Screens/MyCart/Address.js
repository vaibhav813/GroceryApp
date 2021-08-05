import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Modal
} from "react-native";

import { themeColor } from "../../Component/config";
import Header from "../../Component/Header/index";
import { connect } from "react-redux";
import { getDataSaveList,commonActionPost} from "../../action/commonAction";
import _get from "lodash/get";
import SplashScreen from "react-native-splash-screen";
import Geolocation from '@react-native-community/geolocation'
// import Geocoder from 'react-native-geocoder';
import {dangerRed} from '../../Component/config'
import _isEmpty from 'lodash/isEmpty';
import Loader from '../../Component/Loader'


class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: false,
      name: "",
      addr: "",
      addrType: "Office",
     
      listObj: [],
      latitude:'',
      longitude:'',
      houseNumber:0,
      streetName:'',
      landMark:'',
      stateId:0,cityId:0,
      pinCode:0,addressType:0,
      selectItem:{},
      itemId:0,
      userId:0,
      isVisible:false,
      addressTypeList:[{label:'Home',value:0},{label:'Office',value:1},{label:'Other',value:2}]

    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.setState({ listObj: this.props.savedAddress });
   this.getCurrentLocation();
   this.getAddressList();
  }


  selectAddressDefault=async(item)=>{
    //console.log('select by default address ',item)
    let UserId = this.props.loginData.Id||2;
    const url = "/defaultaddress";
    const constant = {
      init: "DEFAULT_ADDRESS_INIT",
      success: "DEFAULT_ADDRESS_SUCCESS",
      error: "DEFAULT_ADDRESS_ERROR",
    };
    const identifier = "DEFAULT_ADDRESS";
    const key = "defaultAddress";
    const obj = { Id: item.item.Id, UserId:UserId};
    // const type = "?Id=" + itemId;

    let dataRes= await this.props.commonActionPost(obj, url, constant, identifier, key);
    console.log('Default data response---- ',dataRes)
  }


  selectAddress = (item) => {

this.selectAddressDefault(item);


    if(!_isEmpty(item)){
      let {Id,HouseNo,CityId,Addresstype,Landmark,Msg,Pincode,StateId,StreetName,UserId}= item.item
      console.log(Id,HouseNo,CityId,Addresstype,Landmark,Msg,Pincode,StateId,StreetName,UserId)
      this.setState({houseNumber:HouseNo})
      this.setState({streetName:StreetName})
      this.setState({landMark:Landmark})
      // this.setState({stateId:StateId})
      // this.setState({cityId:CityId})
      this.setState({pinCode:Pincode})
      this.setState({addressType:Addresstype})
      this.setState({userId:UserId})
      this.setState({itemId:Id})
      
    }

    console.log('Select address ',item)
    this.setState({address:true})
    this.setState({selectItem:item.item})


    // let newArr = [];
    // this.props.savedAddress.map((listItem) => {
    //   console.log("Id--- ", listItem.id, "==", item.item.id);
    //   if (listItem.id == item.item.id) {
    //     Object.assign(item.item, { isSelect: "true" });
    //     newArr.push(item.item);
    //   } else {
    //     console.log(" IN ELSE ");
    //     Object.assign(listItem, { isSelect: "false" });
    //     newArr.push(listItem);
    //   }
    // });

   // this.setState({ listObj: newArr }, () => {});
  };


  getCurrentLocation=()=>{

    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        console.log('Position ',position)
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
          this.setState({longitude:currentLongitude})
    
        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
          this.setState({latitude:currentLatitude})
          
       }, (error) => alert(error.message), { 
         enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
       }
    );
  
  }
convertLatLongToAddress=()=>{
const latLong={
  lat:this.state.latitude,
  lng:this.state.longitude
}

//   Geocoder.geocodePosition(latLong).then(res => {
//     // res is an Array of geocoding object (see below)
//     console.log('Get User address from lat long----',res)
// })
// .catch(err => console.log(err))
}


  replaceItem = () => {
    const newArrayList = [];
    this.props.savedAddress.forEach((obj) => {
      if (!newArrayList.some((o) => o.id === obj.id)) {
        newArrayList.push({ ...obj });
      }
    });

    this.setState({ listObj: newArrayList });
  };

  renderItem = (item) => {
    console.log("Address Item is ", item);

    return (
      <TouchableOpacity
        style={[
          styles.listItems,
          { borderColor: item.item.IsSelect == true ? themeColor : "#ccc" },
        ]}
        onPress={() => this.selectAddress(item)}
      >
        <View style={{ width: 200 }}>
          {/* <Text style={{ fontWeight: "600" }}>{item.item.title}</Text> */}
          <Text style={{ fontWeight: "600" }}>{item.item.Addresstype==0?"Home":item.item.Addresstype==1?"Office":"Other"}</Text>
          <Text>{item.item.HouseNo},  <Text>{item.item.StreetName}</Text> </Text>
          <Text>{item.item.Landmark}</Text>
          <Text>{item.item.Pincode}</Text>
        </View>
        {item.item.title == "Home" ? (
          <View
            style={{
              height: "100%",
              width: 60,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                color: themeColor,
                padding: 5,
                backgroundColor: "#e6fffa",
                width: "100%",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: themeColor,
              }}
            >
              default
            </Text>
          </View>
        ) : (
          <View
            style={{
              height: "100%",
              width: 60,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  addressView = () => {
    return (
      <FlatList
        style={{ width: "100%", height: "100%" }}
       // data={this.props.savedAddress}
        // data={this.state.listObj}
        data={this.props.userAddressList}
        renderItem={(item) => this.renderItem(item)}
        ListEmptyComponent={()=>this.emptyComp()}
        keyExtractor={(item, index) => {
         return  index.toString();
        }}
      />
    );
  };
  emptyComp=()=>{
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center',top:200}}>
      <Text style={{color:dangerRed,fontWeight:'800',fontSize:15,}}>No Address Registered</Text>  
      </View>
         
    )
  }

  typeFunction = (type) => {
    if (type == "Address") {
      this.addAddressFunc(type);
    } else if (type == "setAddress") {
      this.setAddressFunc(type);
    } else {
      this.continue();
    }
  };
  

  addAddressFunc = (type) => {
     this.setState({ address: true });
     console.log('Latitude ',this.state.latitude)
     console.log('Longitude ',this.state.longitude)
     this.addAddressToServer(type)
     //this.convertLatLongToAddress()
  }



  addAddressToServer=async(type)=>{

    // let Id= type=='setAddress'?0:this.props.userAddressList.Id;
    let Id = this.state.itemId||0;
    let UserId = this.props.loginData.Id||2;
    let HouseNo = this.state.houseNumber;
    let StreetName = this.state.streetName;
    let Landmark = this.state.landMark;
    let StateId = this.state.stateId;
    let CityId = this.state.cityId;
    let Pincode = this.state.pinCode;
    let Addresstype = this.state.addressType;

    const addressInfo={
      Id:Id,
      UserId:UserId,
      HouseNo:HouseNo,
      StreetName:StreetName,
      Landmark:Landmark,
      StateId:StateId,
      CityId:CityId,
      Pincode:Pincode,
      Addresstype:Addresstype
      //"position":"22.3345555,11.2234666"
     }

  


 const url="/addresssubmit";
 const constants={
     init:"USER_ADDRESS_INIT",
     success:'USER_ADDRESS_SUCCESS',
     error:"USER_ADDRESS_ERROR"
 }
const identifier = "USER_ADDRESS";
const key = "registerAddress";

const data = await this.props.commonActionPost(addressInfo,url,constants,identifier,key)
console.log('response Register ',data)
this.getAddressList()
this.setState({ address: false });

  }




  getAddressList=async()=>{


    let UserId=this.props.loginData.Id ||2;
    const addressInfo={
      UserId:UserId,
     }

  


 const url="/addresslist";
 const constants={
     init:"USER_ADDRESS_LIST_INIT",
     success:'USER_ADDRESS_LIST_SUCCESS',
     error:"USER_ADDRESS_LIST_ERROR"
 }
const identifier = "USER_ADDRESS_LIST";
const key = "userAddressList";

const data = await this.props.commonActionPost(addressInfo,url,constants,identifier,key)
console.log('Users Address List ',data)

  }


  continue = () => {
   //  console.log("We have updated list ", this.props.savedAddress);
    // this.setAddressLocally(this.state.listObj);
    this.props.navigation.navigate("ConfirmCartScreen");
  };

  addButton = (text, type) => {
    // console.log('Get type here--- ',type)
    return (
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => {
          this.typeFunction(type);
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>{text}{" "}</Text>
      </TouchableOpacity>
    );
  };

  setAddressFunc = () => {
    console.log('Submit address----- ',this.state.houseNumber,this.state.streetName,this.state.pinCode,this.state.landMark,this.state.stateId,this.state.cityId,this.state.addressType)
    if (
      this.state.houseNumber == "" ||
      this.state.streetName == "" ||
      this.state.pinCode == ""||
      this.state.landMark==""
     
    ) {
       // this.state.stateId==""||
      // this.state.cityId==""||
      // this.state.addressType==""
      alert("All fields are require.");
    }
    else{
      this.addAddressToServer()
    }

    // } else {
    //   let id = 1;
    //   id =
    //     _get(this.props, "savedAddress.length", []) > 0
    //       ? this.props.savedAddress[this.props.savedAddress.length - 1].id + 1
    //       : 1;
    // //  console.log("Id address--- ", id);



    //   let obj = {
    //     id: id,

    //     title:
    //       this.state.addrType == "" ? this.state.name : this.state.addrType,
    //     name: this.state.name,
    //     details: this.state.addr,
    //     isSelect: "true",
    //   };


        
     

        

    //   this.setState({ address: false });
    //   this.manageAddressList(obj);
    // }
  };

 

manageAddressList=(addressObj)=>{
    if (addressObj != undefined) {
        let data = {};
        let arr = [];
        if (this.props.savedAddress && this.props.savedAddress.length > 0) {
            this.props.savedAddress.map(item=>{
                if(addressObj.id!=item.id){
                    Object.assign(item,{isSelect:"false"})
                    arr.push(item)
                }
            })
             //arr=this.props.savedAddress;
          //arr = this.state.listObj;
          arr.push(addressObj);
          // data = arr;
        } else {
          arr.push(addressObj);
        }
      
  this.setAddressLocally(arr)
}
}

  setAddressLocally = (arr) => {
    console.log('setAddressLocally Array ******* ', arr,' props ',this.props.savedAddress)
      const key = "savedAddress";
      const identifier = "SAVE_ADDRESS_LIST";

      this.props.getCartSaveList(arr, identifier, key);
    }
 

  setAddress = () => {
    console.log('We have selected value is-----',this.state.addressType)



    return (
      <View style={{  width: "100%" }}>
        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            color: "#000",
          }}
          onChangeText={(text) => this.setState({ houseNumber: text })}
          value={this.state.houseNumber}
          placeholderTextColor={"#808080"}
          placeholder="Enter House Number"
        />


     <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            color: "#000",
          }}
          onChangeText={(text) => this.setState({ streetName: text })}
          value={this.state.streetName}
          placeholderTextColor={"#808080"}
          placeholder="Enter Street Name"
        />

<TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            color: "#000",
          }}
          onChangeText={(text) => this.setState({ landMark: text })}
          value={this.state.landMark}
          placeholderTextColor={"#808080"}
          placeholder="Enter Landmark"
        />

      

       
        {/* <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
          }}
          onChangeText={(text) => this.setState({ cityId: text })}
          value={this.state.cityId}
          placeholderTextColor={"#808080"}
          placeholder="Enter City Id"
        /> */}

        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
          }}
          onChangeText={(text) => this.setState({ pinCode: text })}
          value={this.state.pinCode}
          placeholderTextColor={"#808080"}
          placeholder="Enter Pincode"
        />

        {/* <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
          }}
          onChangeText={(text) => this.setState({ addressType: text })}
          value={this.state.addressType}
          placeholderTextColor={"#808080"}
          placeholder="Enter Address Type"
        /> */}
        {this.setValueonView(this.state.addressType==0?'Home':this.state.addressType==1?"Office":"Other",'addressType')}
        {/* {this.setValueonView(this.state.addressType)} */}
         {this.setValueonView(this.state.stateId,'state')}
        {this.setValueonView(this.state.cityId,'city')}

       

      </View>
    );
  };

  

addAddressView=()=>{
  return(

    <View style={styles.container}>
    <Header title="My Address" props={this.props} right={false} />
    <View style={{flex:1,padding:10}}>
           
        
    {this.setAddress()}
    {
      this.state.isVisible?
     this.modalView():null
    }
  
    {/* <ModalDropdown options={['option 1', 'option 2','option 2','option 2','option 2','option 2']} style={{height:40,width:"100%"}} 
    //isFullWidth={true}
    dropdownStyle={{width:'50%',backgroundColor:'tomato'}}
     onSelect={(i,item)=>{this.selectItem(item)}}/> */}
    
    <View style={{ height: Platform.OS == "ios" ? 50 : 100 }} />
    {this.addButton("Add", "setAddress")} 
    
  
    {/* {
*/}



</View>
</View>
  )
}

selectAddressView=()=>{
  return(
    <View style={styles.container}>
    <Header title="My Address" props={this.props} right={false} />
        <View style={{ flex: 1, padding: 10 }}>
        {this.props.isLoad?
        <Loader isLoad={this.props.isLoad} text="Loading...Please Wait. "/>
        :
        this.props.userAddressList && this.props.userAddressList.length>0?
           this.addressView()
          :
          this.emptyComp()
         
        }
          {this.addButton("Add", "Address")}
          {this.addButton("Countinue", "Coutinue")}
           
          </View>
          </View>
  )
}


  selectItem=(item)=>{
    console.log('Select Items ',item)
  }

  clickOnVisibleModal=()=>{
    this.setState({isVisible:true})
    }
    
    
    modalView=()=>{
      console.log('render Modal Items----',this.state.addressTypeList)
      return(
    <TouchableWithoutFeedback style={styles.centeredView}  onPress={()=>{this.setState({isVisible:false})}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
             this.setState({isVisible:false})
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {this.flatListView()}
                


               
              </View>
            </View>
          </Modal>
        
        </TouchableWithoutFeedback>
      )
    }

    flatListView=()=>{

      return(
        <FlatList
        style={{width:'100%',backgroundColor:'#fff',padding:10,borderRadius:10}}
        data={this.state.addressTypeList}
        renderItem={(item)=>this.renderModalItem(item.item)}
        keyExtractor={(item, index) => {
         return  index.toString();
        }}
        />
      )
    }
    renderModalItem=(item)=>{
      console.log('render Modal Items View----',item)
      return(
      <TouchableOpacity style={{height:40,width:'100%',justifyContent:'center',alignItems:'flex-start',paddingLeft:10,borderWidth:1,borderRadius:5,marginTop:5,backgroundColor:'#fff',borderColor:themeColor}}
      onPress={()=>this.selectOptions(item)}
      >
      <Text style={{color:themeColor}}>{item.label}</Text>
      </TouchableOpacity>
      )
    }

    setValueonView=(text,type)=>{
      return(
<TouchableOpacity style={{height:50,width:'100%',justifyContent:'center',alignItems:'flex-start',borderWidth:1,borderRadius:5, marginTop: 10,paddingLeft:10,borderColor:'#ccc'}} 
onPress={()=>this.setState({isVisible:true})}>
  <Text>{text}</Text>
</TouchableOpacity>

      )
    }

    selectOptions=(item)=>{
     this.setState({isVisible:false})
     this.setState({addressType:item.value})
    }




    render() {
   
      return (    
        
  
          this.state.address ? 
            this.addAddressView()
               
           : 
            this.selectAddressView()
      );
    }
}








const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10
  },
  listItems: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonView: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColor,
    borderRadius: 5,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  //  backgroundColor:"rgba(0,0,0,0.25)",
    //borderWidth:1
   
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius:10,
    //padding: 10,
   // height:'50%',
    width:'90%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

const mapStateToProps = (state) => ({
  //promoList: state.commonReducer.promoList,
  savedAddress: state.commonReducer.savedAddress || [],
  loginData: state.commonReducer.loginData||{},
  userAddressList:state.commonReducer.userAddressList,
  isLoad:state.commonReducer.isLoad,
});

const mapDispatchToProps = (dispatch) => ({
  getCartSaveList: (data, identifier, key) =>
    dispatch(getDataSaveList(data, identifier, key)),

    commonActionPost:(addressInfo,url,constants,identifier,key)=>
    dispatch(commonActionPost(addressInfo,url,constants,identifier,key))
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);

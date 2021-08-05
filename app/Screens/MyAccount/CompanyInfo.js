
import React, { Component,PureComponent } from 'react';
import { View, Text,StyleSheet,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {getTypeListAction} from '../../action/commonAction'
import _get from 'lodash/get';
import {imageBaseUrl} from '../../Component/config'
import Header from '../../Component/Header'  
import {themeColor} from '../../Component/config'
import {VenderListSkelton} from '../../Component/SkeltonView'
import HTML from "react-native-render-html";

const data =[{"name":"Laxmi Mishthan Bhandar","img":'https://i.ibb.co/LQmZb1D/muton.jpg',"distance":"10 Km",
"address":"Malviya Nagar","rate":4.2,"time":"33 min","item":'₹300 for two'},
{"name":"Laxmi Mishthan Bhandar","img":'https://i.ibb.co/LQmZb1D/muton.jpg',"distance":"10 Km",
"address":"Malviya Nagar","rate":4.2,"time":"33 min","item":'₹300 for two'}
]

 class CompanyInfo extends PureComponent {                                             
  constructor(props) {
    super(props);
    this.state = {
        details:'',title:'',
        mobile:'',email:''
    };
  }

componentDidMount(){
    
console.log('Get Company Info---- ',this.props.route.params.name)
console.log('Get Company Info 2---- ',this.props.companyInfo)
let {TermsNdCondition,SupportMobileno,AboutUs,Address,CompanyName,Email,Mobileno,PrivacyPolicy,ReturnPolicy,SupportEmail} =this.props.companyInfo;
// console.log('get all values***** ',TermsNdCondition,SupportMobileno,AboutUs,Address,CompanyName,Email,Mobileno,PrivacyPolicy,ReturnPolicy,SupportEmail)
if(this.props.route.params.name=="Terms,Privacy And Policy"){
  
    this.setState({title:this.props.route.params.name})
    this.setState({details:TermsNdCondition})
    this.setState({title2:"Privacy Policy"})
    this.setState({details2:PrivacyPolicy})
}
else if(this.props.route.params.name=="Help & Support"){
    this.setState({title:this.props.route.params.name})
    this.setState({details:PrivacyPolicy})
    this.setState({mobile:Mobileno})
    this.setState({email:SupportEmail})

}

else{
    this.setState({title:"Company Info"})
    this.setState({details:"No data available"})
}

}


  

 



 

 emptyListView=()=>{
     return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>
        Empty Vender List!
        </Text>
        </View>
     )
 }

 
helpAndSupport=()=>{
console.log('In Health and support*************')
    let title = "<h2>"+_get(this.state,'title','--')+"</h2>"||"No data";
    let details = _get(this.state,'details',"--")||"No details";
    let email = _get(this.state,'email',"--")||"";
    let mobile=_get(this.state,"mobile","")||"";
    return(
        <View>
        {/* <View style={[styles.textView,{padding:0}]}> */}
      <HTML style={{fontWeight:'bold'}}
              source={{
                html: title,
              }}
              contentWidth="100%"
            />
   
      
      {/* </View> */}
      <View style={styles.textView}>
  
          <HTML
              source={{
                html: details,
              }}
              contentWidth="100%"
            />
            <View style={{height:20}}/>
            <HTML
              source={{
                html: email,
              }}
              contentWidth="100%"
            />
              <View style={{height:20}}/>
            <HTML
              source={{
                html: mobile,
              }}
              contentWidth="100%"
            />

      </View>
      </View>
    )
}


privacyPolicy=()=>{
    let title = "<h2>"+_get(this.state,'title','--')+"</h2>"||"No data";
    let details = _get(this.state,'details',"--")||"No details";

    let title2 = "<h2>"+_get(this.state,'title2','--')+"</h2>"||"No data";
    let details2 = _get(this.state,'details2',"--")||"No details";
   
    return(
        <ScrollView style={{flex:1}}>
        {/* <View style={styles.textView}> */}
      <HTML style={{fontWeight:'bold'}}
              source={{
                html: title,
              }}
              contentWidth="100%"
            />
   
      
      {/* </View> */}
      <View style={styles.textView}>
  
          <HTML
              source={{
                html: details,
              }}
              contentWidth="100%"
            />
           
           

      </View>


      {/* <View style={styles.textView}> */}
      <HTML style={{fontWeight:'bold'}}
              source={{
                html: title2,
              }}
              contentWidth="100%"
            />
   
      
      {/* </View> */}
      <View style={styles.textView}>
  
          <HTML
              source={{
                html: details2,
              }}
              contentWidth="100%"
            />
           
           

      </View>
      </ScrollView>
    )

}


main=()=>{
    console.log('In Main Render---- ',this.props.route.params.name)
    if(this.props.route.params.name=="Terms,Privacy And Policy"){
        console.log('In If---- ',this.props.route.params.name)
        return(
            this.privacyPolicy()
        )
        
    }
    else if(this.props.route.params.name=="Help & Support"){
      return( this.helpAndSupport())
    }
}



  render() {
     // console.log('get vendor list home ',_get(this.props,'vendorListHome',[]))
    return (
    
       
      <View style={styles.container}>
      <Header title="Support" props={this.props} right={false}/>
     <View style={[styles.container,{padding:10}]}>
    { this.main()}
     {/* {this.privacyPolicy()} */}
     
     </View> 
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
        height:110,
        borderRadius:10

    },
    text:{color:'#808080', marginTop:10},
    textView:{marginTop:10,justifyContent:'center',alignItems:'flex-start',backgroundColor:'#fff',borderRadius:10,padding:10}
   

   



})

const mapStateToProps = state => (

    {

        // promoList: state.commonReducer.promoList,
        companyInfo: state.commonReducer.companyInfo,
         isLoad:state.commonReducer.isLoad,
    }

);

const mapDispatchToProps = dispatch => ({
    // commonActionGet: (obj, url, constants, identifier, key) => dispatch(commonActionGet(obj, url, constants, identifier, key)),
    // commonActionPost: (obj, url, constants, identifier, key) => dispatch(commonActionPost(obj, url, constants, identifier, key)),
    //  getTypeListAction: (obj, url, constants, identifier, key,type) => dispatch(getTypeListAction(obj, url, constants, identifier, key,type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo)
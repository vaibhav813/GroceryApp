import React,{Component} from 'react';
import {View,StyleSheet,TextInput,Text,ImageBackground, TouchableOpacity,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {commonActionPostLogin} from '../../action/commonAction'
// import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {reset} from '../../Component/RootNavigation'
import SplashScreen from 'react-native-splash-screen'
import {themeColor} from '../../Component/config'




class userLogin extends Component{
constructor(props)
{
super(props)
this.state={val:'',mail:'',password:''}
}


componentDidMount(){

    console.log("componentDidMount In login ",this.props)
    SplashScreen.hide()
}

onChangeText=(text,type)=>{

this.setState({val:text})

 if(type=="Enter e-mail"){
    this.setState({mail:text})
}
else if(type=="Enter Mobile Number"){
    this.setState({mail:text})
}
else {
    this.setState({password:text})
}

}

verticleView=()=>{
return(

<View style={styles.verticleView}>
    {/* <Text style={{fontSize:10,fontWeight:'700',color:'#fff'}}>
        You can login with
    </Text> */}
</View>

)

}
gotoHome=()=>{
if(this.state.mail=="" || this.state.password==""){
    alert("All fields are required!")
}
else{
const obj = {
"MobileNo":this.state.mail,
"Password":this.state.password
}
// console.log('Action ',this.props.login(obj))

const url="/GenerateJWTToken";
const constant = 
{init:"USER_LOGIN_INIT",
  success:"USER_LOGIN_SUCCESS",
error:"USER_LOGIN_ERROR"
}
const identifier = "USER_LOGIN";
const key="loginData";

const data=this.props.commonActionPostLogin(obj,url,constant,identifier,key)
//reset(this.props,'Login');
console.log('Login Data Response---',data)
console.log('Login Data Props---',this.props.loginData)


//this.props.navigation.navigate("tabHome");

}

    
}

buttonRenderView=()=>{
    return(
        <TouchableOpacity style={styles.button} onPress={()=>this.gotoHome()}>
<Text style={{color:'#fff',fontWeight:'600'}}>Login</Text>

        </TouchableOpacity>
    )
}

textInputRender=(type)=>{
return(

<View style={styles.textInputView}>
<TextInput
        style={styles.input}
        onChangeText={text=>this.onChangeText(text,type)}
        //value={type=="Enter e-mail"?this.state.mail:this.state.password}
        value={type=="Enter Mobile Number"?this.state.mail:this.state.password}
        
        placeholder={type}
        keyboardType={type=="Enter Mobile Number"?"phone-pad":"default"}
      />


</View>

)

}


loader=()=>{

    return(
        this.props.isLoad?
<ActivityIndicator size='large' color={themeColor}/>
: null

    )
}



render(){

return(

<View style={styles.container}>
<ImageBackground source={require('../../assets/images/register.jpeg')} style={styles.image} imageStyle={{ resizeMode:'cover'}}>

{/* <View style={styles.parentView_one}>
<Text style={styles.title}>Registration Form</Text>
</View>
<View style={styles.parentView_one}> */}
<Text style={styles.title}>Please login here</Text>

{/* {this.textInputRender("Enter e-mail")} */}
{this.textInputRender("Enter Mobile Number")}
{this.textInputRender("Password")}
{this.buttonRenderView()}
<View style={{height:50}}/>
{this.loader()}
{/* <Text style={{fontSize:10,fontWeight:'700',color:'#fff',marginTop:20}}>
        If you have an account the <Text style={{color:'tomato',fontStyle:'italic',}} onPress={()=>{this.goToLoginPage()}}>login here</Text>
    </Text> */}
{/* {this.verticleView()} */}

{/* </View> */}



</ImageBackground>
</View>

)

}

}

const styles= StyleSheet.create({

    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  //  padding:5,
    
    },
    verticleView:{
       width:'90%',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between' ,marginTop:20
    },
    image:{
       height:'100%',
       width:'100%',
         alignItems:'center',
         justifyContent:'center',
    },
    title:{
            fontWeight:'800',
            fontSize:20,
            color:themeColor,
            marginTop:20
         },
        parentView_one:
        {
        height:'50%',
        width:'100%',
        alignItems:'center',
        borderWidth:1     
    },
    parentView_two:{
        height:'50%',
        width:'100%',
        alignItems:'center',
        borderWidth:1
    },
    input:{
        height: "100%",
        width:'100%',
    },
    button:{
        height:50,
        width:'70%',
        backgroundColor:themeColor,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    textInputView:{
        height:40,
        width:'90%',
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:20,
        paddingLeft:10,
        margin: 12,
        backgroundColor:'#fff',
        marginTop:10,
      
    }

})

const mapStateToProps = state => (
  
    {
        loginData:state.commonReducer.loginData,
        isLoad:state.commonReducer.isLoad,
      
  }
  
  );
  
 
  const mapDispatchToProps = dispatch => ({
    commonActionPostLogin:(obj,url,constant,identifier,key)=>{dispatch(commonActionPostLogin(obj,url,constant,identifier,key))}
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(userLogin)
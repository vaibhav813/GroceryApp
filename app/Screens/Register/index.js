import React,{Component} from 'react';
import {View,StyleSheet,TextInput,Text,ImageBackground, TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import {commonAction} from '../../action/commonAction'

// import RNSmtpMailer from "react-native-smtp-mailer";

class Register extends Component{
constructor(props)
{
super(props)
this.state={val:'',name:'',phone:'',mail:'',address:'',type:'',password:'pass',isLoad:false}
}
componentDidMount(){
    // setTimeout(()=>{
    //     SplashScreen.hide();
    // },3000)
    SplashScreen.hide();
}

onChangeText=(text,type)=>{

    this.setState({type:type})
    
    if(type=="Enter name"){
    this.setState({name:text})
    }
    else if(type=="Enter Phone Number"){
        this.setState({phone:text})
    }
    else if(type=="Enter e-mail"){
        this.setState({mail:text})
    }
    else if(type=="Full Address") {
        this.setState({address:text})
    }
    else{
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

registeredUserValues=()=>{



   if(this.state.name=='' || this.state.phone==""||this.state.mail==""||this.state.address==""){
       console.log('All Fields Name ',this.state.name +" Phone "+this.state.phone+" Mail "+this.state.mail+" addr "+this.state.address)
    alert("All fields require!")
   }
else{
    let pass = this.randomPasswordGenerate();
   // this.sendMail(pass)
    const userInfo={
        "name":this.state.name,
        "phone":this.state.phone,
        "email":this.state.mail,
        "address":this.state.address,
        "pass":pass,
        "position":"22.3345555,11.2234666"
       }
   const url="/register";
   const constants={
       init:"USER_REGISTER_INIT",
       success:'USER_REGISTER_SUCCESS',
       error:"USER_REGISTER_ERROR"
   }
const identifier = "USER_REGISTER";
const key = "registerUser";
  
    this.props.commonAction(userInfo,url,constants,identifier,key)
    // this.props.navigation.navigate("Login");
}
 
  
}
goToLoginPage=()=>{
    this.props.navigation.navigate('Login')
}
buttonRenderView=()=>{
    return(
        <TouchableOpacity style={styles.button} onPress={()=>
       
        this.registeredUserValues()
        
        }>
<Text style={{color:'#fff',fontWeight:'600'}}>Register{" "}</Text>

        </TouchableOpacity>
    )
}


textInputRender=(type)=>{
return(

<View style={styles.textInputView}>
<TextInput
        style={styles.input}
        onChangeText={text=>this.onChangeText(text,type)}
        value={this.setValue(type)}
        placeholder={type}
        keyboardType={type=="Enter Phone Number"?"numeric":null}
      />


</View>

)

}

setValue=(type)=>{
let val = '';
    if(type=="Enter name"){
    val= this.state.name;
    }
    else if(type=="Enter Phone Number"){
val = this.state.phone;
    }
    else if(type=="Enter e-mail"){
val=this.state.mail;
    }
    else if(type=="Full Address"){
val=this.state.address;
    }
    else{
val=this.state.password;
    }
    return val;

}

randomPasswordGenerate=()=>{
    let pass = this.makeid(5)||'password';

    return pass;

}


 makeid=(length)=> {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

loader=()=>{

    return(
        this.state.isLoad?
<ActivityIndicator size='large' color='tomato'/>
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
<Text style={styles.title}>Registration Form</Text>
{this.textInputRender("Enter name")}
{this.textInputRender("Enter Phone Number")}
{this.textInputRender("Enter e-mail")}
{this.textInputRender("Full Address")}
{/* {this.textInputRender("Enter Password")} */}
{this.buttonRenderView()}
<Text style={{fontSize:10,fontWeight:'700',color:'#000',marginTop:20}}>
        If you have an account then <Text style={{color:'tomato',fontStyle:'italic',fontSize:12}} onPress={()=>{this.goToLoginPage()}}>login here {" "}</Text>
    </Text>
{this.loader()}

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
            fontWeight:'900',
            fontSize:20,
            color:'tomato',
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
        backgroundColor:'tomato',
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
    
      
  }
  
  );
  
 
  const mapDispatchToProps = dispatch => ({
      //register:(obj)=>{dispatch(registerAction(obj))},
      commonAction:(data,url,constants,identifier,key)=>{dispatch(commonAction(data,url,constants,identifier,key))}
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Register)
  
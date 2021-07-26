import React,{Component} from 'react';
import {View,StyleSheet,TextInput,Text,ImageBackground, TouchableOpacity,ToastAndroid,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import {commonActionPost} from '../../action/commonAction'
import { notifications, NotificationMessage, Android } from 'react-native-firebase-push-notifications'
import {themeColor} from '../../Component/config'
import Geolocation from '@react-native-community/geolocation'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


// import RNSmtpMailer from "react-native-smtp-mailer";

class Register extends Component{
constructor(props)
{
super(props)
this.state={val:'',name:'',phone:'',mail:'',address:'',type:'',password:'',
userInfo:{},
isLoad:false,confirmPass:""}
}
componentDidMount(){

    this.getToken()
     this.getCurrentLocation()
   this.googleSignIn()
  // this.getCurrentUserInfo()
    SplashScreen.hide();
    //this.signIn()
}



componentWillUnmount() {
    //remove the listener on unmount
    if (this.removeOnNotificationOpened) {
      this.removeOnNotificationOpened()
    }
    if (this.removeOnNotification) {
      this.removeOnNotification()
    }

    if (this.removeonTokenRefresh) {
      this.removeonTokenRefresh()
    }
  }


  googleSignIn=()=>{

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
     // scopes: ['profile', 'email'],
      webClientId: '775534471814-22nmggu85ibo2q0u5q8raglhdms2cpqp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
     // androidClientId: '775534471814-22nmggu85ibo2q0u5q8raglhdms2cpqp.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '775534471814-30d7fmbehvo05590a8eknhrmou6nqet3.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });     

  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log("Google Sign In ")
      const userInfo = await GoogleSignin.signIn();
      console.log("Google Sign In ",userInfo)
      this.setState({ userInfo });
    } catch (error) {
      console.log('Error ',error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info--- ',userInfo)
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };


  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('Get Current user ',currentUser)
    this.setState({ currentUser });
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };




getCurrentLocation=()=>{

  Geolocation.getCurrentPosition(
    //Will give you the current location
    (position) => {
      //getting the Longitude from the location json
      console.log('Position ',position)
      const currentLongitude =
        JSON.stringify(position.coords.longitude);
  
      //getting the Latitude from the location json
      const currentLatitude =
        JSON.stringify(position.coords.latitude);
        
     }, (error) => alert(error.message), { 
       enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
     }
  );

}


getToken = async () => {
    //get the messeging token
    const token = await notifications.getToken()
    console.log('Token ---- ',token)
    //you can also call messages.getToken() (does the same thing)
    return token
  }
  getInitialNotification = async () => {
    //get the initial token (triggered when app opens from a closed state)
    const notification = await notifications.getInitialNotification()
    console.log("getInitialNotification", notification)
    return notification
  }

  onNotificationOpenedListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the background
    this.removeOnNotificationOpened = notifications.onNotificationOpened(
      notification => {
        console.log("onNotificationOpened-------", notification)
        //do something with the notification
      }
    )
  }

  onNotificationListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the forground/runnning
    //for android make sure you manifest is setup - else this wont work
    //Android will not have any info set on the notification properties (title, subtitle, etc..), but _data will still contain information
    this.removeOnNotification = notifications.onNotification(notification => {
      //do something with the notification
      console.log("onNotification", notification)
    })
  }

  onTokenRefreshListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when a new token is generated for the user
    this.removeonTokenRefresh = messages.onTokenRefresh(token => {
      //do something with the new token
    })
  }
  setBadge = async number => {
    //only works on iOS and some Android Devices
    return await notifications.setBadge(number)
  }

  getBadge = async () => {
    //only works on iOS and some Android Devices
    return await notifications.getBadge()
  }

  hasPermission = async () => {
    //only works on iOS
    return await notifications.hasPermission()
    //or     return await messages.hasPermission()
  }

  requestPermission = async () => {
    //only works on iOS
    return await notifications.requestPermission()
    //or     return await messages.requestPermission()
  }

localNotification = async () => {
  //required for Android
  const channel = new Android.Channel(
    "test-channel",
    "Test Channel",
    Android.Importance.Max
  ).setDescription("My apps test channel")

  // for android create the channel
  notifications.android().createChannel(channel)
  await notifications.displayNotification(
    new NotificationMessage()
      .setNotificationId("notification-id")
      .setTitle("Notification title")
      .setBody("Notification body")
      .setData({
        key1: "key1",
        key2: "key2",
      })
      .android.setChannelId("test-channel") //required for android
  )
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
    else if(type=="Enter Password") {
        this.setState({password:text})
    }
    else{
        this.setState({confirmPass:text})
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

registeredUserValues=async()=>{
// this.setState({isLoad:true})


   if(this.state.name=='' || this.state.phone==""||this.state.mail==""||this.state.password==""|| this.state.confirmPass==""){
       console.log('All Fields Name ',this.state.name +" Phone "+this.state.phone+" Mail "+this.state.mail+" addr "+this.state.address)
    alert("All fields require!")
   }
else{
if(this.state.password!=this.state.confirmPass){
  alert('Password and confirm password is not same.')
}
else{
    const userInfo={
        "Name":this.state.name,
        "MobileNo":this.state.phone,
        "EmailId":this.state.mail,
        "Password":this.state.password,
        "ConfirmPassword":this.state.confirmPass,
        //"position":"22.3345555,11.2234666"
       }

    


   const url="/usersignup";
   const constants={
       init:"USER_REGISTER_INIT",
       success:'USER_REGISTER_SUCCESS',
       error:"USER_REGISTER_ERROR"
   }
const identifier = "USER_REGISTER";
const key = "registerUser";

const data = await this.props.commonActionPost(userInfo,url,constants,identifier,key)
console.log('response Register ',data)

  
}
// this.props.navigation.navigate('Login')
}
 
  
}
goToLoginPage=()=>{
    this.props.navigation.navigate('Login')
}
buttonRenderView=()=>{
    return(
        <TouchableOpacity style={[styles.button,{ backgroundColor:this.props.isLoad?'#808080':themeColor,}]} 
        disabled={this.props.isLoad}
        onPress={()=>
       
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
    else if(type=="Enter Password"){
val=this.state.password;
    }
    else{
val=this.state.confirmPass;
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
        this.props.isLoad?
<ActivityIndicator size='large' color={themeColor}/>
: null

    )
}

GSignInButton=()=>{
  return(
    <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={()=>this.signIn()}
    disabled={this.state.isSigninInProgress} />
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
{/* {this.textInputRender("Full Address")} */}
{this.textInputRender("Enter Password")}
{this.textInputRender("Enter Confirm Password")}
{/* {this.textInputRender("Enter Password")} */}
{this.buttonRenderView()}
{/* {this.GSignInButton()} */}
<Text style={{fontSize:12,fontWeight:'900',color:'#000',marginTop:20}}>
        If you have an account then <Text style={{color:themeColor,fontWeight:'800',fontSize:15,textDecorationLine:'underline'}} onPress={()=>{this.goToLoginPage()}}>login here {" "}</Text>
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
    isLoad:state.commonReducer.isLoad,
      
  }
  
  );
  
 
  const mapDispatchToProps = dispatch => ({
      //register:(obj)=>{dispatch(registerAction(obj))},
      commonActionPost:(data,url,constants,identifier,key)=>{dispatch(commonActionPost(data,url,constants,identifier,key))}
    
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Register)
  
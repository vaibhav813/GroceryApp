import React,{Component} from 'react';
import  {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
 import { WebView } from 'react-native-webview';
 import AnimatedHeader from 'react-native-animated-header';
 import AnimatedScreen from  'react-native-animated-screen';

export default class MyOrder extends Component{

componentDidMount(){
  SplashScreen.hide();
}



getListItems = count => {
  const items = [];
  let i = 0;
 
  while (i < count) {
    i++;
    items.push(
      <View key={i} style={{ backgroundColor: i % 2 === 0 ? '#eee5ff' : '#ceebfd', height: 64 }}>
        <Text style={{ color: '#999' }}>{`List Item ${i}`}</Text>
      </View>
    );
  }
 
  return items;
};

    render(){
      return(

<AnimatedScreen.Wrapper>
       <AnimatedScreen.Header>
         <View>
           <Text>Title</Text>
           <AnimatedScreen.CollapsibleElement>
             <Text>Subtitle</Text>
           </AnimatedScreen.CollapsibleElement>
         </View>
       </AnimatedScreen.Header>
       <AnimatedScreen.ScrollView>
         <View  style={{ height: '300%' }}>
           <View>
             <Text>Body</Text>
             <Text>Body</Text>
           
           </View>
         </View>
       </AnimatedScreen.ScrollView>
     </AnimatedScreen.Wrapper>
      )
{/* <AnimatedHeader 
        style={{flex: 1 }}
        backText='Back'
        title='Happy coding'
      //  renderLeft={() => (<Icon name='arrow-back' style={{ marginLeft: 20 }} />)}
       // renderRight={() => (<Icon name='add' style={{ marginRight: 20 }} />)}
        backStyle={{ marginLeft: 10 }}
        backTextStyle={{fontSize: 14, color: '#000'}}
        titleStyle={{ fontSize: 22, left: 20, bottom: 20, color: '#000' }}
        headerMaxHeight={200}
       // imageSource={Bg}
        toolbarColor='#FFF'
        disabled={false}
      >
        <ScrollView>
          {this.getListItems(20)}
        </ScrollView>
      </AnimatedHeader> */}

  // <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  // {/* <WebView style={{height:100,width:400}} source= {require( 'file:///Users/vaibhavgupta/Downloads/grofar/home.html' )} /> */}
  // <WebView
  //         style={{flex: 1,height:100,width:400}}
  //         originWhitelist={['*']}
  //          source={{uri:'file:///Users/vaibhavgupta/Downloads/grofar/home.html'}}
  //       //  source={{uri:'https://groceryapis.thezetacode.com/api/sliderlist'}}
  //         javaScriptEnabled={true}
  //         domStorageEnabled={true}
  //       />
  // </View>
  
      
    }
  }
// import React, { Component } from 'react';  
// import { SectionList, StyleSheet, Text, View,TouchableOpacity,Image,Modal,TouchableWithoutFeedback,FlatList,ScrollView } from 'react-native';  
// import AnimatedHeader from 'react-native-animated-header';
// import _get from 'lodash/get';
// import {imageBaseUrl} from '../../Component/config';




//   //{title:'Sodani Sweets',"address":'',"type":'shop',"distance":8.2,"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
// const data = [  {title:'Sodani Sweets',"type":'shop',data:[{"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150}]},
                
//                 {title: 'Recommended',"type":"food" ,data: [{"type":"food","type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}
//             ]},  
                
//                 {title: 'Main Cource',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},  
                
//                 {title: 'Thali',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},  
               
//                 {title: 'Special 26',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}
//             ]},
//                 {title: 'Paneer Special',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]}, 

//                 {title: 'Sweets',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
//                 {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},

//             ];

//             const header = ['Recommended','Main Cource','Thali','Recommended','Thali','Recommended']
// export default class Category extends Component {  
// constructor(props){
// super(props)
// this.state={
//     sections:[],
//     isModalVisible:false,
//     onScreenHeader:"Recommended",
// }
// }
    
// componentDidMount(){
//     let arr=[]
//     data.map(item=>{
//       //  this.state.sections.push(item.title)
//         if(item.type!="shop"){
//    this.state.sections.push(item.title)
//         }
//     })
// }

// headerView=(section)=>{
//     console.log('HeaderView Index Section ',section)
//     return(
// section.type=="shop"?
// <View style={styles.shopInfoSection}>
// <Text style={{fontSize:20,fontStyle:'italic',color:'#00A300',fontWeight:'700'}}>{section.title}</Text>
// </View>
// :
// <View>
// <Text style={styles.sectionHeader}>{section.title}</Text>
// </View>


//     )
// }

// itemViews=(item)=>{
//     console.log('Item ',item)
//     return(
//         item.type=="shop"?
//         <View style={{hwidth:'100%',backgroundColor:'#fff',padding:20}}>
//            {/* <Text>Shop Information Here</Text> */}
//            <Text>North Indian Thalis</Text>
//            <View style={{height:5}}/>
//            <Text>{item.city} | {item.distance} Kms </Text>
//            <View style={{height:5}}/>
//            <Text>🟠 Based on distance, an additional delivery will be apply</Text>
//            <View style={{height:5}}/>
//            <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
//            <View style={{height:5}}/>
//            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
//            <Text>★{item.rating} 〉</Text> 
//            <Text>🕘{item.delivery_time} </Text> 
//            <Text>💰{item.min_price} </Text> 
//            </View>
//            <View style={{height:5}}/>
//            <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
//            <View style={{height:5}}/>
//            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
//                <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:'#ccc',borderRadius:8}} activeOpacity={0.8}>
//                 <Text style={{fontWeight:'600'}}>15% OFF UPTO ₹100</Text>
//                 <View style={{height:5}}/>
//                 <Text style={{fontSize:10,color:'#808080'}}>USE 100SBI | ABOVE ₹400</Text>
//                </TouchableOpacity>
//                <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:'#ccc',borderRadius:8}} activeOpacity={0.8}>
//                 <Text style={{fontWeight:'600'}}>15% OFF UPTO ₹100</Text>
//                 <View style={{height:5}}/>
//                 <Text style={{fontSize:10,color:'#808080'}}>USE 100SBI | ABOVE ₹400</Text>
//                </TouchableOpacity>
//            </View>

          
//         </View>
//         :
       
// <View style={styles.listItem}>
// <View style={{width:'75%',justifyContent:'center'}}>
// <Text style={{fontWeight:'500',fontSize:18}}>{item.name}</Text>
// <Text style={{color:'#808080',marginTop:5}}>₹{item.price}</Text>
// </View>
// <TouchableOpacity style={{height:'100%',width:'25%',justifyContent:'center',alignItems:'center'}}>
//     {/* <Image source={{uri:imageBaseUrl+item.image}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/> */}
//     <Image source={{uri:item.img}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/>
//     <TouchableOpacity style={{height:25,width:'80%',borderRadius:5,borderWidth:1,justifyContent:'center',alignItems:'center',top:'-13%',backgroundColor:'#fff'}}>
//         <Text style={{fontWeight:'400'}}>Add +</Text>
//     </TouchableOpacity>
// </TouchableOpacity>

// </View>
//     )
// }




// moveToSection(index) {
//     this.setState({isModalVisible:false})
//     this.sectionList.scrollToLocation({
//         animated: true,
//         itemIndex: 0,
//         sectionIndex: index,
//         viewOffset: 0,
//     });
// }

// sectionList=()=>{
    
//     return(
//         <SectionList  
//         style={{height:'100%',width:'100%'}}
//         sections={data}  
//         renderItem={({item}) => this.itemViews(item)}  
//         renderSectionHeader={({section}) => this.headerView(section)}  
//         keyExtractor={(item, index) => index}  
//         stickySectionHeadersEnabled={true}
//         stickyHeaderIndices={ this.state.sections}
//         ref={s => (this.sectionList = s)}
       
//        onViewableItemsChanged={this.onCheckViewableItems}
//        viewabilityConfig={{
//          itemVisiblePercentThreshold: 100 //means if 50% of the item is visible
//        }}
//     />  
    

//     )
   
   

// }




//         onCheckViewableItems = ({ viewableItems, changed }) => {
//             console.log("Visible items :", viewableItems,' Changed ',changed)
//             if(viewableItems.length>0){
//                 this.setState({onScreenHeader:viewableItems[0].item.title})
//             }
         
//           }


// buttonView=()=>{
// this.checkHeaderFromList(this.state.onScreenHeader)

//     return(
        
//         <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isModalVisible:true})}}>
//             <Text style={{color:'#fff'}}>Category</Text>
//         </TouchableOpacity>
//     )
// }

// checkHeaderFromList=(headerName)=>{

   
//     let check=false;
//     if(headerName==this.state.onScreenHeader){
//      check=true;
//     }
//     else{
//         check=false;
//     }
//     return check;
// }


// renderSectionInModal=(item)=>{
//    // console.log('renderSectionInModal##### ',item)
//     return(
//         <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:'#f5f5f5',padding:5,margin:5}} 
//         onPress={()=>{this.moveToSection(item.index)}}>
//         {

//         this.checkHeaderFromList(item.item)?
//         <View style={{height:10,width:10,backgroundColor:'#00A300',borderRadius:10}}/>
//         :
//         <View style={{height:10,width:10}}/>

//         }


//         <Text style={{marginLeft:10,fontWeight:'300'}}>{item.item}</Text>

//         </TouchableOpacity>
//     )
// }


// modalView=()=>{
//     return(
//        <View style={styles.centeredView}>
//        <Modal
//          animationType="slide"
//          transparent={true}
//          visible={this.state.isModalVisible}
//          onRequestClose={() => {
//            this.setState({isModalVisible:!this.state.isModalVisible});
//          }}
//        >
//          <TouchableWithoutFeedback onPress={()=>{this.setState({isModalVisible:false})}}>
//              <View  style={styles.centeredView}>
//            <View style={styles.modalView}>
//                <FlatList 
//                data={_get(this.state,'sections',[])}
//                renderItem={item=>this.renderSectionInModal(item)}
//                keyExtractor={(item, index) => index}  
//                />
            
//            </View>
//            </View>
//          </TouchableWithoutFeedback>
//        </Modal>
      
//      </View>
//     )
// }
//     render() {  
        
//         return (  
            


//                   <View style={styles.container}>
//         <SectionList  
//         style={{height:'100%',width:'100%'}}
//         sections={data}  
//         renderItem={({item}) => this.itemViews(item)}  
//         renderSectionHeader={({section}) => this.headerView(section)}  
//         keyExtractor={(item, index) => index}  
//         stickySectionHeadersEnabled={true}
//         stickyHeaderIndices={ this.state.sections}
//         ref={s => (this.sectionList = s)}
//         onViewableItemsChanged={this.onCheckViewableItems}
//         viewabilityConfig={{
//          itemVisiblePercentThreshold: 50 //means if 50% of the item is visible
//        }}
//     >  
//                {this.buttonView()}
        
//                {
//                this.state.isModalVisible?
//                 this.modalView()
//                 : null
//                }
//         </SectionList>
      
//              </View>
           
//         );  
//     }  
// }  
  
// const styles = StyleSheet.create({  
//     container: {  
//         flex: 1,  
//         backgroundColor: "#fff"  
//     },  
//     sectionHeader: {  
//         paddingTop: 2,  
//         paddingLeft: 10,  
//         paddingRight: 10,  
//         paddingBottom: 2,  
//         fontSize: 20,  
//         fontWeight: 'bold',  
//         color: "#fff",  
//         backgroundColor: '#00A300', 
       
//     },  
//     shopInfoSection:
//             {borderColor:'#00A300',
//             borderWidth:1,alignItems:'center',
//             justifyContent:'center',height:50,width:'100%',
//             alignSelf:'center',
//             backgroundColor:'#fff'
        
//         },

//    button: {
//         height:40,
//         width:150,
//         backgroundColor:'#00A300',
//         borderRadius:40,
//         top:-100,
//         alignSelf:'center',
//         alignItems:'center',
//         justifyContent:'center',
//         elevation:5
//     },
//     listItem:{height:120,padding:10,width:'100%',flexDirection:'row',borderColor:'#ccc',borderTopWidth:1,borderWidth:1},
   
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 22,
//        backgroundColor:'rgba(0,0,0,0.2)',
//       },
//       modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 10,
//         //height:'30%',
//         width:'80%',
//        // alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//       },
    
      
//       modalText: {
//         marginBottom: 15,
//        // textAlign: "center"
//       }
   
// })  





import React, { Component } from 'react';  
import { SectionList, StyleSheet, Text, View,TouchableOpacity,Image,Modal,TouchableWithoutFeedback,FlatList,ScrollView } from 'react-native';  
import AnimatedHeader from 'react-native-animated-header';
import AnimatedScreen from  'react-native-animated-screen';
import _get from 'lodash/get';
import {imageBaseUrl} from '../../Component/config';


// const shopInfo = {title:'Sodani Sweets',"type":'shop',data:[{"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150}]};
const shopInfo = [{"title":'Sodani Sweets',"type":'shop',"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
{"title":'Sodani Sweets',"type":'shop',"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
{"title":'Sodani Sweets',"type":'shop',"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
{"title":'Sodani Sweets',"type":'shop',"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150}
];
  //{title:'Sodani Sweets',"address":'',"type":'shop',"distance":8.2,"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
const data = [  
    
               {title:'Sodani Sweets',"type":'shop',data:[{"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150}]},
                
                {title: 'Recommended',"type":"food" ,data: [{"type":"food","type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}
            ]},  
                
                {title: 'Main Cource',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},  
                
                {title: 'Thali',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},  
               
                {title: 'Special 26',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}
            ]},
                {title: 'Paneer Special',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]}, 

                {title: 'Sweets',"type":"food", data: [{"type":"food","name":"Stuff Naan","price":90,"status":'open',"star":'Must try','image':'637585338965218959.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Aaloo paratha","price":60,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'},
                {"type":"food","name":"Kadai paneer","price":150,"status":'open',"star":'','image':'637586133234327706.jpg',"img":'https://i.ibb.co/LQmZb1D/muton.jpg'}]},

            ];

            const header = ['Recommended','Main Cource','Thali','Recommended','Thali','Recommended']
export default class Category extends Component {  
constructor(props){
super(props)
this.state={
    sections:[],
    isModalVisible:false,
    onScreenHeader:"Recommended",
}
}
    
componentDidMount(){
    let arr=[]
    data.map(item=>{
      //  this.state.sections.push(item.title)
        if(item.type!="shop"){
   this.state.sections.push(item.title)
        }
    })
}

headerView=(section)=>{
    console.log('HeaderView Index Section ',section)
    return(
section.type=="shop"?

           <View style={styles.shopInfoSection}>
           <Text style={{fontSize:20,fontStyle:'italic',color:'#00A300',fontWeight:'700'}}>{section.title}</Text>
             </View>
           
:

            <View>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            </View>
          


    )
}

infoShopDetails=(shopInfo)=>{
    console.log("shopInfo-----",shopInfo)
    return(

      
           
     
        
     
      
        <View style={{backgroundColor:'#fff',padding:20}}>
        {/* <Text>Shop Information Here</Text> */}
        <Text>North Indian Thalis</Text>
        <View style={{height:5}}/>
        <Text>{shopInfo.city} | {shopInfo.distance} Kms </Text>
        <View style={{height:5}}/>
        <Text>🟠 Based on distance, an additional delivery will be apply</Text>
        <View style={{height:5}}/>
        <Text style={{color:'#ccc'}}>------------------------------------------------------</Text>
        <View style={{height:5}}/>
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around',alignItems:'center'}}>
        <Text>★{shopInfo.rating} 〉</Text> 
        <Text>🕘{shopInfo.delivery_time} </Text> 
        <Text>💰{shopInfo.min_price} </Text> 
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

itemViews=(item)=>{
    console.log('Item ',item)
    return(
         item.type=="shop"?
       this.infoShopDetails(item)
       :            
<View style={styles.listItem}>
<View style={{width:'75%',justifyContent:'center'}}>
<Text style={{fontWeight:'500',fontSize:18}}>{item.name}</Text>
<Text style={{color:'#808080',marginTop:5}}>₹{item.price}</Text>
</View>
<TouchableOpacity style={{height:'100%',width:'25%',justifyContent:'center',alignItems:'center'}}>
    {/* <Image source={{uri:imageBaseUrl+item.image}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/> */}
    <Image source={{uri:item.img}} style={{height:'80%',width:'100%',borderWidth:1,borderRadius:10}}/>
    <TouchableOpacity style={{height:25,width:'80%',borderRadius:5,borderWidth:1,justifyContent:'center',alignItems:'center',top:'-13%',backgroundColor:'#fff'}}>
        <Text style={{fontWeight:'400'}}>Add +</Text>
    </TouchableOpacity>
</TouchableOpacity>

</View>
    )
}




moveToSection(index) {
    this.setState({isModalVisible:false})
    this.sectionList.scrollToLocation({
        animated: true,
        itemIndex: 0,
        sectionIndex: index,
        viewOffset: 0,
    });
}

sectionList=()=>{
    
    return(
        <SectionList  
        style={{height:'100%',width:'100%'}}
        sections={data}  
        renderItem={({item}) => this.itemViews(item)}  
        renderSectionHeader={({section}) => this.headerView(section)}  
        keyExtractor={(item, index) => index}  
        stickySectionHeadersEnabled={true}
        stickyHeaderIndices={ this.state.sections}
        ref={s => (this.sectionList = s)}
       
       onViewableItemsChanged={this.onCheckViewableItems}
       viewabilityConfig={{
         itemVisiblePercentThreshold: 100 //means if 50% of the item is visible
       }}
    />  
    

    )
   
   

}




        onCheckViewableItems = ({ viewableItems, changed }) => {
            console.log("Visible items :", viewableItems,' Changed ',changed)
            if(viewableItems.length>0){
                this.setState({onScreenHeader:viewableItems[0].item.title})
            }
         
          }


buttonView=()=>{
this.checkHeaderFromList(this.state.onScreenHeader)

    return(
        
        <TouchableOpacity style={styles.button} onPress={()=>{this.setState({isModalVisible:true})}}>
            <Text style={{color:'#fff'}}>Category</Text>
        </TouchableOpacity>
    )
}

checkHeaderFromList=(headerName)=>{

   
    let check=false;
    if(headerName==this.state.onScreenHeader){
     check=true;
    }
    else{
        check=false;
    }
    return check;
}


renderSectionInModal=(item)=>{
   // console.log('renderSectionInModal##### ',item)
    return(
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',backgroundColor:'#f5f5f5',padding:5,margin:5}} 
        onPress={()=>{this.moveToSection(item.index)}}>
        {

        this.checkHeaderFromList(item.item)?
        <View style={{height:10,width:10,backgroundColor:'#00A300',borderRadius:10}}/>
        :
        <View style={{height:10,width:10}}/>

        }


        <Text style={{marginLeft:10,fontWeight:'300'}}>{item.item}</Text>

        </TouchableOpacity>
    )
}


modalView=()=>{
    return(
       <View style={styles.centeredView}>
       <Modal
         animationType="slide"
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
               data={_get(this.state,'sections',[])}
               renderItem={item=>this.renderSectionInModal(item)}
               keyExtractor={(item, index) => index}  
               />
           </View>
           </View>
         </TouchableWithoutFeedback>
       </Modal>
      
     </View>
    )
}

renderViewHeader=(item)=>{
    console.log('Shop Info---- ',item)
    //{"title":'Sodani Sweets',"type":'shop',"address":'21,ridhi-sidhi',"distance":8.2,"type":'shop',
    //"city":"Pink City","rating":4.3,"delivery_time":"54 min",'min_price':150},
    return(
        <View style={{borderWidth:1}}>
             <Text>{item.address}</Text>
             <Text>{item.min_price}</Text>
             <Text>{item.distance}</Text>
             <Text>{item.city}</Text>
        {/* <AnimatedScreen.Wrapper>
       <AnimatedScreen.Header>
       <View  style={{ height:100,padding:20,width:'100%',backgroundColor:'#fff',borderWidth:1,borderColor:'#00A300',borderWidth:1 }}>
           <Text>{item.title}</Text>
           <AnimatedScreen.CollapsibleElement>
             <Text>Subtitle</Text>
           </AnimatedScreen.CollapsibleElement>
         </View>
       </AnimatedScreen.Header>
       <AnimatedScreen.ScrollView>
         <View  style={{ padding:20,width:'100%' }}>
           <View>
           <Text>{item.address}</Text>
             <Text>{item.min_price}</Text>
             <Text>{item.distance}</Text>
             <Text>{item.city}</Text>
           </View>
         </View>
       </AnimatedScreen.ScrollView>
     </AnimatedScreen.Wrapper> */}
     </View>
    )
}


    render() {  
        
        return (  
            
       
 <View style={styles.container}> 

<AnimatedScreen.SectionList
  // Expects a callback returning a style object that can interpolate the Animated.Value
  // animatedStyle?: (scrollY: Animated.Value) =>  ViewStyle;
  animatedStyle={ scrollY => ({
   opacity: scrollY.interpolate({
     inputRange: [0, 200], // from 0 scrolled to headerMaxHeight scrolled
     outputRange: [1, 0]
    })
   })
  }

  // Expect a style object that can extend the header style
  // (preferred to animatedStyle if static)
  // style?: ViewStyle; (default: undefined)
  style={{ paddingBottom: 10,borderWidth:1 }}

  // Expect a React.RefObject to be attached to the ScrollView
  // sectionlistRef?: React.RefObject<SectionList<T>>;
  sectionlistRef={ data }

//   { ...data }
/>




{/* {
    shopInfo.map(item=>{

        this.renderViewHeader(item)

    })

} */}
         
                   {/* {this.infoShopDetails()} */}
        {/* <SectionList  
        style={{height:'100%',width:'100%'}}
        sections={data}  
        renderItem={({item}) => this.itemViews(item)}  
        renderSectionHeader={({section}) => this.headerView(section)}  
        keyExtractor={(item, index) => index}  
        stickySectionHeadersEnabled={true}
        stickyHeaderIndices={ this.state.sections}
        ref={s => (this.sectionList = s)}
        onViewableItemsChanged={this.onCheckViewableItems}
        viewabilityConfig={{
         itemVisiblePercentThreshold: 50 //means if 50% of the item is visible
       }}
    />  
    
               {this.buttonView()}
        
               {
               this.state.isModalVisible?
                this.modalView()
                : null
               } */}
               

        </View>
        
            
           
        );  
    }  
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: "#fff"  
    },  
    sectionHeader: {  
        paddingTop: 2,  
        paddingLeft: 10,  
        paddingRight: 10,  
        paddingBottom: 2,  
        fontSize: 20,  
        fontWeight: 'bold',  
        color: "#fff",  
        backgroundColor: '#00A300', 
       
    },  
    shopInfoSection:
            {borderColor:'#00A300',
            borderWidth:1,alignItems:'center',
            justifyContent:'center',height:50,width:'100%',
            alignSelf:'center',
            backgroundColor:'#fff'
        
        },

   button: {
        height:40,
        width:150,
        backgroundColor:'#00A300',
        borderRadius:40,
        top:-100,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        elevation:5
    },
    listItem:{height:120,padding:10,width:'100%',flexDirection:'row',borderColor:'#ccc',borderTopWidth:1,borderWidth:1},
   
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
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
        elevation: 5
      },
    
      
      modalText: {
        marginBottom: 15,
       // textAlign: "center"
      }
   
})  
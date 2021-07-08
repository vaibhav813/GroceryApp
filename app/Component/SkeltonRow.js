import React from "react";
import { View,StyleSheet,Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const ImageInfo = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item  flexDirection="row" alignItems="center" justifyContent='flex-start' >
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={250} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};



export const VenderImageInfo = () => {
  return (
    <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='center' >
      <SkeletonPlaceholder.Item width={100} height={70} borderRadius={10} />
      <SkeletonPlaceholder.Item marginLeft={10}>
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4}  marginTop={6}/>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='center'   marginTop={6}>

        <SkeletonPlaceholder.Item  width={50}  height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item  width={35} />
        <SkeletonPlaceholder.Item  width={50}  height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item  width={35} />
        <SkeletonPlaceholder.Item  width={50}  height={20} borderRadius={4} />

        </SkeletonPlaceholder.Item>
       
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
  );
};


export const ImageWithText=(props)=>{
  // console.log('Skelton props ',props)
  return(
    
  props.length.map(item=>{
    console.log('Skelton props ',item)
    return(
      <View style={[props.style,{width:'95%'}]}>
      <ImageInfo/>
      </View>
    )
  })
  )
  

}


export const PromoList = () => {
    return (
      <SkeletonPlaceholder>
        <View style={styles.promoListView}>
        <View style={styles.promoListChild} />
          <View style={styles.promoListChild} />
        </View>
      </SkeletonPlaceholder>
    );
  };

export const ListItems = (props) => {
  
    return (
      <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='space-between' padding={5} flexWrap='wrap'>
        {props.length.map(item=>{
          return(
            <View style={props.style} />
          )
          
        })}

       
        </SkeletonPlaceholder.Item>
        
      </SkeletonPlaceholder>
    );
  };


const styles = StyleSheet.create({
    listRow:{
        height:80,
        width:80,
    marginLeft:5,
        borderRadius:10,
    },
    promoListView:{ 
    
     height: "85%", width: 300, margin: 10,flexDirection:'row' 
    },
    promoListChild:
    {height:"100%",width:300,borderRadius:10,margin:10}
})
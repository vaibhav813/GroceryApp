import React from "react";
import { View,StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export const ImageInfo = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='center'>
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} />
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


export const ImageWithText=()=>{
  return(
    <View style={{width:'100%'}}>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    <View style={{height:10}}/>
    <ImageInfo/>
    </View>
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

export const ListItems = () => {
    return (
      <SkeletonPlaceholder>
 <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='space-between' top='0%'>
        <View style={styles.listRow} />
        <View style={styles.listRow} />
        <View style={styles.listRow} />
        <View style={styles.listRow} />
       
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
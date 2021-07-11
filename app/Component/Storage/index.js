import {Platform} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export const saveData = async (key,value) => {
    console.log('Key ',key,' Value- ',value)
    try {
      await AsyncStorage.setItem(key, value)
      //console.log('Set value Successfull---- ')
    //  alert('Data successfully saved')
    } catch (e) {
      //alert('Failed to save the data to the storage')
    }
  }

  export const getData = async (key) => {
    try {
     const value = await AsyncStorage.getItem(key)
     console.log('Get value---- ',value)
     return value;
      //alert('Data successfully saved')
    } catch (e) {
      //alert('Failed to save the data to the storage')
    }
  }

  export const clearStorage=async()=>{
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        if (Platform.OS === 'android') {
          await AsyncStorage.clear();
        }
        if (Platform.OS === 'ios') {
          await AsyncStorage.multiRemove(asyncStorageKeys);
        }
      }
    }
    catch(e){
      console.log("Error while clear ",e)
    }
  }

//   clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// }
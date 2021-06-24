
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
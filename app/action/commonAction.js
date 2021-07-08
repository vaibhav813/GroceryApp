
import axios from 'axios';
import * as RootNavigation from '../Component/RootNavigation'
import store from '../store/index';
import {getData,saveData} from '../Component/Storage/index';
import jwt_decode from "jwt-decode";
import SnackBar from 'react-native-snackbar';
import {themeColor,dangerRed} from '../Component/config'


//import AsyncStorage from "@react-native-community/async-storage"



const Token = async () => {
    try {
      await AsyncStorage.getItem("token").then(
        token => token
      );
    } catch (error) {
      return null;
    }
  }



const instance = axios.create ({
    // baseURL: 'http://192.168.1.100:4000',
    //baseURL: 'http://localhost:4000',
    baseURL:"https://groceryapis.thezetacode.com/api",
    timeout:20000,
    headers:{
     // 'Content-Type': 'application/json, text/plain, */*',
    // 'Content-Type': 'application/json',
     'Content-Type': 'application/json'
      
    }
});

// instance.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = "Bearer "+token
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// );


const API_URL = "http://192.168.1.100:4000";
const END_POINT='http://localhost:4000';

export const request = (constants, identifier,key) => {
    return ({
      type: constants.init,
      identifier: identifier,
      key:key,
      isLoad:true
    });
  };

    export const receive = (json, status, resolve, constants,identifier,key) => {
        resolve(json);
        return {
          type: constants.success,
          data: json,
          identifier:identifier,
          key:key,
          status: status,
          isLoad:false
        };
      };


      export const receiveError = (err, errCode, reject, constants, identifier,key) => {
        reject(err);
        return ({
          type: constants.error,
          error: err,
          errorCode: errCode,
          identifier: identifier,
         key:key,
         isLoad:false
        });
      };


export const setLoader=(isLoad)=>{
    return(
        {
            type: "IS_LOADING",
            data: isLoad,
           
        }
    )
}


export const saveDataLocally=(data,identifier,key)=>{
  return(
    {
      type:identifier,
      data:data,
      key:key
    }
  )
}

const showSnackBar=(text,color)=>{
  

   SnackBar.show({
    text: text,

    // backgroundColor:'#00A300',
    backgroundColor:color,
    duration: SnackBar.LENGTH_SHORT,
  });

}

    
      export const commonActionPostLogin =  (data,url,constants,identifier,key) => (dispatch) =>{
        console.log('Post Data -- ',data)
          return new Promise((resolve,reject)=>{
            
           
                 dispatch(setLoader(true))
                dispatch(request(constants,identifier,key)) 
                
                
               instance.post(`${url}`,data).then(res=>{
                console.log('Response ',res)
                if(res.status==200){
              
                    dispatch(setLoader(false))
                    dispatch(receive(res.data.data,res.status,resolve,constants,identifier,key)) 
                    saveData('token',res.data)
                    var decoded = jwt_decode(res.data);
                    console.log('Login Data ',decoded)
                    RootNavigation.navigate("tabHome",{})
                    showSnackBar("Logged In Successfully!",themeColor)
                   
                  
                }
                else{
                  
                    dispatch(setLoader(false))
                    dispatch(receiveError(res.data.data,res.status,reject,constants,identifier,key))
                    showSnackBar("Something wrong!",dangerRed)        
                 
                }   
                                         
            }).catch(err=>{
              console.log('Login Error--- ',err.response)
              showSnackBar("UserId or password invalid!",dangerRed)  
                dispatch(setLoader(false))
                dispatch(receiveError(err.message,"404",reject,constants,identifier,key))
              
                
            })
          })
      };



      export const commonActionPost =  (data,url,constants,identifier,key) => (dispatch) =>{
        console.log('Post Data -- ',data)
          return new Promise((resolve,reject)=>{
            
           
                 dispatch(setLoader(true))
                dispatch(request(constants,identifier,key)) 
                
                
               instance.post(`${url}`,data).then(res=>{
                console.log('Response ',res)
                if(res.status==200){
              
                    dispatch(setLoader(false))
                    dispatch(receive(res.data.data,res.status,resolve,constants,identifier,key)) 
                   // alert("Registered Successfully!")
                  
                }
                else{
                  
                    dispatch(setLoader(false))
                    dispatch(receiveError(res.data.data,res.status,reject,constants,identifier,key))
                    //alert("Something Wrong.Please Try Again!")
                 
                }
              
              
                
            
        
            }).catch(err=>{
              console.log('Error--- ',err.response)
                dispatch(setLoader(false))
                dispatch(receiveError(err.message,"404",reject,constants,identifier,key))
              
                console.log('Error--- ',err.response)
              
            })



            

          })
        
      };


      export const commonActionGet = (data,url,constants,identifier,key) => (dispatch) =>{
         // console.log('Get Data -- ',data)

        return new Promise((resolve,reject)=>{
          console.log('Get Data 2  -- ',data)
         
            dispatch(setLoader(true))
              dispatch(request(constants,identifier,key))  
              
              
             instance.get(url,data).then(res=>{
              console.log('Response ',res)
              if(res.status==200){
                  dispatch(setLoader(false))
                  dispatch(receive(res.data.data,res.status,resolve,constants,identifier,key)) 
                  
              }
              else{
                
                  dispatch(setLoader(false))
                  dispatch(receiveError(res.data.data,res.status,reject,constants,identifier,key))
              }
            
          }).catch(err=>{
              dispatch(setLoader(false))
              dispatch(receiveError(err.message,"404",reject,constants,identifier,key))
              console.log('Error--- ',err)
              console.log('Error--- ',err.response)
            
          })



          

        })
      
    };

    export const getTypeListAction = (data,url,constants,identifier,key,type) => (dispatch) =>{
      return new Promise((resolve,reject)=>{
          
          dispatch(setLoader(true))
            dispatch(request(constants,identifier,key)) 
            console.log('Url data--- ',url+type+data.uriData)
          
           instance.get(url+type+data.uriData).then(res=>{
            console.log('Response ',res)
            if(res.status==200){
              dispatch(setLoader(false))
                dispatch(receive(res.data.data,res.status,resolve,constants,identifier,key)) 
            }
            else{
              
              dispatch(setLoader(false))
                dispatch(receiveError(res.data.data,res.status,reject,constants,identifier,key))
            }    
        }).catch(err=>{
          console.log('Error--- ',err.response)   
          dispatch(setLoader(false))
            dispatch(receiveError(err.message,err.status,reject,constants,identifier,key))
            console.log('Error--- ',err)          
        })
     })
    
  };



  export const getCommonDataAction = (url,constants,identifier,key,type) => (dispatch) =>{
    return new Promise((resolve,reject)=>{
        
        dispatch(setLoader(true))
          dispatch(request(constants,identifier,key)) 
       //   console.log('getCategoryListAction data--- ',url+type+data.type)
        
         instance.get(url+type).then(res=>{
          console.log('Response ',res)
          if(res.status==200){
            dispatch(setLoader(false))
              dispatch(receive(res.data.data,res.status,resolve,constants,identifier,key)) 
          }
          else{
            
            dispatch(setLoader(false))
              dispatch(receiveError(res.data.data,res.status,reject,constants,identifier,key))
          }    
      }).catch(err=>{
        console.log('Error--- ',err.response)   
        dispatch(setLoader(false))
          dispatch(receiveError(err.message,err.status,reject,constants,identifier,key))
          console.log('Error--- ',err)          
      })
   })
  
};


export const getDataSaveList=(data,identifier,key) => (dispatch) =>{
  return new Promise((resolve,reject)=>{
      
   //   dispatch(setLoader(true))
        dispatch(saveDataLocally(data,identifier,key)) 
     //   console.log('getCategoryListAction data--- ',url+type+data.type)
      
    
    }).catch(err=>{
      console.log('Error--- ',err)   
              
    })


};





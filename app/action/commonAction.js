
import axios from 'axios';
import * as RootNavigation from '../Component/RootNavigation'
import store from '../store/index';
import {getData} from '../Component/Storage/index';
import { imageBaseUrl } from '../Component/config';

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

    
      export const commonActionPost =  (data,url,constants,identifier,key) => (dispatch) =>{
        console.log('Post Data -- ',data)
          return new Promise((resolve,reject)=>{
            console.log('Post Data -- 2')
           
                 dispatch(setLoader(true))
                dispatch(request(constants,identifier,key)) 
                console.log('Post Data -- 3')
                
               instance.post(`${url}`,data).then(res=>{
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
            console.log('getCategoryListAction data--- ',url+type+data.uriData)
          
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



  export const getVenderListHomeAction = (data,url,constants,identifier,key,type) => (dispatch) =>{
    return new Promise((resolve,reject)=>{
        
        dispatch(setLoader(true))
          dispatch(request(constants,identifier,key)) 
       //   console.log('getCategoryListAction data--- ',url+type+data.type)
        
         instance.get(url+type+data.catId).then(res=>{
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

//   export const getVenderListAction = (data,url,constants,identifier,key) => (dispatch) =>{
//     return new Promise((resolve,reject)=>{
        
//         dispatch(setLoader(true))
//           dispatch(request(constants,identifier,key)) 
//           console.log('getCategoryListAction data--- ',data)
        
//          instance.get(url+'?type='+data.type).then(res=>{
//           console.log('Response ',res)
//           if(res.status==200){
//             dispatch(setLoader(false))
//               dispatch(receive(res.data.data,res.status,resolve,constants,identifier,key)) 
//           }
//           else{
            
//             dispatch(setLoader(false))
//               dispatch(receiveError(res.data.data,res.status,reject,constants,identifier,key))
//           }    
//       }).catch(err=>{
//         console.log('Error--- ',err.response)   
//         dispatch(setLoader(false))
//           dispatch(receiveError(err.message,err.status,reject,constants,identifier,key))
//           console.log('Error--- ',err)          
//       })
//    })
  
// };





//     Slider API
// https://groceryapis.thezetacode.com/api/sliderlist

// Category List
// https://groceryapis.thezetacode.com/api/categorylist?type=1 (Front Page)
// https://groceryapis.thezetacode.com/api/categorylist?type=2 (All List)

// Vendor List
// https://groceryapis.thezetacode.com/api/vendorlist?CatId=0 (Front Page)
// https://groceryapis.thezetacode.com/api/vendorlist?CatId=1 (Vendore List Category wise)



{/* <key>NSExceptionDomains</key>
<dict>
    <key>localhost</key>
    <dict>
        <key>NSExceptionAllowsInsecureHTTPLoads</key>
        <true/>
    </dict>
    <key>subdomain.example.com</key>
    <dict>
        <key>NSIncludesSubdomains</key>
        <true/>
        <key>NSExceptionAllowsInsecureHTTPLoads</key>
        <true/>
    </dict>
</dict> */}


import axios from 'axios';
import config from 'react-native-config';
import * as RootNavigation from '../Component/RootNavigation';
import { CommonActions } from '@react-navigation/native';


export const register=(obj)=>{
console.log('In Api ',obj)
    axios.post('http://localhost:4000/register',obj).then(res=>{
        console.log('Register Response ',res)
        alert(res.data.data)
        return {
            type: 'USER_REGISTER',
            payload: res.data.data
            }

    }).catch(err=>{
        console.log('Error--- ',err)
    })

}

export const login=(obj)=> async (dispatch) =>{
    console.log('In Api ',obj)
        axios.post('http://localhost:4000/login',obj).then(res=>{
            console.log('Login Response ',res)
            if(res.status==200){
            console.log('Root Navigator ',RootNavigation)
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data.data
                }) 
                
           // RootNavigation.navigate("tabHome",{ userName: 'Lucy' });
            }
            else{
              
                alert(res.data.data)
            }
          
          

            return res;
    
        }).catch(err=>{
            console.log('Error--- ',err)
            return err;
        })
    
    }


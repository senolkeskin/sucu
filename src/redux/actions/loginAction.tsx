import { AsyncStorage } from "react-native";
import axios from 'axios'
import {WATER_USER_LOGIN} from './../constants'
import { Dispatch } from "react";
import {LOGIN_FAILED,LOGIN_STARTED,LOGIN_SUCCEED,RESET_PROPS} from './../types'
//import { navigate } from '../services/Navigator';
import {Action} from '../states'
import { ICustomerItem } from "../models/homeModel";


export function loginUserService(username:string, password:string) {

  return (dispatch : Dispatch<Action>) =>  {


    dispatch(loading(true));

    // dispatch({
    //   type:LOGIN_STARTED,
    // });   
    const token:string = "tokeeeeeeennnnnnnnnnnnnn";
    //response.data.result.token

  axios.post(WATER_USER_LOGIN,
    {
        username: username,
        password: password,
    })
  .then((response) =>{
  if(response.data.isSuccess){

    AsyncStorage.setItem("userToken", response.data.result.token)
    .then(() => {       
      // dispatch(loading(false)); 
      AsyncStorage.setItem("UserId", response.data.result.userId.toString()).then(()=>{
        dispatch(loginIsSucceed(true,"")); 
        console.log("succeed");
      })
    })
    .catch(error => { 
      
      console.log(error + 'error kaydetme asn storage')   
      // dispatch(loading(false));
      dispatch(loginIsSucceed(false,""));
      dispatch(reset());
    });
    }

   
  
  else {
    if(response.data.message == "User.Login.UserNotFound"){
      console.log("Error girid");
      dispatch(loginIsSucceed(false,"Böyle bir kullanıcı bulunamadı"));

  
    }


  }
  })
  .catch((err) => {
    console.log(err + "error axios") 
    // dispatch(loading(false));
    dispatch(loginIsSucceed(false, "Bir hata oluştu."));
    dispatch(reset());

  });


  }

}


export function logoutUserService() {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem("userToken")
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  
  export const loading = (loader : boolean) => ({
    type : LOGIN_STARTED,
    payload : loader
  })
  
  
  export const loginIsSucceed = (loginIsSucced : boolean, message:string) => ({
    type : loginIsSucced ? LOGIN_SUCCEED : LOGIN_FAILED,
    payload : message
  })
  

  
  
  export const reset = () => ({
    type : RESET_PROPS,
    payload:null
  })
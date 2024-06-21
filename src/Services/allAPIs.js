import { commonAPI } from "./commonAPI";
import { baseUrl } from "./baseUrl";


export const registerAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}



// 2 login api call
export const loginAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

export const addContactAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/contact/add`,reqBody,reqHeader)
}

//get All user contact to display in my projects component dashboard
export const getUserContactsAPI=async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/contact/all-user-contacts`,"",reqHeader)
    }

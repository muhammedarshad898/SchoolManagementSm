import { useAsyncValue } from "react-router-dom";
import base_url from "./base_url";
import commonApi from "./commonapi";
export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/reg`,"POST","",data)
}

export const loginApi=async(data)=>{
    return await commonApi(`${base_url}/log`,"POST","",data)
}
export const addstudent=async(data,header)=>{
    return await commonApi(`${base_url}/addstudent`,"POST",header,data)
}
export const getstudentapi=async(header)=>{
    return await commonApi(`${base_url}/students`,"GET",header,"")
}

export const deletestudentapi=async(id,header)=>{
    return await commonApi(`${base_url}/delstudent/${id}`,"DELETE",header,{})
}
export const updatestudentapi=async(id,header,data)=>{
    return await commonApi(`${base_url}/updatestudent/${id}`,"PUT",header,data)
}
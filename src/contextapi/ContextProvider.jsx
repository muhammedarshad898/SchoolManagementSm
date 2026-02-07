import React,{useState} from 'react'
import { createContext } from 'react'
export const responseContext=createContext()


function ContextProvider({children}) {
    const [response,setresponse]=useState("")

  return (
    <>
    <responseContext.Provider value={{response,setresponse}}>
        {children}
    </responseContext.Provider>
    </>
  )
}

export default ContextProvider
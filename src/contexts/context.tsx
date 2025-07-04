'use client'

import React, { createContext, ReactNode, useState } from 'react';




type Contexts = {
    name: string
    darkMode:boolean
    setDarkMode:(value:boolean)=> void;
}




export const contexts = createContext<Contexts>({
  name: '',
  darkMode: false,
  setDarkMode: () => {},
})
const ContextProvider = ({children}: {children: ReactNode }) => {
const [darkMode,setDarkMode] = useState( typeof window !== 'undefined' && localStorage.getItem('theme') ==='dark')

  return (
    <contexts.Provider value={{name:'Joanderson', darkMode,setDarkMode}}>
{children}
    </contexts.Provider>
  )
}

export default ContextProvider;
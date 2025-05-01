import React, { createContext, useEffect, useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    
    useEffect(()=>{
        const fetchUser=async()=>{
            const response= await fetch('api/auth/me');
            if(response.ok){
                const data=await response.json();
                setUser(data);
            }
        };
        fetchUser();
    },[]);
    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>useContext(AuthContext);
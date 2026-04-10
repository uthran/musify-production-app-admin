import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../Services/apiservice"
import { Road } from "lucide-react";

export const AuthContext=createContext();

export const useAuth=()=>{
   const context= useContext(AuthContext);
   if(!context){
    throw new Error("useAuth must be used within an authprovider");
   }
   return context;
}

export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [token,setToken]=useState(localStorage.getItem('adminToken'));
    const [loading,setLoading]=useState(true)

    const login=async(email,password)=>{
        try {
           const response=await axios.post(`${API_BASE_URL}/api/auth/login`,{email,password})
           if(response.status==200){
            setToken(response.data.token);
            setUser({email:response.data.email,role:response.data.role});
            localStorage.setItem('adminToken',response.data.token);
            localStorage.setItem('adminUser',JSON.stringify({email:response.data.email,role:response.data.role}));
           return {success:true};
        }
        else{
            return {success:false,message:response.data.message||"Login Failed"}
        }
        } catch (error) {
            return {success:false,message:error.response.data||"Login failed"}
        }
    }

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === "ADMIN";
    
    const logout=()=>{
        setToken(null);
        setUser(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    }

    useEffect(()=>{
        const storedToken=localStorage.getItem("adminToken");
        const storedUser=localStorage.getItem("adminUser");
        if(storedToken && storedUser){
               setToken(storedToken);
               setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    },[])

    const contextValue={
        user,
        token,
        loading,
        login,
        logout,
        isAdmin,
        isAuthenticated

    }

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
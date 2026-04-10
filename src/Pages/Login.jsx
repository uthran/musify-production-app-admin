import React, { useState } from 'react'
import {assets} from '../assets/assets.js'
import './login.css'
import { Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthContext.jsx'
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const {login}=useAuth();
    

    const handlesubmit=async()=>{
        if(!email || !password){
             toast.error("please all the fields")
             return
        }
        setLoading(true);
       try {
         const result=await login(email,password)
        if(result.success){
            toast.success("Admin Logged successfully");
            navigate('/add-song');
        }
        else{
            toast.error(result.message)
        }
        
       } catch (error) {
            toast.error(error.message)
       }
       finally{
        setLoading(false)
       }
    }
  return (
    <>
    <div className="login-page-div">
        <div className="login-image-div">
            <img src={assets.logo} alt="" />
            <h1>Musify</h1>
        </div>
        <div className="login-admin-text">
            <h1>Admin Panel</h1>
            <p>Sign in to manage your music library</p>
        </div>
        <div className="login-box-div">
            <div className="login-input">
                <label htmlFor="">Email address</label>
                <input type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
            </div>
            <div className="login-input">
                <label htmlFor="">Password</label>
                <input type="password"
                value={password}
                autoComplete='password'
                onChange={e=>setPassword(e.target.value)}
                />
            </div>
            <button 
            onClick={handlesubmit}>
             { loading ?(
                <div>
                    <div className='loader'></div>
                    <div>signing in...</div>
                </div>
            ):("Login")}
            </button>
        </div>
    </div>
    </>
  )
}

export default Login
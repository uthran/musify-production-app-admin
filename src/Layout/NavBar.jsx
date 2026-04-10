import React, { useState } from 'react'
import './navbar.css'
import { useAuth } from '../Context/AuthContext'
import { LogOut, Menu, User, X } from 'lucide-react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
const NavBar = ({activemenu}) => {
  const [opensidemenu,setOpensidemenu]=useState(false)
  const {user,logout}=useAuth();
  const navigate=useNavigate();
  const handlelogout=()=>{
    logout();
    toast.success("Logout successfull")
    navigate("/login")
  }
  return (
    <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        <button
         onClick={()=>setOpensidemenu(!opensidemenu)}
         className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
          {
            opensidemenu ?(
              <X className='text-2xl'/>
            ):(
              <Menu className='text-2xl' />
            )
          }
         </button>
         <div className="flex items-center gap-2">
          <img src={assets.logo} alt="" className='w-12 h-12' />
          <span className="text-2xl font-bold text-black truncate">Musify</span>
         </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <User className='w-4 h-4 text-gray-600'/>
          <span className="text-sm font-medium text-gray-700 truncate max-w-32">
            {user?.email}
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {user?.role}
          </span>
        </div>
        <button 
        title='Logout'
        onClick={handlelogout}
        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors duration-200">
         <LogOut className='w-4 h-4'/>
         <span className="hidden sm:inline text-sm font-medium">
          Logout
         </span>
        </button>
      </div>
      {
        opensidemenu &&(
          <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 lg-hidden z-20">
                <SideBar activemenu={activemenu}/>
          </div>
        )
      }
    </div>

  )
}

export default NavBar
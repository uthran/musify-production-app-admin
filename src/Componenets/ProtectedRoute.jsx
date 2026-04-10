import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children,requiredAdmin=false}) => {
    const {isAuthenticated,isAdmin,loading}=useAuth();
    
  if(loading){
     return(
        <div>
            <div className="loading-div">
                <div className="loader"></div>
                <div>Loading...</div>
            </div>
        </div>
     )
  }
  if(!isAuthenticated){
    return <Navigate to={`/login`} replace />
  }
  if(requiredAdmin && !isAdmin){
    return(
        <div>
            <div className="loading-div" style={{
              height:"100VH",
              width:"100%",
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"center",
              color:"white",
              background: "linear-gradient(135deg, #120321 0%, #3e106b 50%, #120321 100%)"
            }}>
                <div className="loader" style={{
                  height:"50px",
                  width:"50px",
                }}></div>
                <div>
                  <h1>Access Denied</h1>
                </div>
                <div style={{fontWeight:"bold"}}>You need to be admin to acccess this page..</div>
            </div>
        </div>
    )
  }
  else{
    return children;
  }
}

export default ProtectedRoute
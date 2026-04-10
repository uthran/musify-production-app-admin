import React from 'react'
import SideBar from '../Layout/SideBar'
import NavBar from './NavBar'

const DashBoardLayout = ({children,activemenu}) => {
  return (
    <div>
      <NavBar activemenu={activemenu}/>
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideBar activemenu={activemenu}/>
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  )
}

export default DashBoardLayout
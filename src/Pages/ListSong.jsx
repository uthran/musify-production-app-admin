import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../Layout/DashBoardLayout'
import { songAPI } from '../Services/apiservice'
import toast from 'react-hot-toast'
import { ActivitySquareIcon, AlbumIcon, Clock, Disc3, Image, LucideTrash2, Music } from 'lucide-react'

const ListSong = () => {
  const [data,setdata]=useState([])
  const [loading,setLoading]=useState(true)
  const fetchsongs=async()=>{
    setLoading(true)
    try {
      const response=await songAPI.lis();
      setdata(response.data.songs)
    } catch (error) {
      toast.error("Failed to  load songs")
    }
    finally{
      setLoading(false)
    }
  }

  const removeSong=async(id)=>{
  try {
      songAPI.remove(id);
      toast.success("Song deleted")
      window.location.reload();
    
  } catch (error) {
    toast.error("failed to delete the album")
    
  }

}

  useEffect(()=>{
    fetchsongs();
  },[])
  return (
    <DashBoardLayout activemenu="List Songs">
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Songs Library</h1>
        <p className="text-gray-600">Manage Your Song collection</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* table header*/}
        <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">
              <div className="col-span-2 flex items-center gap-2">
                 <Image className='w-6 h-6'/>
                <span className="">Cover</span>
              </div>
              <div className="col-span-3 flex gap-2"><AlbumIcon/> Song Title</div>
              <div className="col-span-3 flex items-center gap-2">
                <Disc3 className='w-4.h-4' />
                <span>Album</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Clock className='w-6 h-6'/>
                <span>Duration</span>
              </div>
              <div className="col-span-2 gap-2 flex text-center"><ActivitySquareIcon w-6 h-6/> Actions</div>
            </div>
        </div>
         {/* table body */}
         <div className="divide-y divide-gray-100">
          {
            data.length===0 ?(
              <div className="px-6 py-16 text-center">
                <Image className='w-12 h-12 text-gray-400 mx-auto mb-4'/>
                <p className="text-gray-500 text-lg">No Album found</p>
                <p className="text-gray-400 text-lg">Add some albums to get started</p>
              </div>
            ):(
              data.map((album,index)=>{
                return(
                  <div key={index} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="col-span-2">
                        <div className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                        <img src={album.image} alt={album.name} className="w-fill h-full object-cover" />
                      </div>
                      </div>
                      <div className="col-span-3">
                        <p className="font-medium text-gray-900 truncate">
                          {album.name}
                        </p>
                      </div>
                      <div className="col-span-3">
                        <p className="text-gray-600 truncate">
                          {album.album||"No Album"}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span>{album.duration}</span>
                        </div>

                        <div className="col-span-2 flex align-center justify-center">
                          <button
                          onClick={()=>removeSong(album._id)}
                          title='delete song'
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 group">
                             <LucideTrash2 className='w-4 h-4 group-hover:scal-110 transition-transform diration-200'/>
                          </button>
                        </div>
                      
                  </div>
                )
              })
            )
          }
         </div>
         {
          data.length>0 &&(
            <div className="mt-6 bg-gray-50 rounded-lg px-6 py-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Total Albums: 
                  <span className="font-semibold text-gray-900">
                    {data.length}
                  </span>
                </span>
                <span>
                  Last updated 
                  <span className="font-semibold text-gray-900"> Just now</span>
                </span>
              </div>
            </div>
          )
         }
      </div>

    </div>
  </DashBoardLayout>
  )
}

export default ListSong
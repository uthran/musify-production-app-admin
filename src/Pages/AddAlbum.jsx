import React, { useState } from 'react'
import DashBoardLayout from '../Layout/DashBoardLayout'
import './addAlbum.css'
import { Image } from 'lucide-react'
import toast from 'react-hot-toast'
import { albumsAPI } from '../Services/apiservice'
const AddAlbum = () => {
  const [image,setImage]=useState(false)
  const [colour,setColour]=useState("")
  const [name,setName]=useState("")
  const [desc,setDesc]=useState("")
  const [loading,setLoading]=useState(false)

const onSubmitHandler=async(e)=>{
  e.preventDefault();
  setLoading(true)
    try {
      const formData=new FormData()
      const request={
        name,
        desc,
        bgColor:colour
      }
      formData.append("request",JSON.stringify(request))
      formData.append("file",image)
      const response=await albumsAPI.add(formData);
      if (response.status===201) {
        toast.success("Album added");
        setName("");
        setDesc("");
        setImage(false)
        setColour("")
      } else {
        toast.error("Something went wrong while adding album. Try again later")
      }
    } catch (error) {
      toast.error("Error Loading album. Please try again later")
    }
    finally{
      setLoading(false)
    }
}
  return (
    <DashBoardLayout activemenu="Add Album">
    {
      loading?(
        <div className="grid place-items-center min-h-[80vh]">
           <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ):(
        <form onSubmit={onSubmitHandler} className='add-album-form'>
          <div className="add-album-image-div">
            <p>Upload image</p>
            <input 
            type="file"
            accept='image/*'
            onChange={((e)=>setImage(e.target.files[0]))}
            id='image'
            hidden
            />
            <label htmlFor="image">
              {
                image?(
                  <img src={URL.createObjectURL(image)} alt="" />
                ):(
                  <Image/>
                )
              }
            </label>
          </div>
           {/* album name */}
           <div className="add-album-name-div">
            <p>Album name</p>
            <input 
            type="text"
            value={name}
            onChange={((e)=>setName(e.target.value))}
            placeholder='Type here...'
            />
           </div>
           {/* album desc */}
           <div className="add-album-name-div">
            <p>Album description</p>
            <input 
            type="text"
            value={desc}
            onChange={((e)=>setDesc(e.target.value))}
            placeholder='Type here...'
            />
           </div>
           {/*album color*/}
           <div className="add-album-color-div">
            <p>background color</p>
            <input 
            type="color" 
            value={colour}
            onChange={((e)=>setColour(e.target.value))}
            />
           </div>
           <div className="add-album-button">
            <button type='submit' className='add-album-submit'>
            Add
           </button>
           </div>
        </form>
      )
    }
  </DashBoardLayout>
  )
}

export default AddAlbum
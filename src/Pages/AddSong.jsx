import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../Layout/DashBoardLayout'
import { Check, Image, Music, Music4 } from 'lucide-react'
import './addAlbum.css'
import { albumsAPI, songAPI } from '../Services/apiservice'
import toast from 'react-hot-toast'
const AddSong = () => {
  const [image,setImage]=useState(false)
    const [song,setSong]=useState("")
    const [name,setName]=useState("")
    const [desc,setDesc]=useState("")
    const [album,setAlbum]=useState("none")
    const [mood,setMood]=useState("neutral")
    const [albumsdata,setAlbumsdata]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
      loadAlbumsData();
    },[])


  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const formdata=new FormData()
      const request={
        name,
        album,
        desc,
        mood
      }
      formdata.append("request",JSON.stringify(request))
      formdata.append("audio",song)
      formdata.append("image",image)
      const response=await songAPI.add(formdata)
      console.log(response);
      
      if(response.status===201){
        toast.success("song added");
        setName("")
        setDesc("")
        setAlbum("none")
        setImage(false)
        setSong(false)
      }
      else{
        toast.error("Something went wrong while addin song. Please try again later");
      }
    } catch (error) {
       toast.error("Something went wrong while addin song");
    }
    finally{
      setLoading(false)
    }
   
}
const loadAlbumsData=async()=>{
  try {
     const response=await albumsAPI.list();
     setAlbumsdata(response.data.albums)
  } catch (error) {
    toast.error("Failed to Load Albums")
    
  }
}


  return (
    <DashBoardLayout activemenu="Add song">
    {
      loading?(
        <div className="grid place-items-center min-h-[80vh]">
           <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ):(
        <form onSubmit={onSubmitHandler} className='add-album-form'>
          <div className="add-song-song-image-div">
            {/*song file */}
           <div className="add-album-image-div">
            <p>Upload Song</p>
            <input 
            type="file"
            accept='audio/*'
            onChange={((e)=>setSong(e.target.files[0]))}
            id='song'
            hidden
            />
            <label htmlFor="song">
              {
                song?(
                  <Check/>
                ):(
                  <Music4/>
                )
              }
            </label>
          </div>
          {/*image file*/}
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
                  <img src={URL.createObjectURL(image)}  />
                ):(
                  <Image/>
                )
              }
            </label>
          </div>
          </div>
           {/* song name */}
           <div className="add-album-name-div">
            <p>Song name</p>
            <input 
            type="text"
            value={name}
            onChange={((e)=>setName(e.target.value))}
            placeholder='Type here...'
            />
           </div>
           {/* Song desc */}
           <div className="add-album-name-div">
            <p>Song description</p>
            <input 
            type="text"
            value={desc}
            onChange={((e)=>setDesc(e.target.value))}
            placeholder='Type here...'
            />
           </div>
           
           <div className="add-song-mood-album">
            <div className="add-song-album-div">
            <p>Albums</p>
            <select 
            name=""
            id=""
            className="select-album"
            defaultValue={album}
            onChange={((e)=>setAlbum(e.target.value))}
            >
             <option value="none">None</option>
             {albumsdata.map((album,index)=>{
              return (<option value={album.name} key={index}>{album.name}</option>)
             })}
            </select>
           </div>

           <div className="add-song-album-div">
            <p>Select Mood</p>
            <select 
            name=""
            id=""
            className="select-album"
            defaultValue={mood}
            onChange={((e)=>setMood(e.target.value))}>
              <option value="neutral">Neutral</option>
              <option value="happy">Happy</option>
             <option value="sad">Sad</option>
            </select>
           </div>
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

export default AddSong
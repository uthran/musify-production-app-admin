import { Folder, FolderPlus, List, Music } from 'lucide-react'
import logo from './Main-Icon.png'

export const assets={
    logo
}
export const SIDE_MENU_DATA=[
    {
        id:"01",
        label:"Add song",
        icon:Music,
        path:"/add-song"
    },
     {
        id:"02",
        label:"List Songs",
        icon:List,
        path:"/list-songs"
    },
     {
        id:"03",
        label:"Add Album",
        icon:FolderPlus,
        path:"/add-album"
    },
     {
        id:"04",
        label:"List Albums",
        icon:Folder,
        path:"/list-albums"
    },
    
]
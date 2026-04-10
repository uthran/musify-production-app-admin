import React from 'react'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import AddSong from './Pages/AddSong';
import ListSong from './Pages/ListSong';
import AddAlbum from './Pages/AddAlbum';
import ListAlbum from './Pages/ListAlbum';
import { AuthProvider } from './Context/AuthContext';
import './App.css';
import ProtectedRoute from './Componenets/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
       <Toaster/>
       <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add-song' element={
          <ProtectedRoute requiredAdmin={true}>
            <AddSong/>
            </ProtectedRoute>
        }/>
        <Route path='/list-songs' element={
           <ProtectedRoute requiredAdmin={true}>
            <ListSong/>
            </ProtectedRoute>
        }/>
        <Route path='/add-album' element={
           <ProtectedRoute requiredAdmin={true}>
            <AddAlbum/>
            </ProtectedRoute>
        }/>
        <Route path='/list-albums' element={
           <ProtectedRoute requiredAdmin={true}>
            <ListAlbum/>
            </ProtectedRoute>
        }/>
        {/* <Route path='*' element={<AddSong/>}/> */}
        <Route path='/' element={<Login/>} />
       </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
import Navbar from './components/navbar/Navbar';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Primary from './pages/primary/Primary';
import Favorites from './pages/favorites/Favorites';
import Breeds from './pages/breeds/Breeds';
import NotFound from './pages/notFound/NotFound';
import MyDogs from './pages/myDogs/MyDogs';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import axios from 'axios';

//missions
// 2 - change the look of the logout
//3 change the fonts
//אפשר לחכות שהכל יטען לפני שזה מציג משהו ?
//למזה זה נתקע כשמותחים
//on logout move the website to homepage
//להעביר את כל היוזאפקטים להוק נפרד
function App() {
  // useEffect(() => {
  //   const trys = async () => {
  //     try {
  //       const serverResponse = await axios.get(
  //         'https://api.thedogapi.com/v1/breeds'
  //       );
  //       console.log(
  //         serverResponse.data.map((dog) => {
  //           return dog.name;
  //         })
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   trys();
  // });
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Primary />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/breeds" element={<Breeds />}></Route>
        <Route path="/myDogs" element={<MyDogs />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;

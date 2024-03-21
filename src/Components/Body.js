import React, { useEffect } from 'react'
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter,RouterProvider, useNavigate } from 'react-router-dom';
import {  onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/UserSlice';

const Body = () => {
  const dispatch=useDispatch();

    const appRouter = createBrowserRouter([
        {
          path:'/',
          element:<Login/>, 
        },
        {
          path:'/browse',
          element:<Browse/>
        },
      ])
      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid,email,displayname} = user;
            dispatch(addUser({uid:uid,email:email,displayname:displayname}));
           
            // ...
          } else {
            // User is signed out
            dispatch(removeUser);
          }
        });
      },[])

  return (
    <div className=''>
         <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default Body;
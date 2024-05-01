import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import styles from "./bookmar.module.css"
import Navbar from '../Navbar/Navbar';
const Bookmarks = () => {

const [isBookmarkedStory,setBookmarkedStories]=useState([]);


useEffect(()=>{
  fetchBookmarkedStories();
},[]);

const fetchBookmarkedStories = async () => {
  try{
    const token = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"]=token;
    console.log("Get bookmark story token", token);
    const response = await axios.get(`https://swipstory-iwwo.onrender.com/api/v1/view/BookmarkedStory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log("this what we have got from the response ",response.data);
    setBookmarkedStories(response?.data?.data);
    return response?.data

  }
  catch(error)
  {
      console.log("Error while fetching the bookmarked Stories:",error);
  }
  };
  return (
    <div>
       <Navbar/>
    <div className={styles.bookmarkContainer}>
    
      {isBookmarkedStory && isBookmarkedStory.length > 0 ? (
        <>
          <h1 className={styles.headingbookmark}>Your Bookmarks</h1>
          <div className={styles.styleContainer}>
          {isBookmarkedStory.map((data) => (
            <div key={data.id}>
              <img src={data?.slides[0]?.imageUrl} alt="bookmark-img"/>
              <h2>{data?.slides[0]?.heading}</h2>
              <p>{data?.slides?.description}</p>
            </div>
          ))}
          </div>
        </>
      ) : (
        <h1>No Stories Bookmarked</h1>
      )}
    </div>
    </div>
  );
}

export default Bookmarks
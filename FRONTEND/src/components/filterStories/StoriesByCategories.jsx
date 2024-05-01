import styles from "./category.module.css"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";

const StoriesByCategories = ({category}) => {
const [categoryImages,setCategoryImages]=useState([]);

useEffect(() => {
    fetchStoriesByCategory(category);
  }, [category]);

const fetchStoriesByCategory=async(category)=>{
    try{
        if(!category)
        return ;
      const token=localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"]=token;
      console.log("GET TOKEN",token);
      console.log("CATEGORRYY: ",category);
      const response=await axios.get(`https://swipstory-iwwo.onrender.com/api/v1/getStory/${category}`);
    
      console.log("this is response !!",response.data);
        setCategoryImages(response?.data?.data)
    }
    catch(error){
      console.log(error);
      console.log("Something went wrong")  
    }
  }
  
  return (
    <div>
      <Navbar/> 
  <div className={styles.mainContainer} >
    <h1 className={styles.h2}>Top Stories about {category} </h1>
    <div className={styles.container}>
      {categoryImages?.map((data) => (

        <div key={data._id} >
           
          <img src={data?.slides[0]?.imageUrl} alt="pic" />
          <h2>{data?.slides[0]?.heading}</h2>
          <p>{data?.slides[0]?.description}</p>
         
        </div>
      ))}
    </div>
  </div>
    </div>
  );
};

export default StoriesByCategories;

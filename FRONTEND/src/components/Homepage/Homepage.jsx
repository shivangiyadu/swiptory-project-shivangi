
import React from 'react';
import './homepage.module.css';
import { useState ,useEffect} from 'react';
import allImage from '../../assets/categories/squirrel.jpg';
import foodImage from '../../assets/categories/Food.jpeg';
import travelImage from "../../assets/categories/Travel.jpg"
import worldImage from '../../assets/categories/world.webp';
import indiaImage from '../../assets/categories/IndiaGate.webp';
import Navbar from '../Navbar/Navbar';
import { StoryCard } from '../StoryCard/StoryCard';
import axios from 'axios';
import StoriesByCategories from '../filterStories/StoriesByCategories';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'all', image: allImage },
  { name: 'food', image: foodImage },
  { name: 'travel', image: travelImage },
  { name: 'world', image: worldImage },
  { name: 'india', image: indiaImage },
];



export const Homepage = () => {
  const [mystories, setMyStories] = useState([]);
 // const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryImages, setCategoryImages] = useState([]);



  useEffect(() => {
    fetchYourStories();
  }, []);

  const fetchYourStories = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`https://swipstory-iwwo.onrender.com/api/v1/getMyStory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.log("Error While fetching stories:", error);
    }
  };
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchYourStories();
        setMyStories(data?.data);
     
      } catch (error) {
        console.log("Error While fetching stories:", error);
      }
    };

    fetchData();

  }, []);
  



const handleCategoryClick=(category)=>{
 // fetchStoriesByCategory(category)
  navigate(`/${category}`);
}
console.log("this is  array",categoryImages);
return (
  <div>
    <Navbar setMyStories={setMyStories}/>
    <div className='homepage-categories'>
      {categories.map((category, index) => (
        <div key={index} className="category-container" 
        onClick={()=>handleCategoryClick(category.name)}  >
          
          <img src={category.image} alt={category.name} className="category-image" />
          <span className="category-name">{category.name}</span>
        </div>
      ))}
    </div>
    <div className="story-section">
  <h2 className='stories-heading'>Your Stories</h2>

<div className='story-container'>
  {Array.isArray(mystories) && mystories.map(story => (
    <StoryCard key={story._id} story={story} setMyStories={setMyStories}/>
  ))}
  </div>
  {/* <div className='category-images'>
   {Array.isArray(mystories)&& mystories.map(story=>(
    <StoriesByCategories key={story._id} story={story}/>
   ))}
     </div> */}
{/* Fetching stories -------->Category section */}

{/* {selectedCategory && (
   <div className='category-image-section'>
       <h2>Top Stories about {selectedCategory}</h2>
       <div className='category-images-container'>
        {categoryImages.map((image)=>(
          <img key={image._id} src={image.slidesimageUrl} alt={image}/>
         
        ))}
  
        </div>
   </div>
  


    )} */}
    {/* {selectedCategory && (
    <div className='category-section'>
      <h2>Top Stories about {selectedCategory}</h2>
      <div className='category-images'>
        {categoryImages.map((data)=>
        {
          <img  src={data.slides[0].imageUrl}/>
          <h2>{data.slides[0].heading}</h2>
          <p>{data.slides[0].description}</p>
        })}
      </div>
    </div>
    )} */}
    {  (
  <div className='category-section'>
   
    <div className='category-images'>
      {categoryImages?.map((data) => (
        <div key={data._id}> 
          <img src={data?.slides[0]?.imageUrl} alt="pic" />
          <h2>{data?.slides[0]?.heading}</h2>
          <p>{data?.slides[0]?.description}</p>
         
        </div>
      ))}
    </div>
  </div>
)}
</div>

  </div>
);
};

export default Homepage;
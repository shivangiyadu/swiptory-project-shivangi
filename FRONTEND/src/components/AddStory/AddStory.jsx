import React, { useState, useEffect } from "react";
import cross from "../../assets/categories/cross.jpg";
import crossIcon from "../../assets/categories/SmallCross.jpg";
import "./addstory.module.css";
import axios from "axios";
import toast from "react-hot-toast";

export const AddStory = ({closeAddStoryModal,setMyStories}) => {
  const [slides, setSlides] = useState([
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [category, setCategory] = useState('');
  const [yourStories, setYourStories] = useState([]);

  useEffect(() => {
    if (slides.length < 3) {
      setSlides([
        ...slides,
        { heading: "", description: "", image: "", category: "" },
      ]);
    }
  }, [slides]);

  const isValidURL = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }
  const createStory = async () => {
    try {
      const token = localStorage.getItem("token");
      const storyData = {
        slides: slides.map(slide => ({
          heading: slide.heading,
          description: slide.description,
          imageUrl: slide.image
        })),
        category: category
      };
      const response = await axios.post(`https://swipstory-iwwo.onrender.com/api/v1/createStory`, storyData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Story created Successfully', response.data);
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  useEffect(() => {
    fetchYourStories();
  }, []);


  const fetchYourStories = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common["Authorization"]=token;
      console.log("GETSTORY TOKEN::", token);
      const response = await axios.get(`https://swipstory-iwwo.onrender.com/api/v1/getMyStory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setYourStories(response.data.data);
      return response.data;
    }
    catch (error) {
      console.log("Error While fetching stories :", error);
    }
  };


  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setActiveSlideIndex(currentSlideIndex + 1);
    } else {
      if (slides.length < 6) {
        setSlides([...slides, { ...slides[slides.length - 1] }]);
        setCurrentSlideIndex(slides.length);
        setActiveSlideIndex(slides.length);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setActiveSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleRemoveSlide = (index) => {
    const updatedSlides = slides.filter((slide, i) => i !== index);
    setSlides(updatedSlides);
    if (currentSlideIndex >= updatedSlides.length) {
      setCurrentSlideIndex(updatedSlides.length - 1);
      setActiveSlideIndex(updatedSlides.length - 1);
    }
  };

  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides([...slides, { ...slides[slides.length - 1] }]);
      setCurrentSlideIndex(slides.length);
      setActiveSlideIndex(slides.length);
    }
  };


  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (field === "category") {
      setCategory(value);
    } else if (field === "image") {
      // Validate image URL using regex
      if (isValidURL(value)) {
        const updatedSlides = [...slides];
        updatedSlides[currentSlideIndex][field] = value;
        setSlides(updatedSlides);
      } else {
        // Handle invalid URL
        // You can display an error message or take other actions here
        console.log("Invalid URL");
      }
    } else {
      const updatedSlides = [...slides];
      updatedSlides[currentSlideIndex][field] = value;
      setSlides(updatedSlides);
    }
  };
  console.log("this is setmYstores",setMyStories)


  const handlePost =async () => {
    console.log("Form Data:", slides);
    await createStory();
    const data=await fetchYourStories();
    setMyStories(data?.data);
    console.log("this is our updated data:",data);
    closeAddStoryModal();
    toast.success("Your story uploaded successfully")
  };

  return (
    <div className="form-content">
      <div className="close-btn-container">
      <img className="close-addStory" src={cross} alt="" onClick={closeAddStoryModal}/> 
      </div>
      <div className="input-container">
        <span className="add">Add up to 6 slides</span>
        <div className="SlideContainer">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide-wrapper ${activeSlideIndex === index ? "active" : ""}`}
            >
              <button
                className={`slide${index}`}
                onClick={() => {
                  setCurrentSlideIndex(index);
                  setActiveSlideIndex(index);
                }}
              >
                Slide {index + 1}
              </button>
              {index >= 3 && index <= 5 && (
                <img
                  src={crossIcon}
                  alt="Remove slide"
                  className="cross-icon"
                  onClick={() => handleRemoveSlide(index)}
                />
              )}
              {/* Pass the category state variable to each slide */}
              <input
                type="hidden"
                value={category}
                onChange={(e) => handleInputChange(e, "category")}
              />
            </div>
          ))}
          <div className="slide-wrapper">
            <button className="add-slide" onClick={handleAddSlide}>
              Add
            </button>
          </div>
        </div>

        <div className="heading-container ">
          <label className="heading-label">Heading:</label>
          <input
            className="heading-input"
            type="text"
            value={slides[currentSlideIndex].heading}
            onChange={(e) => handleInputChange(e, "heading")}
            placeholder="Your Heading"
            required
          />
        </div>

        <div className="description-container">
          <label className="description-label">Description :</label>
          <input
            className="description-input"
            type="text"
            value={slides[currentSlideIndex].description}
            onChange={(e) => handleInputChange(e, "description")}
            placeholder="Story Description"
            required
          />
        </div>

        <div className="image-container">
          <label className="image-label">Image URL : </label>
          <input
            className="image-input"
            type="text"
            value={slides[currentSlideIndex].image}
            onChange={(e) => handleInputChange(e, "image")}
            placeholder="Add Image URL"
            required
          />
        </div>
        <div className="category-container">
          <label className="category-label">Select Category:</label>
          <select
            className="category-input"
            value={category}
            onChange={(e) => handleInputChange(e, "category")}
            required
          >
            <option value="">Select</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
          </select>
        </div>
        <div className="button-div">
          <button className="prev-btn" onClick={handlePrevious}>
            Previous
          </button>
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
          <button className="post-btn" onClick={handlePost} >Post</button>
        </div>
      </div>
    </div>
  );
};

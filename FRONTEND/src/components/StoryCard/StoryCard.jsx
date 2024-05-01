import React, { useState, useEffect } from "react";
import "./story.module.css";
import { AddStory } from "../AddStory/AddStory";
import Modal from "react-modal";
import Stories from "react-insta-stories";
import bookmarkIcon from "../../assets/categories/bookmark.jpg";
import shareIcon from "../../assets/categories/share_button.png";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { BiSolidBookmarkStar } from "react-icons/bi";

//import cross from "../../assets/categories/SmallCross.jpg";

import axios from "axios";

export const StoryCard = ({ story,setMyStories }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);
  //const [isLike, setIslike] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRed, SetIsRed] = useState(false);
  const [category, setCategory] = useState("");
  const [slides, setSlides] = useState([
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
  ]);

  const openStoryModal = () => {
    setIsStoryModalOpen(true);
  };
  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
  };
  const toggleLike = (id) => {
    console.log("story liked!!");
    SetIsRed((value) => !value);
    likeAndUnlikeStory(id);
  };
  const closeAddStoryModal = () => {
    setIsAddStoryOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50% ,-50%)",
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    },
  };
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleImageClick = (slide, event) => {
    console.log("Slide clicked:", slide);
  };

  // const handleEditButtonClick = (id) => {
  //   setIsEditModalOpen(true);
  //   editStoryDetail(id);
  // };

  console.log("story data", story);

  const bookmarkAndUnbookmark = async (id, isBookmarked) => {
    console.log("checking it is working", id);
    try {
      const token = localStorage.getItem("token");
      console.log("incoming id:", id);

      const response = await axios.post(
        `https://swipstory-iwwo.onrender.com/api/v1/bookmarkStory/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Toggle Bookmark successful:", response.data);
      
        setIsBookmarked(response.data.bookmarked);
        return response;
      }
    } catch (error) {
      console.log("Error toggling bookmark Status:", error);
    }
  };

  const likeAndUnlikeStory = async (id) => {
    console.log("This is liked alreadyy!!");
    try {
      const token = localStorage.getItem("token");
      console.log("incoming id:", story._id);

      const response = await axios.put(
        `https://swipstory-iwwo.onrender.com/api/v1/like/${story._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("like story:", response.data);
    } catch (error) {
      console.log("Error liking Status:", error);
    }
  };

  const toggleBookmark = async (id, isBookmarked) => {
    console.log("bookmarkedddd!!!!");
    try {
      const response = await bookmarkAndUnbookmark(id, isBookmarked);
       console.log("inside the function",response);
      if (response) {
        setIsBookmarked((prev) => !prev);
      }
    } 
    catch (error) {
      console.log("Error toggling bookmark", error);
    }
  };

  const editStoryDetail = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const storyData = {
        slides: slides.map((slide) => ({
          heading: slide.heading,
          description: slide.description,
          imageUrl: slide.image,
        })),
        category: category,
      };
      const response = await axios.post(
        `https://swipstory-iwwo.onrender.com/api/v1/editStory/${id}`,
        storyData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Story Edited Successfully", response.data);
    } catch (error) {
      console.error("Error Error story:", error);
    }
  };

  return (
    <div>
      {/* --------------Fetching stories created by user--------------------- */}
      <div className="your-stories">
        <img
          src={story?.slides[0]?.imageUrl}
          onClick={openStoryModal}
          alt="food"
        />
        <h2>{story?.slides[0]?.heading}</h2>
        <p>{story?.slides[0]?.description}</p>
        <span>{}</span>

        {/* <button className="edit-btn button" onClick={handleEditButtonClick}>
          Edit
        </button> */}
        {isEditModalOpen && (
          <AddStory  closeAddStoryModal={closeAddStoryModal} setMyStories={setMyStories}/>
        )}
      </div>
      <Modal
        isOpen={isStoryModalOpen}
        onRequestClose={closeStoryModal}
        style={customStyles}
      >
        <Stories
          stories={story.slides.map((slide) => ({
            content: () => (
              <div className="story-card-open">
                <div
                  className="image__container"
                  onClick={(event) => {
                    handleImageClick(slide, event);
                  }}
                >
                  <img src={slide.imageUrl} alt="story" />
                </div>
                <h2>{slide.heading}</h2>
                <p>{slide.description} </p>
                {/* <img src={storycrosss} alt="" /> */}
                <span
                  className="bookmark-btn"
                    onClick={() => toggleBookmark(story._id,isBookmarked)}
                >
               {isBookmarked ? <FaRegBookmark /> : <BiSolidBookmarkStar />}    
                </span>
{/* 
                <span
                  className={isBookmarked ? "bookmark-btn" : "unbookmarked"}
                  onClick={toggleBookmark}                 
                >
                  {isBookmarked ? <FaRegBookmark /> : <BiSolidBookmarkStar />}
                </span> */}

                
                <span
                  className={`heart ${isRed ? "red" : "white"}`}
                  style={{ cursor: "pointer" }}
                  // onClick={toggleLike(id)}
                  onClick={(id) => toggleLike(story._id)}
                >
                  &#9829;
                </span>

                <img src={shareIcon} alt="ShareIcon" className="share-btn" />
              </div>
            ),
            duration: 5000,
          }))}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={setIsEditModalOpen}
        style={customStyles}
      >
        {/* Modal Content */}
      </Modal>
    </div>
  );
};

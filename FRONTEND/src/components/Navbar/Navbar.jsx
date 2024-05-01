
import React, { useState ,useEffect} from 'react';
import bookmark from "../../assets/categories/bookmark.jpg";
import "./navbar.module.css";
import Register from '../Register/register';
import Modal from "react-modal";
import { Login } from "../login/Login"
import {AddStory} from '../AddStory/AddStory';
import profile from "../../assets/categories/Profile.jpg";
import humburger from "../../assets/categories/hamburger.jpg";
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Navbar = ({setMyStories}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isBookmarkedStory,setBookmarkedStories]=useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50% ,-50%)",
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", 
      },
    },
  };

  useEffect(() => {
    Modal.setAppElement('#root'); 
  }, []);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModal] = useState(false);
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);
   const [isHamburgerOpen,setIsHamburgerOpen]=useState(false);
   const [isBookmarkopen,setIsbookMarkOpen]=useState(false);
  

   const navigate = useNavigate();

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openSignInModal = () => {
    setIsSignInModal(true)
  }

  const closeSignInModal = () => {
    setIsSignInModal(false);
  }

  const openAddStoryModal = () => {
    setIsAddStoryOpen(true)
  }
  const closeAddStoryModal = () => {
    setIsAddStoryOpen(false)
  }
  
  const handleHamburger=()=>{
    setIsHamburgerOpen(!isHamburgerOpen);
  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  const handleBookmark=()=>{
    setIsbookMarkOpen(false);
    navigate('/bookmarks');
    //fetchBookmarkedStories();

  }

  const renderUserDetails=()=>{
    if(isLoggedIn)
    {
      return (
        <div className='user-details'>
          <span className='username'>Shivangi</span>
          <button className='logout-btn' onClick={handleLogout} >logout</button>
        </div>
      )
    }
  }


  return (
    <div className='navbar'>
      <div className='heading-navbar'>
        <h1>Swiptory</h1>
      </div>

      <div className='auth-button'>
        {!isLoggedIn ? (
          <>
        <button onClick={openRegisterModal} className='register-now'>Register Now</button>
        <button onClick={openSignInModal} className='sign-in'>Sign In</button>
        </>
        ): (
          <>
        <div className='bookmark'>
          <img className='bookmark-image' src={bookmark} alt="" />
          <button className='bookmark-button' onClick={handleBookmark}>Bookmarks</button>
        </div>

        <button onClick={openAddStoryModal} className='register-now'>AddStory</button>
      
        <img src={profile} alt="profile"/>
        <img src={humburger} alt="sidebar" className='sidebar' onClick={handleHamburger}/>
        {isHamburgerOpen &&  renderUserDetails() }
        </>
         )}
        
        {isRegisterModalOpen && <Register closeRegisterModal={closeRegisterModal} />}

        {isSignInModalOpen && <Login closeSignInModal={closeSignInModal} />}

        {isAddStoryOpen && <AddStory setMyStories={setMyStories} closeAddStoryModal={closeAddStoryModal} />}

       
      </div>

      <Modal isOpen={isRegisterModalOpen} onRequestClose={closeRegisterModal} style={customStyles}>
        {/* Modal Content */}
      </Modal>

      <Modal isOpen={isSignInModalOpen} onRequestClose={closeSignInModal} style={customStyles}>
        {/* Modal Content */}
      </Modal>

      <Modal isOpen={isAddStoryOpen} onRequestClose={closeAddStoryModal} ariaHideApp={true} style={customStyles}>
        {/* Modal Content */}
      </Modal>

    </div>
  );
};

export default Navbar;
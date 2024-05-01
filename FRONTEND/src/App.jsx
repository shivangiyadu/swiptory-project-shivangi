import './App.css';
import {Toaster} from "react-hot-toast"
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Homepage } from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Bookmarks from './components/Bookmark/Bookmarks';
import StoriesByCategories from './components/filterStories/StoriesByCategories';


function App() {
  

  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/food" element={<StoriesByCategories category={"food"}/>} />
        <Route path="/travel" element={<StoriesByCategories category={"travel"}/> } />
        <Route path="/education" element={<StoriesByCategories category={"education"}/>} />
        <Route path="/india" element={<StoriesByCategories category={"india"}/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

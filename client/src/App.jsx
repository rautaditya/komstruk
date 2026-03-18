// import { useState } from 'react'
// import './App.css'
// import Header from './componants/Header'
// import Footer from './componants/Footer'
// import Home from './pages/Home'
// import Product from './pages/Product'
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//    <div>
//   <Header/>
//   <Home/>
//   <Footer/> 

//   {/* <Product/> */}
//    </div>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./admin/Login";
import About from './pages/About us'
import Projects from './pages/Projects'
import Blogs from './pages/Blogs'
import Career from './pages/Career'
import Contact_us from "./pages/Contact_us";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About us />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/projects" element={<Projects/>} />
       <Route path="/blogs" element={<Blogs/>} />
       <Route path="/career" element={<Career/>} />
       <Route path="/contact_us" element={<Contact_us/>} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
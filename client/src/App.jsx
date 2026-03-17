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
import Home from './pages/Home'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />

    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
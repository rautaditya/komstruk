import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import Blogs from "./pages/Blogs";
import Career from "./pages/Career";
import Contact_us from "./pages/Contact_us";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Application from "./pages/Application"
import MainLayout from "./layouts/MainLayout";
import PolymerDispersion from "./pages/PolymerDispersion"
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Routes WITH Header + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/applications" element={<Application/>} />
          <Route path="/polymerdispersion" element={<PolymerDispersion/>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact_us" element={<Contact_us />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;

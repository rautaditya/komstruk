import { useState } from 'react'
import './App.css'
import Header from './componants/Header'
import Footer from './componants/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
  <Header/>
  <Home/>
  <Footer/> 
  {/* <Product/> */}
   </div>
  )
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Collection from './pages/Collection';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Safecontract from './pages/Safecontract';
import DummyPay from './components/DummyPay';
import Dispute from './pages/Dispute';
import TrackProduct from './pages/TrackProduct.jsx';




const App = () => {
  return (
    
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />  {/* for notifications */}
        <Navbar />
        <SearchBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/login' element={<Login/>} />
          <Route path="/dummy-pay" element={<DummyPay />} />
          <Route path='/Dispute' element={<Dispute/>} />

          {/* <Route path="/safecontract" element={<SafeContract />} /> */}
          <Route
  path="/safecontract"
  element={<Safecontract product={{ _id: "123", name: "Sample", price: 1000 }} />}
/>
<Route path='/track-product' element={<TrackProduct />} />
        </Routes>
        <Footer/>
      </div>
      );
};

export default App;

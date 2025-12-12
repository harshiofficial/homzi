import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/Navbar';
import CartIcon from './components/CartIcon';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/ServicesNew';
import Pricing from './pages/Pricing';
import AdminLeads from './pages/AdminLeads';
import Booking from './pages/Booking';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Contact from './pages/Contact';
import CustomerSignup from './pages/CustomerSignup';
import ProfessionalSignup from './pages/ProfessionalSignup';
import Login from './pages/Login';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <LocationProvider>
        <Router>
          <div className="App">
            <Navbar />
            <CartIcon />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/admin/leads" element={<AdminLeads />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/customer-signup" element={<CustomerSignup />} />
                <Route path="/professional-signup" element={<ProfessionalSignup />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LocationProvider>
    </CartProvider>
  );
}

export default App;

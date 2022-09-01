import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';


function App() {
  return (
  <Router>
    <Header />
      <main className='py-3'>
          <Container>
          <Routes>
              <Route path='/' exact element={ <HomeScreen /> }  />
              <Route path='/login' exact element={ <LoginScreen /> }  />
              
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/cart" element={<CartScreen />} />
            </Routes>
          </Container>
      </main>
      <Footer />
  </Router>
);
}

export default App;

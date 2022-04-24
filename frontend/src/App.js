import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'


import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='py-5'>
      <Container>
        <h1>Welcome</h1>
          <HomeScreen />
      </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;

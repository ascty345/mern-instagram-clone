import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
          </Routes>
        </Container>
      </Router>
    </>
  )
}

export default App

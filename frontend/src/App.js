import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar'
import HomeScreen from './screens/HomeScreen'
import PostsOfFollowingScreen from './screens/PostsOfFollowingScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProfileOfOtherUserScreen from './screens/ProfileOfOtherUserScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import UserUpdateScreen from './screens/UserUpdateScreen'
import SinglePostScreen from './screens/SinglePostScreen'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/following' element={<PostsOfFollowingScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route
                path='/profile/:id'
                element={<ProfileOfOtherUserScreen />}
              />
              <Route path='/profile/settings' element={<UserUpdateScreen />} />
              <Route path='/createPost' element={<CreatePostScreen />} />
              <Route path='/post/:id' element={<SinglePostScreen />} />
            </Routes>
          </Container>
        </main>
      </Router>
    </>
  )
}

export default App

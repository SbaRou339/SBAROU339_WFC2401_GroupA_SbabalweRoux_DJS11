import { Route, Routes } from 'react-router-dom'
import Navbar from '../src/Components/Navbar'
import Home from './Pages/HomePage'
import GenrePage from './Pages/GenrePage'
import HomeButtons from './Components/Buttons'
import PodcastPage from './Pages/PodcastPage'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/" element={<HomeButtons />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/podcast" element={<PodcastPage />} />
      </Routes>
    </>
  )
}

export default App

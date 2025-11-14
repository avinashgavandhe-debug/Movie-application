import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieListing from './components/MovieListing'
import MovieDetails from './components/MovieDetails'


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieListing />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path='/popular' element={<MovieListing/>}/>
        <Route path='/top-rated' element={<MovieListing/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
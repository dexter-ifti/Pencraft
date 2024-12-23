
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Login, Signup, Blog, WriteBlog, Landing } from './pages'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/write' element={<WriteBlog/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
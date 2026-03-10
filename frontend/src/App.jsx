import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Addproduct from './components/Addproduct';

function App() {

  return (
    <div className='container'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add-products' element={<Addproduct/>}/>
          <Route path='/edit/:id' element={<Addproduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

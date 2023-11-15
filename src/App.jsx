import { Route, Routes } from 'react-router-dom';
import './App.css'
import Logo from "./Logo.jsx";
import Users from './routes/Users.jsx';
import Userinfo from './routes/Userinfo.jsx';
function App() {
 
  return (
    <div className='page'>
       <div className='nav'>
       <Logo />
       <Routes>
        <Route path='/' element={<Users/>}></Route>
        <Route path='/:name' element={<Userinfo />}></Route>
       </Routes>
       </div>
    </div>

  
  )
}

export default App

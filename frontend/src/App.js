import './App.css';
import {
  BrowserRouter, Routes, Route
} from "react-router";
import Ledgertstate from './context/Ledgerstate.js'
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/Navbar'
function App() {
  return (
    <>
      <Ledgertstate>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>

        </BrowserRouter>

      </Ledgertstate>
    </>
  );
}

export default App;
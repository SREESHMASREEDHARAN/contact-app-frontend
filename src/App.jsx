
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Dashboard from './Pages/Dashboard';
import Auth from './Pages/Auth';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="App">
     <Header/>
     <Routes>
      <Route path='/' element={<Auth/>}/>
     <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='*' element={<PageNotFound/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;

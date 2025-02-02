
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OrganisationSetupPage from './pages/OrganisationSetupPage';
import NextPage from './pages/NextPage';
import ClientPage from './pages/ClientPage'
import SucessPage from './pages/Suceesspage'


function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route  path="/organisation-setup" element={<OrganisationSetupPage />} />
      <Route path="/next-page" element={<NextPage/>}/>  
      <Route path="/client-page" element={<ClientPage/>}/>   
      <Route path="/sucess-page" element={<SucessPage/>}/> 
      
      
      
      </Routes>
    </>
  );
}

export default App;

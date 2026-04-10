import Login from "./login";
import Welcomeuser from "./components/UserManagement-Folder/welcomeuser";
import Welcomeadmin from "./components/UserManagement-Folder/welcomeadmin";
import UserManagement from "./components/UserManagement-Folder/usermanagement";
import TopProduct from "./components/MainFolder/topproduct.jsx";
import Sales from "./components/MainFolder/sales.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>  
      <Routes>
         <Route path="/" element={<Login/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/welcomeuser" element={<Welcomeuser />} />
        <Route path="/welcomeadmin" element={<Welcomeadmin />} />
        <Route path="/usermanagement" element={<UserManagement/>}/> 
        <Route path="/topproduct" element={<TopProduct/>}/>
        <Route path="/sales" element={<Sales/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import { SignIn } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./ContextApi";
import { useState } from "react";


function App() {
  const [SignInData, setSignInData] = useState([]);
  
   
  console.log(SignInData)

  return (
    <div>
      <StoreProvider value={{ SignInData, setSignInData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;

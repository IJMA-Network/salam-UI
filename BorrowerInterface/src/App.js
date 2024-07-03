import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import { SignIn } from "./Pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./ContextApi";
import { useState } from "react";
import 'antd/dist/antd.css';

function App() {
  const [SignInData, setSignInData] = useState([]);
  const[mode,setMode]=useState("");

  return (
    <StoreProvider value={{ SignInData, setSignInData,mode,setMode }}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;

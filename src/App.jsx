import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit"; 
import Playercard from "./pages/Playercard"; 
import Playercardb from "./pages/Playercardb"; 
import Playercardc from "./pages/Playercardc"; 
import Playercardd from "./pages/Playercardd";  
import Playercarde from "./pages/Playercarde";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:rowIndex" element={<Edit />} /> 
          <Route path="/playercard/:rowIndex" element={<Playercard />} /> 
          <Route path="/playercardb/:rowIndex" element={<Playercardb />} /> 
          <Route path="/playercardc/:rowIndex" element={<Playercardc />} />  
          <Route path="/playercardd/:rowIndex" element={<Playercardd />} />  
          <Route path="/playercarde/:rowIndex" element={<Playercarde />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

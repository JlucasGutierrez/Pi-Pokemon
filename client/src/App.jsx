import {Routes, Route, useLocation} from "react-router-dom"

import Home from "./views/Home Page/Home";
import Landing from "./views/Landing Page/landing";
import Detail from "./views/Detail Page/detail";
import Form from "./views/Form Page/form"
import Exit from "./views/Exit Page/exit";

import NavBar from "./components/NavBar/navBar";


function App() {

  const{pathname}= useLocation();

return (
    <div>
      {pathname === "/home" &&  <NavBar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/exit" element={<Exit />} />
      </Routes>
    </div>
  );
}

export default App;

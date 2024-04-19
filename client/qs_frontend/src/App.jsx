import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./pages/form";
import Question from "./pages/question";
import Login from "./pages/login";
import Teacherform from "./pages/teacherForm";
import Uploadimages from "./pages/uploadImages";
import Uplaodsheet from "./pages/uploadSheet";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/teacherForm" index element={<Teacherform />} />
        <Route path="/form" index exact element={<Form />} />
        <Route path="/question" index element={<Question />} />
        <Route path="/uploadSheet" index element={<Uplaodsheet />} />
        <Route path="/uploadImages" index element={<Uploadimages />} />
      </Routes>
    </Router>
  );
}

export default App;

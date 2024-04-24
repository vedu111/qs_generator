import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./pages/form";
import Question from "./pages/question";
import Login from "./pages/login";
import Teacherform from "./pages/teacherForm";
import Uplaodsheet from "./pages/uploadSheet";
import QuestionPaper from "./pages/questionPaper";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/teacherForm" element={<Teacherform />} />
        <Route path="/form" element={<Form />} />
        <Route path="/question" element={<Question />} />
        <Route path="/uploadSheet" element={<Uplaodsheet />} />
        <Route path="/questionPaper" element={<QuestionPaper />} />
      </Routes>
    </Router>
  );
}

export default App;

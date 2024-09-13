import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Form from "./pages/form";
import Question from "./pages/question";
import Login from "./pages/login";
import Teacherform from "./pages/teacherForm";
import Uploadsheet from "./pages/uploadSheet";
import QuestionPaper from "./pages/questionPaper";
import QuestionGenerator from "./pages/questionGenerator";
import SubjectInfo from "./pages/subjectInfo";
import Layout from "./components/Layout";
// import Signup from "./pages/signup";
import Flush from "./pages/flush";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Home />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/teacherForm" element={<Layout><Teacherform /></Layout>} />
        <Route path="/form" element={<Layout><Form /></Layout>} />
        <Route path="/question" element={<Layout><Question /></Layout>} />
        <Route path="/uploadSheet" element={<Layout><Uploadsheet /></Layout>} />
        <Route path="/questionPaper" element={<Layout><QuestionPaper /></Layout>} />
        <Route path="/questionGenerator" element={<Layout><QuestionGenerator /></Layout>} />
        <Route path="/subjectInfo" element={<Layout><SubjectInfo /></Layout>} />
        <Route path="/flush" element={<Layout><Flush /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;

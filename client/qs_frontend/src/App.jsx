import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./pages/form";
import Question from "./pages/question";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index exact element={<Form />} />
        <Route path="/question" index element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;

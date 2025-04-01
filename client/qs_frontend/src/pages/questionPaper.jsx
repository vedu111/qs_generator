import React from "react";
import { auth } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function questionPaper() {
  const navigate = useNavigate();
  const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // });
  const td = {
    border: "1.8px solid black",
    width: "40px",
    padding: "4px 0 4px 8px",
  };
  const tableData = [
    {
      section: "I",
      type: "Short Answer Questions (Answer any 05 questions out of 06) (Fundamental, Core Types)",
      marks: 10,
      quesMarks: 2,
      arrSize: 6,
    },
    {
      section: "II",
      type: "Descriptive Answer Questions(Answer any 04 out of 06) (Descriptive, Comprehension Types)",
      marks: 20,
      quesMarks: 5,
      arrSize: 6,
    },
    {
      section: "III",
      type: "Long Answer Question (Answer any 03 out of 05) (Application, Analytical, Evaluation, Design Type)",
      marks: 30,
      quesMarks: 10,
      arrSize: 5,
    },
  ];

  // Dummy questions array
  const dummyQuestions = [
    "What is the capital of France?",
    "Explain the concept of globalization.",
    "Solve the following equation: 2x + 3 = 7",
    "Discuss the impact of climate change on biodiversity.",
    "What is the purpose of a database management system?",
    "Describe the steps involved in the scientific method.",
    "Explain the importance of teamwork in organizations.",
    "What are the characteristics of a good leader?",
    "Discuss the advantages and disadvantages of renewable energy sources.",
    "Define the concept of cultural relativism.",
    "Explain the process of photosynthesis.",
  ];

  return (
    <div className="bg-white p-8 w-fit my-6 mx-auto">
      <div className="w-[900px]">
        <div className="mb-4">
          <img src="/tcetHeader.jpg" alt="" />
        </div>
        {tableData.map((data, index) => (
          <table key={index} className="border-[1.8px] border-black w-full">
            <thead>
              <tr className="font-bold">
                <td className="pl-2">Section-{data.section}</td>
                <td colSpan={4} className="text-center">
                  {data.type}
                </td>
                <td className="pr-2 text-right">({data.marks}marks)</td>
              </tr>
            </thead>
            <tbody>
              {index === 0 && (
                <tr className="font-bold">
                  <td style={td}>Q. NO.</td>
                  <td style={td}> Questions</td>
                  <td style={td}>Marks</td>
                  <td style={td}>CO</td>
                  <td style={td}>RBT Level</td>
                  <td style={td}>PI</td>
                </tr>
              )}
              {/* Fill the table with dummy questions */}
              {[...Array(data.arrSize)].map((_, index) => (
                <tr key={index}>
                  <td style={td}>{index + 1}</td>
                  <td style={td}>{dummyQuestions[index]}</td>
                  <td style={td}>{data.quesMarks}</td>
                  <td style={td}>CO{index + 1}</td>
                  <td style={td}>Level{index + 1}</td>
                  <td style={td}>PI{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default questionPaper;

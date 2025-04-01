import React from "react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserQuestions = [
  {
    rating: "2",
    "sr no.": "1",
    questions: "List operators used in Java.",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "2",
    type: "T",
  },
  {
    rating: "1",
    "sr no.": "2",
    questions: "Classify data types used.",
    co: "CO1",
    rbt: "U",
    pi: "1.3.1",
    marks: "2",
    type: "T",
  },
  {
    rating: "1",
    "sr no.": "3",
    questions: "Define Data Structure",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "2",
    type: "T",
  },
  {
    rating: "1",
    "sr no.": "4",
    questions: "List operations performed on data structures",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "2",
    type: "T",
  },
  {
    rating: "2",
    "sr no.": "5",
    questions: "Show classification of data structures.",
    co: "CO1",
    rbt: "A",
    pi: "2.1.3",
    marks: "2",
    type: "T",
  },
  {
    rating: "1",
    "sr no.": "6",
    questions: "Define class & object",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "2",
    type: "T",
  },
  {
    rating: "2",
    "sr no.": "7",
    questions: "List control structures used in Java",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "2",
    type: "T",
  },
  {
    rating: "3",
    "sr no.": "8",
    questions: "Write a program to demonstrate arithmetic operators",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "5",
    type: "N",
  },
  {
    rating: "1",
    "sr no.": "9",
    questions: "Distinguish between linear & non linear data structures.",
    co: "CO1",
    rbt: "U",
    pi: "1.3.1",
    marks: "5",
    type: "T",
  },
  {
    rating: "2",
    "sr no.": "10",
    questions: "Explain Primitive data types with examples.",
    co: "CO1",
    rbt: "U",
    pi: "1.3.1",
    marks: "5",
    type: "T",
  },
  {
    rating: "3",
    "sr no.": "11",
    questions: "Write a program to demonstrate data types",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "5",
    type: "N",
  },
  {
    rating: "2",
    "sr no.": "12",
    questions: "Explain Non Primitive data types with examples.",
    co: "CO1",
    rbt: "U",
    pi: "1.3.1",
    marks: "5",
    type: "T",
  },
  {
    rating: "3",
    "sr no.": "13",
    questions: "Write a program to demonstrate for loop",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "5",
    type: "N",
  },
  {
    rating: "3",
    "sr no.": "14",
    questions: "Write a program to demonstrate switch case",
    co: "CO1",
    rbt: "R",
    pi: "1.1.1",
    marks: "5",
    type: "N",
  },
  {
    rating: "2",
    "sr no.": "15",
    questions: "Illustrate Data types used in Java",
    co: "CO1",
    rbt: "A",
    pi: "2.1.3",
    marks: "10",
    type: "T",
  },
  {
    rating: "2",
    "sr no.": "16",
    questions: "Illustrate operators used in Java",
    co: "CO1",
    rbt: "A",
    pi: "2.1.3",
    marks: "10",
    type: "T",
  },
  {
    rating: "1",
    "sr no.": "17",
    questions: "Explain the concept of array with its types & examples.",
    co: "CO1",
    rbt: "U",
    pi: "1.3.1",
    marks: "10",
    type: "T",
  },
  {
    rating: "3",
    "sr no.": "18",
    questions:
      "Explain Class object & Methods with syntax and suitable examples.",
    co: "CO1",
    rbt: "U",
    pi: "1.3.1",
    marks: "10",
    type: "T",
  },
  {
    rating: "3",
    "sr no.": "19",
    questions:
      "Explain String & string buffer class with constructor, methods & example.",
    co: "CO1",
    rbt: "U",
    pi: "1.3.1",
    marks: "10",
    type: "T",
  },
  {
    rating: "2",
    "sr no.": "20",
    questions: "Illustrate types of data structures",
    co: "CO1",
    rbt: "A",
    pi: "2.1.3",
    marks: "10",
    type: "T",
  },
  {
    rating: "1",
    "sr no.": "21",
    questions: "Illustrate operations on data structures",
    co: "CO1",
    rbt: "A",
    pi: "2.1.3",
    marks: "10",
    type: "T",
  },
];
const question = () => {
  const downloadPdf = () => {
    console.log("clicked");
    const input = document.getElementById("capture");
    if (!input) {
      console.error("Element with id 'capture' not found.");
      return;
    }
    const opt = {
      margin: 0.2,
      filename: "download.pdf",
      image: { type: "pdf", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };
    html2pdf().from(input).set(opt).save();
  };

  const navigate = useNavigate();
  const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // });

  return (
    <div>
      <div className="flex gap-2">
        <Link to="/">
          <div className="button text-white border border-white mx-auto w-fit rounded-md p-2 cursor-pointer m-2">
            Go Back
          </div>
        </Link>
        <div
          className="button text-white mx-auto bg-blue-800 w-fit rounded-md p-2 cursor-pointer m-2"
          onClick={downloadPdf}
        >
          Download
        </div>
      </div>

      <div className="A4-size w-fit h-fit bg-white mx-auto p-4" id="capture">
        <div className="bg-white rounded-lg text-sm">
          <h1 className="text-xl font-semibold text-center m-4">
            Subject: DAA
          </h1>
          {/* Table for marks === 2 */}
          <table className="w-full table-auto">
            <thead>
              <tr className=" text-gray-700 font-bold">
                <th className="px-4 py-3">Sr No.</th>
                <th className="px-4 py-3">Questions</th>
                <th className="px-4 py-3">CO</th>
                <th className="px-4 py-3">RBT</th>
                <th className="px-4 py-3">Pi</th>
                <th className="px-4 py-3">Marks</th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {UserQuestions.map((question) => {
                if (question.marks === "2") {
                  return (
                    <tr key={question["sr no."]} className="border-b">
                      <td className="px-4 py-3">{question["sr no."]}</td>
                      <td className="px-4 py-3">{question.questions}</td>
                      <td className="px-4 py-3">{question.co}</td>
                      <td className="px-4 py-3">{question.rbt}</td>
                      <td className="px-4 py-3">{question.pi}</td>
                      <td className="px-4 py-3">{question.marks}</td>
                      <td className="px-4 py-3">{question.type}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>

          {/* Table for marks === 5 */}
          <table className="w-full table-auto mt-4">
            <thead>
              <tr className=" text-gray-700 font-bold">
                <th className="px-4   py-3">Sr No.</th>
                <th className="px-4   py-3">Questions</th>
                <th className="px-4   py-3">CO</th>
                <th className="px-4   py-3">RBT</th>
                <th className="px-4   py-3">Pi</th>
                <th className="px-4   py-3">Marks</th>
                <th className="px-4   py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {UserQuestions.map((question) => {
                if (question.marks === "5") {
                  return (
                    <tr key={question["sr no."]} className="border-b">
                      <td className="px-4   py-3">{question["sr no."]}</td>
                      <td className="px-4   py-3">{question.questions}</td>
                      <td className="px-4   py-3">{question.co}</td>
                      <td className="px-4   py-3">{question.rbt}</td>
                      <td className="px-4   py-3">{question.pi}</td>
                      <td className="px-4   py-3">{question.marks}</td>
                      <td className="px-4   py-3">{question.type}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default question;

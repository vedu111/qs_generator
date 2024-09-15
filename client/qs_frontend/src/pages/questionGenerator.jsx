import React, { useEffect, useState } from "react";
import axios from "axios";
import ISEQuesPaper from "../components/ISEQuesPaper";
import ESEQuesPaper from "../components/ESEQuesPaper";
import { auth } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function questionGenerator() {
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("");
  const [ise1, setIse1] = useState(false);
  const [ise2, setIse2] = useState(false);
  const [ese, setEse] = useState(false);
  const [bool, setBool] = useState(false);
  const [set1, setSet1] = useState([]);
  const [set2, setSet2] = useState([]);
  const [set3, setSet3] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [quesPapersView, setQuesPapersView] = useState(false);
  const [quesPaper, setQuesPaper] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingDisabled, setLoadingDisabled] = useState(false);
  const [subjectsInDB, setSubjectsInDB] = useState([]);
  const [subjectNames, setSubjectNames] = useState([
    "Computer Networks (CN)",
    "Operating System (OS)",
    "Design and Analysis of Algorithms (DAA)",
    "Digital Logic Design and Computer Architecture (DLD & COA)",
    "Computer Graphics (CG)",
    "Microprocessor (MP)",
    "Data Base & Management System (DBMS)",
    "Theory of Computation (TOC)",
    "Introduction to Intelligent System (IIS)",
    "Compiler Design (CD)",
    "Maths-3 (M3)",
    "Maths-4 (M4)",
  ]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}collections`
      );
      const data = await response.json();
      const subjects = data.collections.filter(
        (collection) => collection !== "questions" && collection !== "subinfos"
      );
      setSubjectsInDB(
        subjects.map((subject) => {
          if (subject === "cn" || subject === "cns") {
            return "Computer Networks (CN)";
          } else if (subject === "os" || subject === "oss") {
            return "Operating System (OS)";
          } else if (subject === "daa" || subject === "daas") {
            return "Design and Analysis of Algorithms (DAA)";
          } else if (subject === "dldcoa" || subject === "dldcoas") {
            return "Digital Logic Design and Computer Architecture (DLD & COA)";
          } else if (subject === "cg" || subject === "cgs") {
            return "Computer Graphics (CG)";
          } else if (subject === "mp" || subject === "mps") {
            return "Microprocessor (MP)";
          } else if (subject === "dbms" || subject === "dbmss") {
            return "Data Base & Management System (DBMS)";
          } else if (subject === "toc" || subject === "tocs") {
            return "Theory of Computation (TOC)";
          } else if (subject === "iis" || subject === "iiss") {
            return "Introduction to Intelligent System (IIS)";
          } else if (subject === "cd" || subject === "cds") {
            return "Compiler Design (CD)";
          } else if (subject === "m3" || subject === "m3s") {
            return "Maths-3 (M3)";
          } else if (subject === "m4" || subject === "m4s") {
            return "Maths-4 (M4)";
          }
        })
      );
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    subjectsInDB.forEach((subject) => {
      if (subjectNames.includes(subject)) {
        setSubjectNames((prevNames) =>
          prevNames.filter((name) => name !== subject)
        );
      }
    });
  }, [subjectsInDB]);

  const navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
    }
  });

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleExamChange = (e) => {
    setExam(e.target.value);
    setIse1(false);
    setIse2(false);
    setEse(false);
    if (e.target.value === "ise1") {
      setIse1(true);
    } else if (e.target.value === "ise2") {
      setIse2(true);
    } else if (e.target.value === "ese") {
      setEse(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingDisabled(true);
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }quesgen?sub=${subject}&ise1=${ise1}&ise2=${ise2}&ese=${ese}&bool=${bool}`
    );
    setLoading(false);
    console.log(response.data.result);
    setSet1(response.data.result.qp1);
    setSet2(response.data.result.qp2);
    setSet3(response.data.result.qp3);
    setGenerated(true);
    setLoadingDisabled(false);
    console.log("Set1:", response.data.result.qp1);
    console.log("Set2:", response.data.result.qp2);
    console.log("Set3:", response.data.result.qp3);
  };

  const handleViewQuesPapers = () => {
    setQuesPapersView(true);
  };

  return (
    <div className="flex-col">
      <div className="flex justify-center items-center h-[50vh] bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md"
        >
          <div className="mb-5">
            <label
              htmlFor="selectedSubjects"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Subject
            </label>
            <select
              id="selectedSubjects"
              name="selectedSubjects"
              value={subject}
              onChange={handleSubjectChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            >
              <option value="">Select Subject</option>
              {subjectsInDB.map(
                (subject) =>
                  subject && (
                    <option
                      value={subject
                        .match(/\(([^)]+)\)/)[1]
                        .replace(/[ &]/g, "")}
                      key={subject}
                    >
                      {subject}
                    </option>
                  )
              )}
              {subjectNames.map(
                (subject) =>
                  subject && (
                    <option
                      disabled={true}
                      value={subject
                        .match(/\(([^)]+)\)/)[1]
                        .replace(/[ &]/g, "")}
                      key={subject}
                    >
                      {subject}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="selectedExams"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Exam
            </label>
            <select
              id="selectedExams"
              name="selectedExams"
              value={exam}
              onChange={handleExamChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            >
              <option value="">Select EXAM</option>
              <option value="ise1">ISE-1</option>
              <option value="ise2">ISE-2</option>
              <option value="ese">ESE</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              disabled={loadingDisabled}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out flex gap-2 justify-center items-center"
            >
              <span>Generate</span>
              {loading && (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="mb-10 flex flex-col gap-2">
        {generated && (
          <div className="flex justify-center">
            <button
              onClick={handleViewQuesPapers}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
            >
              View Question Papers
            </button>
          </div>
        )}
        {quesPapersView && (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setQuesPaper(1)}
              className={`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out ${
                quesPaper === 1 ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              Question Paper 1
            </button>
            <button
              onClick={() => setQuesPaper(2)}
              className={`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out ${
                quesPaper === 2 ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              Question Paper 2
            </button>
            <button
              onClick={() => setQuesPaper(3)}
              className={`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out ${
                quesPaper === 3 ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              Question Paper 3
            </button>
          </div>
        )}
      </div>
      {quesPaper !== 0 && (
        <div>
          {exam === "ise1" || exam === "ise2" ? (
            quesPaper === 1 ? (
              <ISEQuesPaper
                setNum={quesPaper}
                exam={exam}
                subject={subject}
                set={set1}
              />
            ) : quesPaper === 2 ? (
              <ISEQuesPaper
                setNum={quesPaper}
                exam={exam}
                subject={subject}
                set={set2}
              />
            ) : (
              <ISEQuesPaper
                setNum={quesPaper}
                exam={exam}
                subject={subject}
                set={set3}
              />
            )
          ) : quesPaper === 1 ? (
            <ESEQuesPaper
              setNum={quesPaper}
              exam={exam}
              subject={subject}
              set={set1}
            />
          ) : quesPaper === 2 ? (
            <ESEQuesPaper
              setNum={quesPaper}
              exam={exam}
              subject={subject}
              set={set2}
            />
          ) : (
            <ESEQuesPaper
              setNum={quesPaper}
              exam={exam}
              subject={subject}
              set={set3}
            />
          )}
        </div>
      )}
      {!quesPapersView && (
        <div>
          {set1.length > 0 && set2.length > 0 && set3.length > 0 && (
            <div className="mx-auto p-6">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border border-gray-400">Sr. No.</th>
                    <th className="p-2 border border-gray-400">Question</th>
                  </tr>
                </thead>
                <tbody>
                  {set1.map((item, i) => (
                    <tr key={i} className="bg-white">
                      <td className="p-2 border border-gray-400">
                        {item.sr_no}
                      </td>
                      <td className="p-2 border border-gray-400">
                        {item.questions}
                      </td>
                    </tr>
                  ))}
                  {set2.map((item, i) => (
                    <tr key={i} className="bg-white">
                      <td className="p-2 border border-gray-400">
                        {item.sr_no}
                      </td>
                      <td className="p-2 border border-gray-400">
                        {item.questions}
                      </td>
                    </tr>
                  ))}
                  {set3.map((item, i) => (
                    <tr key={i} className="bg-white">
                      <td className="p-2 border border-gray-400">
                        {item.sr_no}
                      </td>
                      <td className="p-2 border border-gray-400">
                        {item.questions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default questionGenerator;

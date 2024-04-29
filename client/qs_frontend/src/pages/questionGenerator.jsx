import React, { useLayoutEffect, useState } from "react";
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
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}quesgen?sub=${subject}&ise1=${ise1}&ise2=${ise2}&ese=${ese}&bool=${bool}`);
    setLoading(false);
    console.log(response.data.result);
    setSet1(response.data.result.qp1);
    setSet2(response.data.result.qp2);
    setSet3(response.data.result.qp3);
    setGenerated(true);
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
              <option value="DAA">DAA</option>
              <option value="OS">OS</option>
              <option value="DBMS">DBMS</option>
              <option value="Maths">Maths</option>
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
            <button disabled={loadingDisabled} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out flex gap-2 justify-center items-center">
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
          {set1.length > 0 && (
            <div className="mx-auto p-6">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border border-gray-400">Sr. No.</th>
                    <th className="p-2 border border-gray-400">Question</th>
                  </tr>
                </thead>
                <tbody>
                  {set1.map((arr, i) =>
                    arr.map((item, i) => (
                      <tr key={i} className="bg-white">
                        <td className="p-2 border border-gray-400">
                          {item.sr_no}
                        </td>
                        <td className="p-2 border border-gray-400">
                          {item.questions}
                        </td>
                      </tr>
                    ))
                  )}
                  {set2.map((arr, i) =>
                    arr.map((item, i) => (
                      <tr key={i} className="bg-white">
                        <td className="p-2 border border-gray-400">
                          {item.sr_no}
                        </td>
                        <td className="p-2 border border-gray-400">
                          {item.questions}
                        </td>
                      </tr>
                    ))
                  )}
                  {set3.map((arr, i) =>
                    arr.map((item, i) => (
                      <tr key={i} className="bg-white">
                        <td className="p-2 border border-gray-400">
                          {item.sr_no}
                        </td>
                        <td className="p-2 border border-gray-400">
                          {item.questions}
                        </td>
                      </tr>
                    ))
                  )}
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

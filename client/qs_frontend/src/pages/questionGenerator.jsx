import React, { useState } from "react";
import axios from "axios";

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
    const response = await axios.get(
      `http://localhost:3000/quesgen?sub=${subject}&ise1=${ise1}&ise2=${ise2}&ese=${ese}&bool=${bool}`
    );
    setSet1(response.data.result.qp1)
    setSet2(response.data.result.qp2)
    setSet3(response.data.result.qp3)
    console.log();
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
            <button
              //   type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
      {set1.length > 0 && (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-400">Sr. No.</th>
              <th className="p-2 border border-gray-400">Question</th>
            </tr>
          </thead>
          <tbody>
            {set1.map((arr, i) => (
                arr.map((item, i) => (
                    <tr key={i} className="bg-white">
                            <td className="p-2 border border-gray-400">{item.sr_no}</td>
                            <td className="p-2 border border-gray-400">{item.questions}</td>
                    </tr>
                ))
            ))}
            {set2.map((arr, i) => (
                arr.map((item, i) => (
                    <tr key={i} className="bg-white">
                            <td className="p-2 border border-gray-400">{item.sr_no}</td>
                            <td className="p-2 border border-gray-400">{item.questions}</td>
                    </tr>
                ))
            ))}
            {set3.map((arr, i) => (
                arr.map((item, i) => (
                    <tr key={i} className="bg-white">
                            <td className="p-2 border border-gray-400">{item.sr_no}</td>
                            <td className="p-2 border border-gray-400">{item.questions}</td>
                    </tr>
                ))
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default questionGenerator;

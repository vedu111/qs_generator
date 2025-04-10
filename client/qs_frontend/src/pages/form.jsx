import { useState } from "react";
import axios from "axios";
// import { auth } from "../lib/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ExamForm() {
  const navigate = useNavigate();
  const [examType, setExamType] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState("");
  const [selectedModules, setSelectedModules] = useState("");
  const [weightageMarks, setWeightageMarks] = useState("");
  const [considerPriority, setConsiderPriority] = useState(false);
  const [theoryPercentage, setTheoryPercentage] = useState(0);

  const handleInputChange = (e) => {
    const navigate = useNavigate();
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //   if (!user) {
    //     navigate("/login");
    //   }
    // });
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setConsiderPriority(checked);
    } else {
      switch (name) {
        case "examType":
          setExamType(value);
          break;
        case "selectedSubjects":
          setSelectedSubjects(value);
          break;
        case "selectedModules":
          setSelectedModules(value);
          break;
        default:
          break;
      }
    }
  };
  const handleWeightageChange = (module, value) => {
    setWeightageMarks((prevMarks) => ({
      ...prevMarks,
      [module]: value,
    }));
  };
  const handleExamTypeChange = (e) => {
    const value = e.target.value;
    setExamType(value);

    // Select modules based on the selected exam type
    if (value === "ISE-1") {
      setSelectedModules(["1", "2", "3"]);
    } else if (value === "ISE-2") {
      setSelectedModules(["4", "5", "6"]);
    } else if (value === "ESE") {
      setSelectedModules(["1", "2", "3", "4", "5", "6"]);
    }
  };
  const handleTheoryPercentageChange = (e) => {
    const percentage = parseInt(e.target.value);
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      setTheoryPercentage(percentage);
    }
  };
  const numericalPercentage = 100 - theoryPercentage;

  const handleModuleChange = (e) => {
    const value = e.target.value;
    if (selectedModules.includes(value)) {
      setSelectedModules(selectedModules.filter((module) => module !== value));
    } else {
      setSelectedModules([...selectedModules, value]);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const theoryPercentageValue = parseInt(theoryPercentage);
    const numericalPercentageValue = parseInt(numericalPercentage);
    // Your form submission logic here
    const ise_1 = selectedModules.map((module) => parseInt(module));
    const weights = {};
    for (const i of Object.keys(weightageMarks)) {
      weights[i] = parseInt(weightageMarks[i]);
    }
    let ise1TN = {};
    let ise2TN = {};
    let eseTN = {};

    if (examType === "ISE-1") {
      ise1TN = { TH: theoryPercentageValue, N: numericalPercentageValue };
    } else if (examType === "ISE-2") {
      ise2TN = { TH: theoryPercentageValue, N: numericalPercentageValue };
    } else if (examType === "ESE") {
      eseTN = { TH: theoryPercentageValue, N: numericalPercentageValue };
    }

    const formData = {
      sub: selectedSubjects,
      ise1: selectedModules.map((module) => parseInt(module)),
      ise2: [...Array(6)]
        .map((_, i) => i + 1)
        .filter((module) => !ise_1.includes(module)),
      ese: [...Array(6)].map((_, i) => i + 1),
      ise1_TN: ise1TN,
      ise2_TN: ise2TN,
      ese_TN: eseTN,
      weights,
    };
    console.log("Form data:", formData);
    navigate("/uploadSheet");

    try {
      //push to route /question
      // Send the POST request using Axios
      const response = await axios.post(
        "http://localhost:3000/subInfo",
        formData
      );
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };

  return (
    <form className="max-w-sm mx-auto p-4 m-8" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="examType"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Exam Type
        </label>
        <select
          id="examType"
          name="examType"
          value={examType}
          onChange={(e) => {
            handleInputChange(e);
            handleExamTypeChange(e);
          }}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        >
          <option value="">Select Exam Type</option>
          <option value="ISE-1">ISE-1</option>
          <option value="ISE-2">ISE-2</option>
          <option value="ESE">ESE</option>
        </select>
      </div>
      {examType && (
        <div className="mb-4">
          <label htmlFor="theoryPercentage" className="text-white block mb-2">
            Theory Percentage:
          </label>
          <input
            type="text"
            id="theoryPercentage"
            name="theoryPercentage"
            value={theoryPercentage}
            onChange={handleTheoryPercentageChange}
            className="bg-gray-800 border border-gray-600 text-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      )}
      {examType && (
        <div className="mb-4">
          <label
            htmlFor="numericalPercentage"
            className="text-white block mb-2"
          >
            Numerical Percentage:
          </label>
          <input
            type="text"
            id="numericalPercentage"
            name="numericalPercentage"
            value={`${numericalPercentage}%`}
            readOnly
            className="bg-gray-800 border border-gray-600 text-white rounded-lg p-2 cursor-not-allowed"
          />
        </div>
      )}

      <div className="mb-5">
        <label
          htmlFor="selectedSubjects"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Subjects
        </label>
        <select
          id="selectedSubjects"
          name="selectedSubjects"
          value={selectedSubjects}
          onChange={handleInputChange}
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
      <h1 className="text-white font-medium mb-4 text-sm">Select Modules</h1>
      <div className="mb-5 text-white grid-cols-2 grid gap-4">
        {[1, 2, 3, 4, 5, 6].map((module) => (
          <label key={module} className="flex items-center">
            <input
              type="checkbox"
              value={module}
              checked={selectedModules.includes(module.toString())}
              onChange={handleModuleChange}
              className="mr-2 text-blue-500 focus:ring-blue-300"
            />
            Module {module}
          </label>
        ))}
      </div>

      <div className="mb-5">
        <label
          htmlFor="weightageMarks"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Weightage Marks
        </label>
        <input
          type="text"
          id="weightageMarks-1"
          name="weightageMarks-1"
          placeholder="Weightage for Module 1"
          value={weightageMarks["1"] || ""}
          onChange={(e) => handleWeightageChange("1", e.target.value)}
          className="shadow-sm m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
        <input
          type="text"
          id="weightageMarks-2"
          name="weightageMarks-2"
          placeholder="Weightage for Module 2"
          value={weightageMarks["2"] || ""}
          onChange={(e) => handleWeightageChange("2", e.target.value)}
          className="shadow-sm m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
        <input
          type="text"
          id="weightageMarks-3"
          name="weightageMarks-3"
          placeholder="Weightage for Module 3"
          value={weightageMarks["3"] || ""}
          onChange={(e) => handleWeightageChange("3", e.target.value)}
          className="shadow-sm m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
        <input
          type="text"
          id="weightageMarks-4"
          name="weightageMarks-4"
          placeholder="Weightage for Module 4"
          value={weightageMarks["4"] || ""}
          onChange={(e) => handleWeightageChange("4", e.target.value)}
          className="shadow-sm m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
        <input
          type="text"
          id="weightageMarks-5"
          name="weightageMarks-5"
          placeholder="Weightage for Module 5"
          value={weightageMarks["5"] || ""}
          onChange={(e) => handleWeightageChange("5", e.target.value)}
          className="shadow-sm m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
        <input
          type="text"
          id="weightageMarks-6"
          name="weightageMarks-6"
          placeholder="Weightage for Module 6"
          value={weightageMarks["6"] || ""}
          onChange={(e) => handleWeightageChange("6", e.target.value)}
          className="shadow-sm m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <input
          id="considerPriority"
          type="checkbox"
          name="considerPriority"
          checked={considerPriority}
          onChange={handleInputChange}
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        />
        <label
          htmlFor="considerPriority"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Consider Priority as well
        </label>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default ExamForm;

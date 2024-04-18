import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ExamForm() {
  const [examType, setExamType] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState("");
  const [selectedModules, setSelectedModules] = useState("");
  const [weightageMarks, setWeightageMarks] = useState("");
  const [considerPriority, setConsiderPriority] = useState(false);

  const handleInputChange = (e) => {
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

  const handleModuleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (!selectedModules.includes(value)) {
        setSelectedModules([...selectedModules, value]);
      }
    } else {
      setSelectedModules(selectedModules.filter((module) => module !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your form submission logic here

    const formData = {
      examType,
      selectedSubjects,
      selectedModules,
      weightageMarks,
      considerPriority,
    };
    console.log("Form data:", formData);

    try {
      //push to route /question
      // Send the POST request using Axios
      const response = await axios.post(
        "http://localhost:3000/store",
        formData
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Handle success response
        console.log("Form data successfully submitted:", formData);
      } else {
        // Handle error response
        console.error("Error submitting form data:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      //push to route /question
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
          onChange={handleInputChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        >
          <option value="">Select Exam Type</option>
          <option value="ISE">ISE</option>
          <option value="ESE">ESE</option>
        </select>
      </div>
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
        <label className="flex items-center">
          <input
            type="checkbox"
            value="1"
            checked={selectedModules.includes("1")}
            onChange={handleModuleChange}
            className="mr-2 text-blue-500 focus:ring-blue-300"
          />
          Module 1
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="2"
            checked={selectedModules.includes("2")}
            onChange={handleModuleChange}
            className="mr-2 text-blue-500 focus:ring-blue-300"
          />
          Module 2
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="3"
            checked={selectedModules.includes("3")}
            onChange={handleModuleChange}
            className="mr-2 text-blue-500 focus:ring-blue-300"
          />
          Module 3
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="4"
            checked={selectedModules.includes("4")}
            onChange={handleModuleChange}
            className="mr-2 text-blue-500 focus:ring-blue-300"
          />
          Module 4
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="5"
            checked={selectedModules.includes("5")}
            onChange={handleModuleChange}
            className="mr-2 text-blue-500 focus:ring-blue-300"
          />
          Module 5
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="6"
            checked={selectedModules.includes("6")}
            onChange={handleModuleChange}
            className="mr-2 text-blue-500 focus:ring-blue-300"
          />
          Module 6
        </label>
      </div>

      <div className="mb-5">
        <label
          htmlFor="weightageMarks"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Weightage Marks
        </label>
        {selectedModules.length > 0 &&
          selectedModules.map((module) => (
            <input
              key={module}
              type="text"
              id={`weightageMarks-${module}`}
              name={`weightageMarks-${module}`}
              placeholder={`Weightage for Module ${module}`}
              value={weightageMarks[module] || ""}
              onChange={(e) => handleWeightageChange(module, e.target.value)}
              className="shadow-sm m-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          ))}
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

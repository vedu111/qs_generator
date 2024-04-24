import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const teacherForm = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    scheme: "",
    semester: "",
    subject: "",
    year: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      department: "",
      scheme: "",
      semester: "",
      subject: "",
      year: "",
    });
    console.log(navigate);
    navigate("/form");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-black shadow-md rounded-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-300"
        >
          Department:
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="scheme"
          className="block text-sm font-medium text-gray-300"
        >
          Scheme:
        </label>
        <input
          type="text"
          id="scheme"
          name="scheme"
          value={formData.scheme}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="semester"
          className="block text-sm font-medium text-gray-300"
        >
          Semester:
        </label>
        <input
          type="text"
          id="semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-300"
        >
          Subject:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-300"
        >
          Year:
        </label>
        <input
          type="text"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default teacherForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadSheet = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);
  const handlePreviewButton = () => {
    setPreview(!preview);
    fetchData(subject);
  };

  const [imageData, setImageData] = useState([]);
  const handleImageUpload = (event, id) => {
    const file = event.target.files[0];
    const newData = imageData.map((item) =>
      item.sr_no === id ? { ...item, image: URL.createObjectURL(file) } : item
    );
    setImageData(newData);
  };

  const [data, setData] = useState([]);
  const [upload, setUpload] = useState(false);
  const handlePreview = () => {
    setUpload(!upload);
  };

  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("subject", subject);

    try {
      // Send the POST request using Axios
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData
      );
      // Handle the response or show a success message
    } catch (error) {
      console.error("Error submitting form data:", error.message);
    }
  };

  // const handleUpload = () => {
  //   navigate("/uploadImages");
  // };

  const [error, setError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({});

  const handleUploadImage = (sr_no, file) => {
    setImagePreviews((prevPreviews) => ({
      ...prevPreviews,
      [sr_no]: URL.createObjectURL(file),
    }));
  };

  const fetchData = async (subject) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/questionsWithImages?subject=${subject}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Uplaoding images selected by the user
  const handleUploadImages = async () => {
    try {
      const imageFiles = imageData
        .filter((item) => item.image)
        .map((item) => item.image);

      const formData = new FormData();
      imageFiles.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });

      const response = await axios.post(
        "http://localhost:3000/storeImage",
        formData
      );
      console.log(response.data);

      // Handle the response or show a success message
    } catch (error) {
      console.error("Error uploading images:", error.message);
    }
  };

  return (
    <div className="flex-col">
      <div
        subject={subject}
        className="flex justify-center items-center h-[50vh] bg-gray-900"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md"
        >
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
              htmlFor="file-upload"
              className="block text-white font-bold mb-2"
            >
              Upload Excel File
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
              onClick={handlePreviewButton}
            >
              Preview
            </button>
          </div>
        </form>
      </div>
      {preview && (
        <div className="container mx-auto p-6">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border border-gray-400">Sr. No.</th>
                  <th className="p-2 border border-gray-400">Question</th>
                  <th className="p-2 border border-gray-400">Upload Image</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.sr_no} className="bg-white">
                    <td className="p-2 border border-gray-400">{item.sr_no}</td>
                    <td className="p-2 border border-gray-400">
                      {item.questions}
                    </td>
                    <td className="p-2 border border-gray-400">
                      <div className="flex items-center space-x-2">
                        <label
                          htmlFor={`file-upload-${item.sr_no}`}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer"
                        >
                          Choose File
                        </label>
                        <input
                          id={`file-upload-${item.sr_no}`}
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleUploadImage(item.sr_no, e.target.files[0])
                          }
                        />
                        {imagePreviews[item.sr_no] && (
                          <img
                            src={imagePreviews[item.sr_no]}
                            alt={`Preview for question ${item.sr_no}`}
                            className="w-48 h-36 object-cover"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleUploadImages}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
            >
              Upload Images
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSheet;

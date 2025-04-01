import React, { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function SubjectInfo() {
  const [subject, setSubject] = useState("");
  const [selectedISE1Chapters, setSelectedISE1Chapters] = useState([]);
  const [selectedISE2Chapters, setSelectedISE2Chapters] = useState([]);
  const selectedESEChapters = [1, 2, 3, 4, 5, 6];
  const [ise1TN, setISE1TN] = useState({ TH: "", N: "" });
  const [ise2TN, setISE2TN] = useState({ TH: "", N: "" });
  const [eseTN, setESETN] = useState({ TH: "", N: "" });
  const [weights, setWeights] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [eachchapNum, setEachchapNum] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
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
  // onAuthStateChanged(auth, (user) => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // });

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleChapterSelection = (chapterNumber, type) => {
    switch (type) {
      case "ISE1":
        setSelectedISE1Chapters((prevChapters) =>
          prevChapters.includes(chapterNumber)
            ? prevChapters.filter((chap) => chap !== chapterNumber)
            : [...prevChapters, chapterNumber]
        );
        break;
      case "ISE2":
        setSelectedISE2Chapters((prevChapters) =>
          prevChapters.includes(chapterNumber)
            ? prevChapters.filter((chap) => chap !== chapterNumber)
            : [...prevChapters, chapterNumber]
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingDisabled(true);
    // console.log(JSON.stringify({
    //     sub: subject,
    //     ise1: selectedISE1Chapters.sort(),
    //     ise2: selectedISE2Chapters.sort(),
    //     ese: selectedESEChapters.sort(),
    //     ise1_TN: ise1TN,
    //     ise2_TN: ise2TN,
    //     ese_TN: eseTN,
    //     weights: weights,
    //     eachchapNum: eachchapNum,
    //   }))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}subInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub: subject,
            ise1: selectedISE1Chapters,
            ise2: selectedISE2Chapters,
            ese: selectedESEChapters,
            ise1_TN: ise1TN,
            ise2_TN: ise2TN,
            ese_TN: eseTN,
            weights: weights,
            eachchapNum: eachchapNum,
          }),
        }
      );
      setLoading(false);
      console.log("Data posted successfully");
      alert("Data posted successfully");
      navigate("/uploadSheet");
    } catch (error) {
      console.error("Failed to post data:", error);
    }
  };

  return (
    <div className="my-6 flex justify-center items-center bg-gray-900">
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
            {subjectNames.map(
              (subject) =>
                subject && (
                  <option
                    value={subject.match(/\(([^)]+)\)/)[1].replace(/[ &]/g, "")}
                    key={subject}
                  >
                    {subject}
                  </option>
                )
            )}
            {subjectsInDB.map(
              (subject) =>
                subject && (
                  <option
                    disabled={true}
                    value={subject.match(/\(([^)]+)\)/)[1].replace(/[ &]/g, "")}
                    key={subject}
                  >
                    {subject}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="mb-4 text-white">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select ISE-1 Chapters
          </span>
          <div className="grid grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div className="flex gap-2" key={i}>
                <input
                  type="checkbox"
                  name={`ise1_${i + 1}`}
                  id={`ise1_${i + 1}`}
                  onChange={() => handleChapterSelection(i + 1, "ISE1")}
                />
                <label htmlFor={`ise1_${i + 1}`}>Chapter {i + 1}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 text-white">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select ISE-2 Chapters
          </span>
          <div className="grid grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div className="flex gap-2" key={i}>
                <input
                  type="checkbox"
                  name={`ise2_${i + 1}`}
                  id={`ise2_${i + 1}`}
                  onChange={() => handleChapterSelection(i + 1, "ISE2")}
                />
                <label htmlFor={`ise2_${i + 1}`}>Chapter {i + 1}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 text-white">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ISE-1 TN
          </label>
          <div>
            <input
              type="number"
              placeholder="TH"
              value={ise1TN.TH}
              onChange={(e) => setISE1TN({ ...ise1TN, TH: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <input
              type="number"
              placeholder="N"
              value={ise1TN.N}
              onChange={(e) => setISE1TN({ ...ise1TN, N: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mt-2"
            />
          </div>
        </div>
        <div className="mb-4 text-white">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ISE-2 TN
          </label>
          <div>
            <input
              type="number"
              placeholder="TH"
              value={ise2TN.TH}
              onChange={(e) => setISE2TN({ ...ise2TN, TH: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <input
              type="number"
              placeholder="N"
              value={ise2TN.N}
              onChange={(e) => setISE2TN({ ...ise2TN, N: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mt-2"
            />
          </div>
        </div>

        <div className="mb-4 text-white">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ESE TN
          </label>
          <div>
            <input
              type="number"
              placeholder="TH"
              value={eseTN.TH}
              onChange={(e) => setESETN({ ...eseTN, TH: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <input
              type="number"
              placeholder="N"
              value={eseTN.N}
              onChange={(e) => setESETN({ ...eseTN, N: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mt-2"
            />
          </div>
        </div>

        <div className="mb-4 text-white">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Hours per Chapter (Weights)
          </label>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <input
              key={index}
              type="number"
              placeholder={`Chapter ${index}`}
              value={weights[index] || ""}
              onChange={(e) =>
                setWeights({ ...weights, [index]: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mt-2"
            />
          ))}
        </div>

        <div className="mb-4 text-white">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Each Chapter Numeric Ratio
          </label>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <input
              key={index}
              type="number"
              placeholder={`Chapter ${index}`}
              value={eachchapNum[index] || ""}
              onChange={(e) =>
                setEachchapNum({ ...eachchapNum, [index]: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mt-2"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            disabled={loadingDisabled}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out flex gap-2 items-center justify-center"
          >
            <span>Submit</span>
            {loading && <Loader2 className="w-6 h-6 text-white animate-spin" />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubjectInfo;
